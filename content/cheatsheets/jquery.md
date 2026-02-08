# jQuery

> This [jQuery](https://jquery.com/) cheat sheet is a great reference for both beginners and experienced developers.

Category: Programming

## Getting Started

### Including jQuery

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

```

#### Official CDN

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>

```

### jQuery syntax

```javascript
$(selector).methodOrFunction();

```

#### Example:

```javascript
$("#menu").on("click", function () {
  $(this).hide();
});

$("body").css("background", "red");

```

### jQuery document ready

```javascript
$(document).ready(function () {
  // Runs after the DOM is loaded.
  alert("DOM fully loaded!");
});

```

```javascript
$(function () {
  // Runs after the DOM is loaded.
  alert("DOM fully loaded!");
});

```

## jQuery Selectors

### Examples

```javascript
$("button").click(() => {
  $(":button").css("color", "red");
});

```

#### Combining selectors

```javascript
$("selector1, selector2 ...selectorn");

```

### Basics

- *{data-tooltip="Selects all elements."}
- .class{data-tooltip="Selects all elements with the given class. "}
- element{data-tooltip="Selects all elements with the given tag name."}
- #id{data-tooltip="Selects a single element with the given id attribute. "}
- :hidden{data-tooltip="Selects all elements that are hidden."}
- :visible{data-tooltip="Selects all elements that are visible."}
- :contains(){data-tooltip="Select all elements that contain the specified text."}
- :empty{data-tooltip="Select all elements that have no children (including text nodes)."}
- :has(){data-tooltip="Selects elements which contain at least one element that matches the specified selector."}
- :parent{data-tooltip="Select all elements that have at least one child node (either an element or text)."}
- parent > child{data-tooltip="Selects all direct child elements specified by child of elements specified by parent."}
- ancestor descendant{data-tooltip="Selects all elements that are descendants of a given ancestor."}
- prev + next{data-tooltip="Selects all next elements matching next that are immediately preceded by a sibling prev."}
- prev ~ siblings{data-tooltip="Selects all sibling elements that follow after the prev element, have the same parent, and match the filtering siblings selector."}

{.marker-none .cols-3}

### Basic Filters

- :animated{data-tooltip="Select all elements that are in the progress of an animation at the time the selector is run."}
- :eq(){data-tooltip="Select the element at index n within the matched set."}
- :even{data-tooltip="Selects even elements, zero-indexed.  See also :odd."}
- :first{data-tooltip="Selects the first matched DOM element."}
- :gt(){data-tooltip="Select all elements at an index greater than index within the matched set."}
- :header{data-tooltip="Selects all elements that are headers, like h1, h2, h3 and so on."}
- :lang(){data-tooltip="Selects all elements of the specified language."}
- :last{data-tooltip="Selects the last matched element."}
- :lt(){data-tooltip="Select all elements at an index less than index within the matched set."}
- :not(){data-tooltip="Selects all elements that do not match the given selector."}
- :odd{data-tooltip="Selects odd elements, zero-indexed.  See also :even."}
- :root{data-tooltip="Selects the element that is the root of the document."}
- :target{data-tooltip="Selects the target element indicated by the fragment identifier of the document's URI."}

{.marker-none .cols-3}

### Attribute

- [name|="value"]{data-tooltip="Selects elements that have the specified attribute with a value either equal to a given string or starting with that string followed by a hyphen (-)."}
- [name*="value"]{data-tooltip="Selects elements that have the specified attribute with a value containing a given substring."}
- [name~="value"]{data-tooltip="Selects elements that have the specified attribute with a value containing a given word, delimited by spaces."}
- [name$="value"]{data-tooltip="Selects elements that have the specified attribute with a value ending exactly with a given string. The comparison is case sensitive."}
- [name="value"]{data-tooltip="Selects elements that have the specified attribute with a value exactly equal to a certain value."}
- [name!="value"]{data-tooltip="Select elements that either don't have the specified attribute, or do have the specified attribute but not with a certain value."}
- [name^="value"]{data-tooltip="Selects elements that have the specified attribute with a value beginning exactly with a given string."}
- [name]{data-tooltip="Selects elements that have the specified attribute, with any value. "}
- [name="value"][name2="value2"]{data-tooltip="Matches elements that match all of the specified attribute filters."} {.col-span-2}

{.marker-none .cols-2}

### Child Filters

- :first-child{data-tooltip="Selects all elements that are the first child of their parent."}
- :first-of-type{data-tooltip="Selects all elements that are the first among siblings of the same element name."}
- :last-child{data-tooltip="Selects all elements that are the last child of their parent."}
- :last-of-type{data-tooltip="Selects all elements that are the last among siblings of the same element name."}
- :nth-child(){data-tooltip="Selects all elements that are the nth-child of their parent."}
- :nth-last-child(){data-tooltip="Selects all elements that are the nth-child of their parent, counting from the last element to the first."}
- :nth-last-of-type(){data-tooltip="Selects all the elements that are the nth-child of their parent in relation to siblings with the same element name, counting from the last element to the first."}
- :nth-of-type(){data-tooltip="Selects all elements that are the nth child of their parent in relation to siblings with the same element name."}
- :only-child{data-tooltip="Selects all elements that are the only child of their parent."}
- :only-of-type(){data-tooltip="Selects all elements that have no siblings with the same element name."}

{.marker-none .cols-2}

### Forms

- :button{data-tooltip="Selects all button elements and elements of type button."}
- :checkbox{data-tooltip="Selects all elements of type checkbox."}
- :checked{data-tooltip="Matches all elements that are checked or selected."}
- :disabled{data-tooltip="Selects all elements that are disabled."}
- :enabled{data-tooltip="Selects all elements that are enabled."}
- :focus{data-tooltip="Selects element if it is currently focused."}
- :file{data-tooltip="Selects all elements of type file."}
- :image{data-tooltip="Selects all elements of type image."}
- :input{data-tooltip="Selects all input, textarea, select and button elements."}
- :password{data-tooltip="Selects all elements of type password."}
- :radio{data-tooltip="Selects all  elements of type radio."}
- :reset{data-tooltip="Selects all elements of type reset."}
- :selected{data-tooltip="Selects all elements that are selected."}
- :submit{data-tooltip="Selects all elements of type submit."}
- :text{data-tooltip="Selects all input elements of type text."}

{.marker-none .cols-3}

## jQuery Attributes

### Examples

```javascript
$("h2").css({
  color: "blue",
  backgroundColor: "gray",
  fontSize: "24px",
});

```

#### jQuery addClass

```javascript
$(".button").addClass("active");

```

#### jQuery removeClass

```javascript
$(".button").on("mouseleave", (evt) => {
  let e = evt.currentTarget;
  $(e).removeClass("active");
});

```

#### jQuery .toggleClass

```javascript
$(".choice").toggleClass("highlighted");

```

### Attributes

- .attr(){data-tooltip="Get the value of an attribute for the first element in the set of matched elements."}
- .prop(){data-tooltip="Get the value of a property for the first element in the set of matched elements."}
- .removeAttr(){data-tooltip="Remove an attribute from each element in the set of matched elements."}
- .removeProp(){data-tooltip="Remove a property for the set of matched elements."}
- .val(){data-tooltip="Get the current value of the first element in the set of matched elements."}

{.marker-none .cols-2}

#### Data

- jQuery.data(){data-tooltip="Store arbitrary data associated with the specified element. Returns the value that was set."}
- .data(){data-tooltip="Store arbitrary data associated with the matched elements."}
- jQuery.hasData(){data-tooltip="Determine whether an element has any jQuery data associated with it."}
- jQuery.removeData(){data-tooltip="Remove a previously-stored piece of data."}
- .removeData(){data-tooltip="Remove a previously-stored piece of data."}

{.marker-none .cols-2}

### CSS

- .addClass(){data-tooltip="Adds the specified class(es) to each element in the set of matched elements."}
- .hasClass(){data-tooltip="Determine whether any of the matched elements are assigned the given class."}
- .removeClass(){data-tooltip="Remove a single class, multiple classes, or all classes from each element in the set of matched elements."}
- .toggleClass(){data-tooltip="Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument."}
- .css(){data-tooltip="Get the computed style properties for the first element in the set of matched elements."}
- jQuery.cssHooks{data-tooltip="Hook directly into jQuery to override how particular CSS properties are retrieved or set, normalize CSS property naming, or create custom properties."}
- jQuery.cssNumber{data-tooltip="An object containing all CSS properties that may be used without a unit. The .css() method uses this object to see if it may append px to unitless values."}
- jQuery.escapeSelector(){data-tooltip="Escapes any character that has a special meaning in a CSS selector."}

{.marker-none .cols-2}

### Dimensions

- .height(){data-tooltip="Get the current computed height for the first element in the set of matched elements."}
- .innerHeight(){data-tooltip="Get the current computed height for the first element in the set of matched elements, including padding but not border."}
- .innerWidth(){data-tooltip="Get the current computed inner width for the first element in the set of matched elements, including padding but not border."}
- .outerHeight(){data-tooltip="Get the current computed outer height (including padding, border, and optionally margin) for the first element in the set of matched elements."}
- .outerWidth(){data-tooltip="Get the current computed outer width (including padding, border, and optionally margin) for the first element in the set of matched elements."}
- .width(){data-tooltip="Get the current computed width for the first element in the set of matched elements."}

{.marker-none .cols-2}

### Offset

- .offset(){data-tooltip="Get the current coordinates of the first element in the set of matched elements, relative to the document."}
- .offsetParent(){data-tooltip="Get the closest ancestor element that is positioned."}
- .position(){data-tooltip="Get the current coordinates of the first element in the set of matched elements, relative to the offset parent."}
- .scrollLeft(){data-tooltip="Get the current horizontal position of the scroll bar for the first element in the set of matched elements."}
- .scrollTop(){data-tooltip="Get the current vertical position of the scroll bar for the first element in the set of matched elements or set the vertical position of the scroll bar for every matched element."}

{.marker-none .cols-2}

## jQuery Manipulation

### Examples

```javascript
/*<span>Span.</span>*/
$("span").after("<p>Paragraph.</p>");
/*<span>Span.</span><p>Paragraph.</p>*/

/*<span>Span.</span>*/
$("<span>Span.</span>").replaceAll("p");
/*<p>Span.</p>*/

/*<span>This is span.</span>*/
$("span").wrap("<p></p>");
/*<p><span>This is span.</span></p>*/

```

### Copying

- .clone(){data-tooltip="Create a deep copy of the set of matched elements."}

{.marker-none .cols-3}

### DOM Insertion, Around

- .wrap(){data-tooltip="Wrap an HTML structure around each element in the set of matched elements."}
- .wrapAll(){data-tooltip="Wrap an HTML structure around all elements in the set of matched elements."}
- .wrapInner(){data-tooltip="Wrap an HTML structure around the content of each element in the set of matched elements."}

{.marker-none .cols-3}

### DOM Insertion, Inside

- .append(){data-tooltip="Insert content, specified by the parameter, to the end of each element in the set of matched elements."}
- .appendTo(){data-tooltip="Insert every element in the set of matched elements to the end of the target."}
- .html(){data-tooltip="Get the HTML contents of the first element in the set of matched elements."}
- .prepend(){data-tooltip="Insert content, specified by the parameter, to the beginning of each element in the set of matched elements."}
- .prependTo(){data-tooltip="Insert every element in the set of matched elements to the beginning of the target."}
- .text(){data-tooltip="Get the combined text contents of each element in the set of matched elements, including their descendants."}
{.marker-none .cols-3}

### DOM Insertion, Outside

- .after(){data-tooltip="Insert content, specified by the parameter, after each element in the set of matched elements."}
- .before(){data-tooltip="Insert content, specified by the parameter, before each element in the set of matched elements."}
- .insertAfter(){data-tooltip="Insert every element in the set of matched elements after the target."}
- .insertBefore(){data-tooltip="Insert every element in the set of matched elements before the target."}

{.marker-none .cols-3}

### DOM Removal

- .detach(){data-tooltip="Remove the set of matched elements from the DOM."}
- .empty(){data-tooltip="Remove all child nodes of the set of matched elements from the DOM."}
- .remove(){data-tooltip="Remove the set of matched elements from the DOM."}
- .unwrap(){data-tooltip="Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place."}

{.marker-none .cols-3}

### DOM Replacement

- .replaceAll(){data-tooltip="Replace each target element with the set of matched elements."}
- .replaceWith(){data-tooltip="Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed."}

{.marker-none .cols-3}

## jQuery Traversing

### Filtering

- .eq(){data-tooltip="Reduce the set of matched elements to the one at the specified index."}
- .filter(){data-tooltip="Reduce the set of matched elements to those that match the selector or pass the function's test. "}
- .first(){data-tooltip="Reduce the set of matched elements to the first in the set."}
- .has(){data-tooltip="Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element."}
- .is(){data-tooltip="Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments."}
- .last(){data-tooltip="Reduce the set of matched elements to the final one in the set."}
- .map(){data-tooltip="Pass each element in the current matched set through a function, producing a new jQuery object containing the return values."}
- .not(){data-tooltip="Remove elements from the set of matched elements."}
- .slice(){data-tooltip="Reduce the set of matched elements to a subset specified by a range of indices."}

{.marker-none .cols-3}

### Miscellaneous Traversing

- .add(){data-tooltip="Create a new jQuery object with elements added to the set of matched elements."}
- .addBack(){data-tooltip="Add the previous set of elements on the stack to the current set, optionally filtered by a selector."}
- .andSelf(){data-tooltip="Add the previous set of elements on the stack to the current set."}
- .contents(){data-tooltip="Get the children of each element in the set of matched elements, including text and comment nodes."}
- .each(){data-tooltip="Iterate over a jQuery object, executing a function for each matched element. "}
- .end(){data-tooltip="End the most recent filtering operation in the current chain and return the set of matched elements to its previous state."}

{.marker-none .cols-3}

### Tree Traversal

- .children(){data-tooltip="Get the children of each element in the set of matched elements, optionally filtered by a selector."}
- .closest(){data-tooltip="For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree."}
- .find(){data-tooltip="Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element."}
- .next(){data-tooltip="Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector."}
- .nextAll(){data-tooltip="Get all following siblings of each element in the set of matched elements, optionally filtered by a selector."}
- .nextUntil(){data-tooltip="Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed."}
- .parent(){data-tooltip="Get the parent of each element in the current set of matched elements, optionally filtered by a selector."}
- .parents(){data-tooltip="Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector."}
- .parentsUntil(){data-tooltip="Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object."}
- .prev(){data-tooltip="Get the immediately preceding sibling of each element in the set of matched elements. If a selector is provided, it retrieves the previous sibling only if it matches that selector."}
- .prevAll(){data-tooltip="Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector."}
- .prevUntil(){data-tooltip="Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object."}
- .siblings(){data-tooltip="Get the siblings of each element in the set of matched elements, optionally filtered by a selector."}

{.marker-none .cols-3}

## jQuery Events

### Examples

```javascript
// A mouse event 'click'
$("#menu-button").on("click", () => {
  $("#menu").show();
});

// A keyboard event 'keyup'
$("#textbox").on("keyup", () => {
  $("#menu").show();
});

// A scroll event 'scroll'
$("#menu-button").on("scroll", () => {
  $("#menu").show();
});

```

#### Event object

```javascript
$("#menu").on("click", (event) => {
  $(event.currentTarget).hide();
});

```

#### Method chaining

```javascript
$("#menu-btn")
  .on("mouseenter", () => {
    $("#menu").show();
  })
  .on("mouseleave", () => {
    $("#menu").hide();
  });

```

#### Prevents the event

```javascript
$("p").click(function (event) {
  event.stopPropagation();
  // Do something
});

```

### Browser Events

- .error(){data-tooltip="Bind an event handler to the error JavaScript event."}
- .resize(){data-tooltip="Bind an event handler to the resize JavaScript event, or trigger that event on an element."}
- .scroll(){data-tooltip="Bind an event handler to the scroll JavaScript event, or trigger that event on an element."}

{.marker-none .cols-3}

### Event Object

- event.currentTarget{data-tooltip=" The current DOM element within the event bubbling phase.  "}
- event.delegateTarget{data-tooltip="The element where the currently-called jQuery event handler was attached."}
- event.data{data-tooltip="An optional object of data passed to an event method when the current executing handler is bound.  "}
- event.isDefaultPrevented(){data-tooltip="Returns whether event.preventDefault() was ever called on this event object. "}
- event.isImmediatePropagationStopped(){data-tooltip="  Returns whether event.stopImmediatePropagation() was ever called on this event object. "}
- event.isPropagationStopped(){data-tooltip="  Returns whether event.stopPropagation() was ever called on this event object. "}
- event.metaKey{data-tooltip="Indicates whether the META key was pressed when the event fired."}
- event.namespace{data-tooltip="The namespace specified when the event was triggered."}
- event.pageX{data-tooltip="The mouse position relative to the left edge of the document."}
- event.pageY{data-tooltip="The mouse position relative to the top edge of the document."}
- event.preventDefault(){data-tooltip="If this method is called, the default action of the event will not be triggered."}
- event.relatedTarget{data-tooltip="The other DOM element involved in the event, if any."}
- event.result{data-tooltip="The last value returned by an event handler that was triggered by this event, unless the value was undefined."}
- event.stopImmediatePropagation(){data-tooltip="Keeps the rest of the handlers from being executed and prevents the event from bubbling up the DOM tree."}
- event.stopPropagation(){data-tooltip="Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event."}
- event.target{data-tooltip=" The DOM element that initiated the event.  "}
- event.timeStamp{data-tooltip="The difference in milliseconds between the time the browser created the event and January 1, 1970."}
- event.type{data-tooltip="Describes the nature of the event."}
- event.which{data-tooltip="For key or mouse events, this property indicates the specific key or button that was pressed."}

{.marker-none .cols-1}

### Document Loading

- .load(){data-tooltip="Bind an event handler to the load JavaScript event."}
- .ready(){data-tooltip="Specify a function to execute when the DOM is fully loaded."}
- .unload(){data-tooltip="Bind an event handler to the unload JavaScript event."}

{.marker-none .cols-3}

### Event Handler Attachment

- .bind(){data-tooltip="Attach a handler to an event for the elements."}
- .delegate(){data-tooltip="Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements."}
- .die(){data-tooltip="Remove event handlers previously attached using .live() from the elements."}
- .live(){data-tooltip="Attach an event handler for all elements which match the current selector, now and in the future."}
- .off(){data-tooltip="Remove an event handler."}
- .on(){data-tooltip="Attach an event handler function for one or more events to the selected elements."}
- .one(){data-tooltip="Attach a handler to an event for the elements. The handler is executed at most once per element per event type."}
- .trigger(){data-tooltip="Execute all handlers and behaviors attached to the matched elements for the given event type."}
- .triggerHandler(){data-tooltip="Execute all handlers attached to an element for an event."}
- .unbind(){data-tooltip="Remove a previously-attached event handler from the elements."}
- .undelegate(){data-tooltip="Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements."}

{.marker-none .cols-3}

### Form Events

- .blur(){data-tooltip="Bind an event handler to the blur JavaScript event, or trigger that event on an element."}
- .change(){data-tooltip="Bind an event handler to the change JavaScript event, or trigger that event on an element."}
- .focus(){data-tooltip="Bind an event handler to the focus JavaScript event, or trigger that event on an element."}
- .focusin(){data-tooltip="Bind an event handler to the focusin event."}
- .focusout(){data-tooltip="Bind an event handler to the focusout JavaScript event."}
- .select(){data-tooltip="Bind an event handler to the select JavaScript event, or trigger that event on an element."}
- .submit(){data-tooltip="Bind an event handler to the submit JavaScript event, or trigger that event on an element."}

{.marker-none .cols-3}

### Keyboard Events

- .keydown(){data-tooltip="Bind an event handler to the keydown JavaScript event, or trigger that event on an element."}
- .keypress(){data-tooltip="Bind an event handler to the keypress JavaScript event, or trigger that event on an element."}
- .keyup(){data-tooltip="Bind an event handler to the keyup JavaScript event, or trigger that event on an element."}
{.marker-none .cols-3}

### Mouse Events

- .click(){data-tooltip="Bind an event handler to the click JavaScript event, or trigger that event on an element."}
- .contextMenu(){data-tooltip="Bind an event handler to the contextmenu JavaScript event, or trigger that event on an element."}
- .dblclick(){data-tooltip="Bind an event handler to the dblclick JavaScript event, or trigger that event on an element."}
- .hover(){data-tooltip="Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements."}
- .mousedown(){data-tooltip="Bind an event handler to the mousedown JavaScript event, or trigger that event on an element."}
- .mouseenter(){data-tooltip="Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element."}
- .mouseleave(){data-tooltip="Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element."}
- .mousemove(){data-tooltip="Bind an event handler to the mousemove JavaScript event, or trigger that event on an element."}
- .mouseout(){data-tooltip="Bind an event handler to the mouseout JavaScript event, or trigger that event on an element."}
- .mouseover(){data-tooltip="Bind an event handler to the mouseover JavaScript event, or trigger that event on an element."}
- .mouseup(){data-tooltip="Bind an event handler to the mouseup JavaScript event, or trigger that event on an element."}
- .toggle(){data-tooltip="Bind two or more handlers to the matched elements, to be executed on alternate clicks."}

{.marker-none .cols-3}

## jQuery Effects

### Examples

```javascript
$("#menu-button").on("click", () => {
  // $('#menu').fadeIn(400, 'swing')
  $("#menu").fadeIn();
});

```

#### fadeOut effect

```javascript
$("#menu-button").on("click", () => {
  // $('#menu').fadeOut(400, 'swing')
  $("#menu").fadeOut();
});

```

### Basics

- .hide(){data-tooltip="Hide the matched elements."}
- .show(){data-tooltip="Display the matched elements."}
- .toggle(){data-tooltip="Display or hide the matched elements."}

{.marker-none .cols-3}

### Sliding

- .slideDown(){data-tooltip="Display the matched elements with a sliding motion."}
- .slideToggle(){data-tooltip="Display or hide the matched elements with a sliding motion."}
- .slideUp(){data-tooltip="Hide the matched elements with a sliding motion."}

{.marker-none .cols-3}

### Custom

- .animate(){data-tooltip="Perform a custom animation of a set of CSS properties."}
- .clearQueue(){data-tooltip="Remove from the queue all items that have not yet been run."}
- .delay(){data-tooltip="Set a timer to delay execution of subsequent items in the queue."}
- .dequeue(){data-tooltip="Execute the next function on the queue for the matched elements."}
- jQuery.dequeue(){data-tooltip="Execute the next function on the queue for the matched element."}
- .finish(){data-tooltip="Stop the currently-running animation, remove all queued animations, and complete all animations for the matched elements."}
- jQuery.fx.interval{data-tooltip="The rate (in milliseconds) at which animations fire."}
- jQuery.fx.off{data-tooltip="Globally disable all animations."}
- jQuery.speed{data-tooltip="Creates an object containing a set of properties ready to be used in the definition of custom animations."}
- .queue(){data-tooltip="Show the queue of functions to be executed on the matched elements."}
- jQuery.queue(){data-tooltip="Show the queue of functions to be executed on the matched element."}
- .stop(){data-tooltip="Stop the currently-running animation on the matched elements."}

{.marker-none .cols-3}

### Fading

- .fadeIn(){data-tooltip="Display the matched elements by fading them to opaque."}
- .fadeOut(){data-tooltip="Hide the matched elements by fading them to transparent."}
- .fadeTo(){data-tooltip="Adjust the opacity of the matched elements."}
- .fadeToggle(){data-tooltip="Display or hide the matched elements by animating their opacity."}

{.marker-none .cols-3}

## jQuery Ajax

### Examples

```javascript
$.ajax({
  url: this.action,
  type: this.method,
  data: $(this).serialize(),
})
  .done(function (server_data) {
    console.log("success" + server_data);
  })
  .fail(function (jqXHR, status, err) {
    console.log("fail" + err);
  });

```

### Global Ajax Event Handlers

- .ajaxComplete(){data-tooltip="Register a handler to be called when Ajax requests complete. This is an AjaxEvent."}
- .ajaxError(){data-tooltip="Register a handler to be called when Ajax requests complete with an error. This is an Ajax Event."}
- .ajaxSend(){data-tooltip="Attach a function to be executed before an Ajax request is sent. This is an Ajax Event."}
- .ajaxStart(){data-tooltip="Register a handler to be called when the first Ajax request begins. This is an Ajax Event."}
- .ajaxStop(){data-tooltip="Register a handler to be called when all Ajax requests have completed. This is an Ajax Event."}
- .ajaxSuccess(){data-tooltip="Attach a function to be executed whenever an Ajax request completes successfully. This is an Ajax Event."}

{.marker-none .cols-2}

### Helper Functions

- jQuery.param(){data-tooltip="Create a serialized representation of an array, a plain object, or a jQuery object suitable for use in a URL query string or Ajax request. In case a jQuery object is passed, it should contain input elements with name/value properties."}
- .serialize(){data-tooltip="Encode a set of form elements as a string for submission."}
- .serializeArray(){data-tooltip="Encode a set of form elements as an array of names and values."}

{.marker-none .cols-2}

### Low-Level Interface

- jQuery.ajax(){data-tooltip="Perform an asynchronous HTTP (Ajax) request."}
- jQuery.prefilter(){data-tooltip="Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax()."}
- jQuery.ajaxSetup(){data-tooltip="Set default values for future Ajax requests. Its use is not recommended."}
- jQuery.ajaxTransport(){data-tooltip="Creates an object that handles the actual transmission of Ajax data."}

{.marker-none .cols-2}

### Shorthand Methods

- jQuery.get(){data-tooltip="Load data from the server using a HTTP GET request."}
- jQuery.getJSON(){data-tooltip="Load JSON-encoded data from the server using a GET HTTP request."}
- jQuery.getScript(){data-tooltip="Load a JavaScript file from the server using a GET HTTP request, then execute it."}
- jQuery.post(){data-tooltip="Send data to the server using a HTTP POST request."}
- .load(){data-tooltip="Load data from the server and place the returned HTML into the matched elements."}

{.marker-none .cols-2}

## Miscellaneous

### jQuery Object

- jQuery(){data-tooltip="Accepts a string containing a CSS selector which is then used to match a set of elements."}
- jQuery.noConflict(){data-tooltip="Relinquish jQuery's control of the $ variable."}
- jQuery.sub(){data-tooltip="Creates a new copy of jQuery whose properties and methods can be modified without affecting the original jQuery object."}
- jQuery.holdReady(){data-tooltip="Holds or releases the execution of jQuery's ready event."}
- jQuery.when(){data-tooltip="Provides a way to execute callback functions based on zero or more Thenable objects, usually Deferred objects that represent asynchronous events."}

{.marker-none .cols-2}

### Deferred Object

- jQuery.Deferred(){data-tooltip=" A factory function that returns a chainable utility object with methods to register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function."}
- deferred.always(){data-tooltip=" Add handlers to be called when the Deferred object is either resolved or rejected. "}
- deferred.done(){data-tooltip=" Add handlers to be called when the Deferred object is resolved. "}
- deferred.fail(){data-tooltip=" Add handlers to be called when the Deferred object is rejected. "}
- deferred.isRejected(){data-tooltip=" Determine whether a Deferred object has been rejected. "}
- deferred.isResolved(){data-tooltip=" Determine whether a Deferred object has been resolved. "}
- deferred.notify(){data-tooltip=" Call the progressCallbacks on a Deferred object with the given args. "}
- deferred.notifyWith(){data-tooltip=" Call the progressCallbacks on a Deferred object with the given context and args. "}
- deferred.pipe(){data-tooltip=" Utility method to filter and/or chain Deferreds.  "}
- deferred.progress(){data-tooltip=" Add handlers to be called when the Deferred object generates progress notifications."}
- deferred.promise(){data-tooltip=" Return a Deferred's Promise object. "}
- deferred.reject(){data-tooltip=" Reject a Deferred object and call any failCallbacks with the given args. "}
- deferred.rejectWith(){data-tooltip=" Reject a Deferred object and call any failCallbacks with the given context and args. "}
- deferred.resolve(){data-tooltip=" Resolve a Deferred object and call any doneCallbacks with the given args. "}
- deferred.resolveWith(){data-tooltip=" Resolve a Deferred object and call any doneCallbacks with the given context and args. "}
- deferred.state(){data-tooltip="Determine the current state of a Deferred object. "}
- deferred.then(){data-tooltip="Add handlers to be called when the Deferred object is resolved, rejected, or still in progress. "}
- .promise(){data-tooltip=" Return a Promise object to observe when all actions of a certain type bound to the collection, queued or not, have finished. "}

{.marker-none .cols-2}

### Utilities

- jQuery.boxModel{data-tooltip="States if the current page, in the user's browser, is being rendered using the W3C CSS Box Model."}
- jQuery.browser{data-tooltip="Contains flags for the useragent, read from navigator.userAgent. This property was removed in jQuery 1.9 and is available only through the jQuery.migrate plugin. Please try to use feature detection instead."}
- jQuery.contains(){data-tooltip="Check to see if a DOM element is a descendant of another DOM element."}
- jQuery.each(){data-tooltip="A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties."}
- jQuery.extend(){data-tooltip="Merge the contents of two or more objects together into the first object."}
- jQuery.globalEval(){data-tooltip="Execute some JavaScript code globally."}
- jQuery.grep(){data-tooltip="Finds the elements of an array which satisfy a filter function. The original array is not affected."}
- jQuery.inArray(){data-tooltip="Search for a specified value within an array and return its index (or -1 if not found)."}
- jQuery.isArray(){data-tooltip="Determine whether the argument is an array."}
- jQuery.isEmptyObject(){data-tooltip="Check to see if an object is empty (contains no enumerable properties)."}
- jQuery.isFunction(){data-tooltip="Determines if its argument is callable as a function."}
- jQuery.isNumeric(){data-tooltip="Determines whether its argument represents a JavaScript number."}
- jQuery.isPlainObject(){data-tooltip="Check to see if an object is a plain object."}
- jQuery.isWindow(){data-tooltip="Determine whether the argument is a window."}
- jQuery.isXMLDoc(){data-tooltip="Check to see if a DOM node is within an XML document (or is an XML document)."}
- jQuery.makeArray(){data-tooltip="Convert an array-like object into a true JavaScript array."}
- jQuery.map(){data-tooltip="Translate all items in an array or object to new array of items."}
- jQuery.merge(){data-tooltip="Merge the contents of two arrays together into the first array. "}
- jQuery.noop(){data-tooltip="An empty function."}
- jQuery.now(){data-tooltip="Return a number representing the current time."}
- jQuery.parseHTML(){data-tooltip="Parses a string into an array of DOM nodes."}
- jQuery.parseJSON(){data-tooltip="Takes a well-formed JSON string and returns the resulting JavaScript value."}
- jQuery.parseXML(){data-tooltip="Parses a string into an XML document."}
- jQuery.proxy(){data-tooltip="Takes a function and returns a new one that will always have a particular context."}
- jQuery.support{data-tooltip="A collection of properties that represent the presence of different browser features or bugs. Intended for jQuery's internal use; specific properties may be removed when they are no longer needed internally to improve page startup performance. For your own project's feature-detection needs, we strongly recommend the use of an external library such as Modernizr instead of dependency on properties in jQuery.support."}
- jQuery.trim(){data-tooltip="Remove the whitespace from the beginning and end of a string."}
- jQuery.type(){data-tooltip="Determine the internal JavaScript [[Class]] of an object."}
- jQuery.unique(){data-tooltip="Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers."}
- jQuery.uniqueSort(){data-tooltip="Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers."}

{.marker-none .cols-2}

### DOM Element Methods

- .get(){data-tooltip="Retrieve one of the elements matched by the jQuery object."}
- .index(){data-tooltip="Search for a given element from among the matched elements."}
- .size(){data-tooltip="Return the number of elements in the jQuery object."}
- .toArray(){data-tooltip="Retrieve all the elements contained in the jQuery set, as an array."}

{.marker-none .cols-2}

### Internals

- .jquery{data-tooltip="A string containing the jQuery version number."}
- .context{data-tooltip="The DOM node context originally passed to jQuery(); if none was passed then context will likely be the document."}
- jQuery.error(){data-tooltip="Takes a string and throws an exception containing it."}
- .length{data-tooltip="The number of elements in the jQuery object."}
- .pushStack(){data-tooltip="Add a collection of DOM elements onto the jQuery stack."}
- .selector{data-tooltip="A selector representing selector passed to jQuery(), if any, when creating the original set."}

{.marker-none .cols-2}

### Callbacks Object

- jQuery.Callbacks(){data-tooltip="A multi-purpose callbacks list object that provides a powerful way to manage callback lists."}
- callbacks.add(){data-tooltip="Add a callback or a collection of callbacks to a callback list."}
- callbacks.disable(){data-tooltip="Disable a callback list from doing anything more."}
- callbacks.disabled(){data-tooltip="Determine if the callbacks list has been disabled."}
- callbacks.empty(){data-tooltip="Remove all of the callbacks from a list."}
- callbacks.fire(){data-tooltip="Call all of the callbacks with the given arguments."}
- callbacks.fired(){data-tooltip="Determine if the callbacks have already been called at least once."}
- callbacks.fireWith(){data-tooltip="Call all callbacks in a list with the given context and arguments."}
- callbacks.has(){data-tooltip="Determine whether or not the list has any callbacks attached. If a callback is provided as an argument, determine whether it is in a list."}
- callbacks.lock(){data-tooltip="Lock a callback list in its current state."}
- callbacks.locked(){data-tooltip="Determine if the callbacks list has been locked."}
- callbacks.remove(){data-tooltip="Remove a callback or a collection of callbacks from a callback list."}

{.marker-none .cols-2}

