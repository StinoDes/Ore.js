# Ore.js

**Ore.js** is (yes, another) javascript library, which aims to make common processes as easy as possible, while still keeping it customisable.  
Using *configs*, you can manipulate any element in any way by calling just one method.

## Getting Started

### Installation
To get started on using Ore, either install it using npm by executing `npm install ore-js` in your project's root, or include a `<script>`-tag with
Ore.js as its source.  
  
### Writing your first code  
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

### Animating
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