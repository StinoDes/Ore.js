# Ore-js

A *javascript-library* for *front-end* development with a **minimal API** that 
functions mostly through **configurations**.

### Objects
Ore has some objects you'll be using throughout development. The *Ore* object 
is the root of the library, containing a minimalist API.  
 Being a front-end library, you'll be provided with some ways to manipulate 
 and create elements. These are wrapped in custom objects, called *Minerals*.
 These implement Ore's functionality, once again with a minimalist API, allowing you
 to build your site and make it interactive.  
 Ore also provides you with *glimmers*, which are animations.  
 These glimmers and minerals are interfaced with by passing configurations. These
 are maps / literal objects which you can just inline in your function calls.  
   
#### List of objects and their API 
* **`Ore`**:  
The library's variable. This contains the main functions to get you started.
    * `mine( selector[string], config[Object] )`:  
    **selector**: either a css-selector refering to the element you wish to get
    the mineral of, or `new<tagname>` to create a mineral containing a new element.  
    **config**: a configuration-object to pass to a newly created mineral.  
    **Returns** a mineral containing a new element or one matching the passed selector.
* **`mineral`**:  
  A wrapper around HTML-elements.
    * `getElement()`:  
    **Returns** the element it contains, in case you need some finer tuning.
    * `labor( config[Object] )`:  
    Method that takes a configuration and applies what is passed 
    onto the mineral's element.  
    **Returns** the mineral so that methods can be chained.
    * `routine( config[Object] )`:
    Method that takes a configuration of functions to be added to 
    routines.  
    Routines allow you to call minrals' functions through `labor`.
    * `retrieve()`:  
    **Returns** an object containing *all* data of the element that is 
     deemed useful.  
     Has the following methods:
        * `get( path[string], prop[string] )`:  
        **path**: a string containing the type of data you want returned.
        Can be one of the following: `[styles, attr, class]`.  
        **prop**: a string containing the name of the prop you want returned.
        This will be the name of the css-property or attribute, depending on
        what the `path`-parameter was. Retrieving classes requires no `prop`-param.  
        **Returns** the requested value.
* **`glimmer`**:  
An animation object.
    * `labor( config[Object] )`:  
    Method that takes a configuration and applies it to the glimmer-object.  
    **Returns** the glimmer so that methods can be chained.
    
#### Configurations
There has been a lot of talk about configurations. These are used to interface with
most API's Ore provides.  
Configurations are plain maps / object literals. Ther don't require instantiation.  
For now, there are 2 types of configurations. One for minerals and one for glimmers.
##### Mineral-configuration
The mineral configuration allows you to manipulate an element to a great extent.
Before being processed, it gets mapped from whichever you pass to something the
mineral can interpret.
###### Properties
Here you'll see a list of properties that the mineral can understand.
They'll be accompanied by examples demonstrating their use and variations.  
* `styles[Object]`:  
 A key-value map containing styles to set.  
 Keys being the css-property, values being their new value. The properties 
 should be camel-cased.  
 **Alternatively**, styles can be set in the root of the config. They'll be 
 picked up in the default mapper if they are a recognised css-property. 
* `attr[Object]`:  
 A key-value map, containing attributes to set.
 Keys being the attribute to set, values being their new value.  
 **Alternatively**, attributes be set in the root of the config. They'll be 
 picked up by the default mapper if they are recognised as valid attributes.
* `events[Object]`:
 A key-value map containing events to add to the mineral.
 Keys being the event to handle, values being either a function or an 
 array of functions to handle the event.  
 **Alternatively**, events can be set in the root of the config. Their
 notation should then be changed from `<eventname>` to `on<Eventname>`
* `text[string]`:  
 A string to set as text.
* `append/prepend[Array, Mineral, Element]`:  
 A mineral or element or array of either to append to the mineral the configuration
 is passed to.  
###### Routines  
Routines are functions that are assigned to a mineral and can be easily called from `labor`.
They can be added by calling a mineral's `routine`-function, which accepts an object.
The object's keys should be the names of the routine you want to add, the value should be the
corresponding function.  
Routines can be called by using their name as a key inside of the `labor`-config, passing the 
arguments for your routine as the value, or as an array if there are more than one.  
```javascript
// Creating a new mineral containing a div-element
// and adding a routine, 'show', that will alter
// the div's display property based on the passed bool.
var mineral = Ore.mine('newdiv')
        .routine({
          show: function (bool) {
            this.labor({ display: bool ? 'block': 'none' });
          }
        })
        
/*...*/

// Hiding the div using the routine. This will put
// the div's display-prop on none.
mineral.labor({
  show: false
})

```
##### Glimmer-configuration  
###### Properties  
Here, all properties the glimmer-configuration can hold will be listed. At the end,
there will be some examples illustrating them.
* `set[function, Array]`:  
 A function or array of functions to do something with the animated value.
