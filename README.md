# ezi-script

Ezi-script is (yes, another) javascript library, which aims to make common processes, 
like manipulating elements, adding eventlisteners, animating, and more as easy as possible.

## Getting Started

### Installing

You can go one of two routes:
**Download the bundle**: You can download ezi-bundle.js, and use it as the source for your script tag in the head or body of your page.
This'd give you `<script src="ezi-bundle.js></script>`, assuming you put the file in the root of your project.
**Install through NPM**: Ezi-script can be installed as a node module. If you already have NPM installed, you can `cd` into your project's directory
and execute `npm install ezi-script --save`. Now you can require/import it into your other files.

### Writing your first Ezi-script

Let's assume we have a page with some elements, including a `<nav></nav>`. Let's animate our navigationbar to decrease in size whenever we scroll past a certain point.
We'll have to add a scroll event to the `<body>` and animate the `<nav>`. Let's save these in variables.
```javascript
var navigationBar = EZ('nav'),
    body = EZ('body');
```
There we go. `EZ( selector )` returns an Ezi-element for the DOM-Element matching your selector. Or an array if there are more.
Now, let's define our handler. It should animate the height of our navigation when we've scrolled beyond a certain point. Let's say this point is `250px`.
```javascript
function scrollHandler (e) {
    var amountScrolled = body.scrolled();   //returns how far the element has scrolled ( returns x-value by default )
    if ( amountScrolled > 250 && navigationBar.height() == 150 ) {  //.height() without arguments returns the current calculated height
        navigationBar.height(80, 500);  //.height() can take multiple parameters though.  
    }
    else if ( amountScrolled < 250 && navigationBar.height() == 80 ) {
        navigationBar.height(150, 500);
    }
}
```
Alright. This function should animate the navigationbar's height to 80 when we've scrolled below 250, and back to 150 when we scroll up again.
You might be wondering what `height()` can actually do, but I'll explain the important parts in more detail at the end.  
Next, let's actually bind the handler to a scroll-event.
```javascript
body.on('scroll', scrollHandler);
```
That's it.

### I'll need more info than that though!

No worries. Got you covered.
`.height(...)` is a shorthand-function to adjust or animate an element's height. All it does though, is call the `.property()`-method with `"height"` as first argument.  
`.property( name, value, duration, easing, autoStart)` takes *5 arguments*. Only name is required and the last 3 have to do with *animating*.  
The **name**-parameter is the name of the property you'd like to edit or get. Write it the way you'd write it in your css. `background-color` is still `background-color` here. If it's the only argument, the function will return the current calculated value.  
The **value**-parameter is the new value you'd like to assign to the property. For numerical values, such as width or height, you should just use numbers.  
The **duration**-parameter is the duration of the animation. If this is defined, the adjustment to the property will be animated instead of being applied instantly. This method will then return the *animation-object* for you to further use.  
The **easing**-parameter should contain a string refering to the easing-function you'd like to use for your animation. These can be found in the `EZI.Easings`-object.  
The **autoStart**-parameter is a boolean indicating whether you want the animation to start as soon as the function is executed or not. By default, this is true. You can however pass `false`, save the animation in a variable and call `.start()` on it whenever you feel like starting it.
  
`.on( event, functions|animations,... , preventDefault);` binds the passed functions and animations to the event. If the last argument is a boolean, it will indicate whether the event's default action will be prevented or not. You can pass as many animations and functions to handle the event as you'd like.

## More documentation coming

There's more to **ezi-script** than this. There are some core-features not even touched upon here. But this is mainly an introduction for now anyway.  
Ezi-script can also `.append( object,... )` elements (as many as you'd like), or create elements with `EZI.make( tag, attr )`. And even more features are being built in as you are reading this.  
