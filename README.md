# Ore.js

**Ore.js** is (yes, another) javascript library, which aims to make common processes as easy as possible, while still keeping it customisable.  
Using *configs*, you can manipulate any element in any way by calling just one method.

## Getting Started

### Installation
To get started on using Ore, either install it using npm by executing `npm install ore-js` in your project's root, or include a `<script>`-tag with
Ore.js as its source.  
  
### How it works
#### Getting and manipulating an element/mineral
Ore provides a method to easily get any element from the DOM-tree. `Ore.collect( <selector> )` returns an element-object, 
called a Mineral, or a group, called Batch. A Batch has the same base methods as a Mineral, so you can generally mix their uses.  
`do( <config> )` executes whatever you pass in your config onto the Mineral or Batch. Its uses can vary greatly.  
These are all possible applications of `config` in `do()`:  
``` javascript
{    
    styles: {
        <css-property>: <value>     //applies the css-property with value onto the mineral or batch
    },
    attr: {
        <html-attribute>: <value>   //applies the html-attribute with value onto the mineral or batch
    },
    events: {
        <event>: <handler>          //binds the handler to the given event on the mineral or batch
    },
    children: {
        append: {                   //appends the array of elements behind the given index
            minerals: [],
            index: ,
        },
        prepend: {                  //prepends the array of elements before the given index
            minerals: [],
            index: ,
        }
    },
    text: <string>,                 //sets the string as the element's text
    
    glimmer: <glimmer config>       //creates a glimmer (check below for documentation)
}
```
This is what the config-file looks like after being remapped. You can however write your attributes, css-properties and events directly in
the root of the object. Same goes for append and prepend.

#### Creating a new element/mineral
You can create a new element by calling `Ore.craft( <tag>, <config> )`. As tag, you pass the desired HTML-tag, and the config is similar to what
we've seen before. The main difference is that you should define *children* as `children: [ <Mineral>, <Mineral> ]` in the root of the config.  
This method returns your newly created Mineral, which you can then append or manipulate further.

### Animating/Glimmers
#### Creating and using animations/glimmers
Animations are handled by seperate objects in Ore. These are called **Glimmers**. At their core, Glimmers merely animate a value from x to y over a specified duration.
Glimmers are set up using a config file (somewhat like Minerals).  
The possible applications of a Glimmer's config, look like this:
``` javascript
{
    set: function (val),         // A function specifying what you want to do with the animated value.
    
    styles: <styles>,            // The styles you want to animate. This generates a set function which will edit the styles.
                                 // This can be a string for just a single style(e.g. 'width'),
                                 // an array for multiple styles (e.g. ['width', 'height'],
                                 // or an object, where the keys are the styles and the values functions that return
                                 // the new value for the styles (e.g. {'width': function (val) { return val + '%' } }
                                 
    mineral: <Mineral>           // the mineral whose styles you want to edit. This isn't needed when not animated styles.
                                 // This is added automatically when initialising glimmers through a Mineral
                                 
    initial: <num>,              // The initial value of the animation
    get: func (),                // Alternative to initial. Should return an initial value.
    
    toValue: <num>,              // The value to which will be animated
    
    duration: <num>,             // The duration of the animation in miliseconds
    
    easing: func (progress),     // A function transforming the animations progress. This will always be a value between 0 and 1
    
    play: <boolean>              // If this is set to true, the animation will play. If it is set to false, it will pause.
}
```
Glimmers can be easily initiated by passing `glimmer: <glimmer config>` to a mineral.

#### Finding created glimmers
Created glimmers are saved in Ore. So evidently a method is provided to retrieve them from cache as well. 
`Ore.catch({ selector: <selector>, query: { <queries> }})` retrieves all matching glimmers for you and returns them in a wrapper.
The *selector*-property should be a string containing a CSS-selector. This will narrow down the retrieval to only the animations of those elements.  
The *query*-property should be an object of properties and values. The retrieval will be narrowed down to only glimmers whose properties match with those in the query. 
For example:  
`Ore.catch({ selector: '.overlay', query: { style: 'opacity' } })` will return all animations applied to `.overlay`-elements, who are animating the `opacity`-property.

### Modularity
Ore provides a way of building your site brick by brick. To make rendering the contents of these bricks easier, Ore offers some shorthands.  
#### Shorthand functions
The **Oven**-object, which is contained by Ore, can return you all default recipes, which in turn return Minerals for basic HTML-elements.
``` javascript
var sh = Ore.Oven.recipes;
console.log( sh.div() );        // Will render a Mineral containing a div-element, which you can then append
```
These shorthands have 2 parameters. The first is the config-object you'd usually pass to a Mineral (check above). The other is an array of children.  
This makes appending children easy.
`sh.div({ class: 'container' }, [ sh.h1( {text: 'This is a h1-tag'} ), sh.p( {text: 'This is a paragraph with text!'} ) ]);`  
Now we have made a div.container-element with a heading and paragraph. Easy as that.  
  
You can create custom shorthands as well.
`Ore.Oven.bake( <tag>, <config> )` will return you a similar shorthand. The return of your shorthand will be 
a mineral containing your an element with the tag you provided and the config baked into the preset.
**Example - creating a floating-button shorthand:**
``` javascript
// Define our button shorthand. It will return an 'a'-tag with some preset values.
button = Ore.Oven.bake('a', { position: 'fixed', width: '100px', height: '100px', borderRadius: '50%', right: '150px', bottom: '150px', display: 'block'});

// Append the newly created button onto the body. Some more config can be passed here ( background and click in this example )
Ore.collect('body').do({ 
    append: button({ click: function () { alert("I've been clicked!"); }, backgroundColor: '#324398' })
});
```

#### Bricks
Bricks are the component-objects in Ore. They are, at their very core, classes with a `build`-method. This build method returns Minerals, which will make up your UI.  
You can define bricks using the same method as you define new shorthands. To tell the Oven that you want a brick, not a new shorthand, start your tag with a capital letter.  
Then, instead of a config-object, you should pass an object containing how you'd like to extend the standard brick. Generally you'd want to override the `build`-method. The rest is up to you.
**Example - creating a navigation brick:**
``` javascript
var sh = Ore.Oven.recipes;

//Generate the shorthand for your brick.
var Nav = Ore.Oven.bake('Nav', {
    build: function () {
        return sh.nav({ position: 'fixed', background: '#329843', right: 0, left: 0, top: 0, height: '90px'}, [ 
            sh.h1({text: 'LOGO'}) 
        ]);
    }
});
```
After you have defined your Brick, you can render is by executing the function it returns.  
  
Bricks don't have to be that static though. When executing the shorthand returned from `.bake`, you can pass it an object, which will be saved in your brick.
These can then be used in, for example, the build-method.
**Example - creating a navigation brick with custom title:**
``` javascript
var sh = Ore.Oven.recipes;

//Generate the shorthand for your brick.
var Nav = Ore.Oven.bake('Nav', {
    build: function () {
        return sh.nav({ position: 'fixed', background: '#329843', right: 0, left: 0, top: 0, height: '90px'}, [ 
            sh.h1({text: this.conf.title})          //Get title from conf, use it as text 
        ]);
    }
});
Nav({title: 'LOGO'})                                //These will both generate the same nav, but with different titles.
Nav({title: 'ORE.JS'})                                 
```