* `styles[string, Arra, Object]`:
 A string or array of strings on which the animated value should be applied.  
 Alternatively, you can pass an key-value map of which the keys are the styles
 and the values are functions further altering the value.
* `from[number]`:  
 The initial value.
* `to[number]`:  
 The value to animate towards.
* `duration[number]`:  
 The animation's duration. This should be in miliseconds.
* `delay[number]`:  
 The delay before the animation takes effect.
* `onEnd[function]`:  
 A function to execute when the animation is finished.
* `play[boolean]`:  
 A boolean indicating whether the animation should play or not.
* `reverse[boolean]`:  
 A boolean that, if set to true, will trigger the animation to turn around.
* `reset[boolean]`:
 A boolean that, if set to true, will trigger the animation to reset.
* `easing[string]`:  
 A string refering to an easing.
 
###### Supported Easings  
This is a list of all supported easings. It's suggested to play around with them
and find the best one for your use-case.  
Every easing-function has a `easeIn`, `easeOut` and `easeInOut` variation. To use these,
you'd pass `easeInCubic` for the `cubic` easing.  
**`linear`, `bounceIn` and `bounceOut` do not have these variations**
* **`linear`**: has no variations - default
* **`bounceIn`**: has no variations
* **`bounceOut`**: has no variations
* `quad`
* `cubic`
* `quart`
* `quint`

###### Examples  
**Basic:**  
* **Animating a variable:**  
    In this example, a variable will be animated from 0 to 200 over 500ms.
    The value will **not** be applied to a style. Only saved as a variable.
    The glimmer will start immediately after passing the config.
```javascript
var animatedVariable,
  config = {
    from: 0,
    to: 200,
    duration: 500,
    set: function (value) { animatedVariable = value },
    play: true
  }
glimmer.labor(config)
```

* **Animating a style:**  
    Same as previous example, except for the value being applied to a style
    instead of being assigned to a variable.  
    Don't forget to pass the mineral you wish to animate.     
```javascript
var config = {
    from: 0,
    to: 1,
    duration: 500,
    style: 'opacity',
    mineral: mineral,
    play: true
  }
glimmer.labor(config)
```

* **Animating a style with a unit:**  
    In this case, a function is passed to add a unit to the value.
```javascript
var config = {
    from: 0,
    to: 200,
    duration: 500,
    style: {
      'top': function (value) { return value + 'px' }
    },
    mineral: mineral,
    play: true
  }
glimmer.labor(config)
```

* **Animating with an easing:**  
    Now we'll add an easing to make the animation feel more natural.
```javascript
var config = {
    from: 0,
    to: 200,
    duration: 500,
    style: {
      'top': function (value) { return value + 'px' }
    },
    mineral: mineral,
    easing: 'bounceOut',
    play: true
  }
glimmer.labor(config)
```

**Advanced:**  
We can now start adding looping or interactivity.
* **Looping a glimmer:**   
    Here, we make the `onEnd`-property apply a new configuration that reverses
    the glimmer and starts it again. For simplicity's sake, we'll do nothing
    with the animated value. You can of course leave out the `reverse`-property
    that's not needed in your case.
```javascript
var config = {
    from: 0,
    to: 200,
    duration: 500,
    onEnd: function () {
      this.labor({ reverse: true, play: true })
    },
    play: true
  }
glimmer.labor(config)
```

* **Animating multiple styles:**  
    We can make multiple styles animate with different values by passing
    an object to the `styles`-property that interpolates the animated value.
    This way, multiple styles will be assigned different values.
```javascript
var config = {
    from: 0,
    to: 200,
    duration: 500,
    styles: {
      'top': function (value) { return value + 'px' },
      'opacity': function (value) { return value / 200 }
    },
    mineral: mineral,
    play: true
  }
glimmer.labor(config)
```


### WIP
This library, as well as this README is a work in progress. Input is always appreciated.
