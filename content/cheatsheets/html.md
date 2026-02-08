# HTML

> This HTML quick reference cheat sheet lists the common HTML and HTML5 tags in readable layout.

Category: Programming

## Getting Started

### hello.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML5 Boilerplate</title>
  </head>
  <body>
    <h1>Hello world, hello CheatSheets.zip!</h1>
  </body>
</html>

```

Or try it out in thejsfiddle

### Comment

```html
<!-- this is a comment -->

<!--
    Or you can comment out a
    large number of lines.
-->

```

### Paragraph

```html
<p>I'm from CheatSheets.zip</p>
<p>Share quick reference cheat sheet.</p>

```

See:The Paragraph element

### HTML link

```html
<a href="https://cheatsheets.zip">CheatSheets</a>
<a href="mailto:[email protected]">Email</a>
<a href="tel:+12345678">Call</a>
<a href="sms:+12345678&body=ha%20ha">Msg</a>

```

|  |  |  |
| --- | --- | --- |
|  | `href` | The URL that the hyperlink points to |
|  | `rel` | Relationship of the linked URL |
|  | `target` | Link target location: `_self` , `_blank` , `_top` , `_parent` |

{.left-text}

See:The <a> Attributes

### Image Tag

```html
<img
  loading="lazy"
  src="https://xxx.png"
  alt="Describe image here"
  width="400"
  height="400"
/>

```

|  |  |  |
| --- | --- | --- |
|  | `src` | Required, Image location(URL \| Path) |
|  | `alt` | Describe of the image |
|  | `width` | Width of the image |
|  | `height` | Height of the image |
|  | `loading` | How the browser should load |

{.left-text}

See:The Image Embed element

### Text Formatting Tags

```html
<b>Bold Text</b>
<strong>This text is important</strong>
<i>Italic Text</i>
<em>This text is emphasized</em>
<u>Underline Text</u>
<pre>Pre-formatted Text</pre>
<code>Source code</code>
<del>Deleted text</del>
<mark>Highlighted text (HTML5)</mark>
<ins>Inserted text</ins>
<sup>Makes text superscripted</sup>
<sub>Makes text subscripted</sub>
<small>Makes text smaller</small>
<kbd>Ctrl</kbd>
<blockquote>Text Block Quote</blockquote>

```

### Headings

```html
<h1>This is Heading 1</h1>
<h2>This is Heading 2</h2>
<h3>This is Heading 3</h3>
<h4>This is Heading 4</h4>
<h5>This is Heading 5</h5>
<h6>This is Heading 6</h6>

```

You should only have one h1 on your page

### Section Divisions

|  |  |
| --- | --- |
| `<div></div>` | Division or Section of Page Content |
| `<span></span>` | Section of text within other content |
| `<p></p>` | Paragraph of Text |
| `<br>` | Line Break |
| `<hr>` | Basic Horizontal Line |

These are the tags used to divide your page up into sections

### Inline Frame

```html
<iframe
  title="New York"
  width="342"
  height="306"
  id="gmap_canvas"
  src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
  scrolling="no"
>
</iframe>

```

#### â Preview

See:The Inline Frame element

### JavaScript in HTML

```html
<script type="text/javascript">
  let text = 'Hello CheatSheets.zip';
  alert(text);
</script>

```

#### External JavaScript

```html
<body>
  ...

  <script src="app.js"></script>
</body>

```

### CSS in HTML

```html
<style type="text/css">
  h1 {
    color: purple;
  }
</style>

```

#### External stylesheet

```html
<head>
  ...
  <link rel="stylesheet" href="style.css" />
</head>

```

## HTML5 Tags

### Document

```html
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <h1>CheatSheets.zip</h1>
  </main>
  <footer>
    <p>Â©2023 CheatSheets.zip</p>
  </footer>
</body>

```

### Header Navigation

```html
<header>
  <nav>
    <ul>
      <li><a href="#">Edit Page</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Facebook</a></li>
    </ul>
  </nav>
</header>

```

### HTML5 Tags

|  |  |
| --- | --- |
| article | Content thatâs independent |
| aside | Secondary content |
| audio | Embeds a sound, or an audio stream |
| bdi | The Bidirectional Isolate element |
| canvas | Draw graphics via JavaScript |
| data | Machine readable content |
| datalist | A set of pre-defined options |
| details | Additional information |
| dialog | A dialog box or sub-window |
| embed | Embeds external application |
| figcaption | A caption or legend for a figure |
| figure | A figure illustrated |
| footer | Footer or least important |
| header | Masthead or important information |
| main | The main content of the document |
| mark | Text highlighted |
| meter | A scalar value within a known range |
| nav | A section of navigation links |
| output | The result of a calculation |
| picture | A container for multiple image sources |
| progress | The completion progress of a task |
| rp | Provides fall-back parenthesis |
| rt | Defines the pronunciation of character |
| ruby | Represents a ruby annotation |
| section | A group in a series of related content |
| source | Resources for the media elements |
| summary | A summary for the <details> element |
| template | Defines the fragments of HTML |
| time | A time or date |
| track | Text tracks for the media elements |
| video | Embeds video |
| wbr | A line break opportunity |

### HTML5 Video

```html
<video controls="" width="100%">
  <source
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    type="video/mp4"
  />
  Sorry, your browser doesn't support embedded videos.
</video>

```

#### â Preview

### HTML5 Audio

```html
<audio
  controls
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
>
  Your browser does not support the audio element.
</audio>

```

#### â Preview

Your browser does not support the
audio element.

### HTML5 Ruby

```html
<ruby>
  æ± <rp>(</rp><rt>hÃ n</rt><rp>)</rp> å­ <rp>(</rp><rt>zÃ¬</rt><rp>)</rp>
</ruby>

```

#### â Preview

### HTML5 kdi

```html
<ul>
  <li>User <bdi>hrefs</bdi>: 60 points</li>
  <li>User <bdi>jdoe</bdi>: 80 points</li>
  <li>User <bdi>Ø¥ÙØ§Ù</bdi>: 90 points</li>
</ul>

```

#### â Preview

- Userhrefs: 60 points
- Userjdoe: 80 points
- UserØ¥ÙØ§Ù: 90 points

### HTML5 progress

```html
<progress value="50" max="100"></progress>

```



### HTML5 mark

```html
<p>I Love <mark>CheatSheets.zip</mark></p>

```

I LoveCheatSheets.zip

## HTML Tables

### Table Example

```html
<table>
  <thead>
    <tr>
      <td>name</td>
      <td>age</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Roberta</td>
      <td>39</td>
    </tr>
    <tr>
      <td>Oliver</td>
      <td>25</td>
    </tr>
  </tbody>
</table>

```

### HTML Table Tags

| Tag | Description |
| --- | --- |
| <table> | Defines a table |
| <th> | Defines a header cell in a table |
| <tr> | Defines a row in a table |
| <td> | Defines a cell in a table |
| <caption> | Defines a table caption |
| <colgroup> | Defines a group of columns |
| <col> | Defines a column within a table |
| <thead> | Groups the header content |
| <tbody> | Groups the body content |
| <tfoot> | Groups the footer content |

### <td> Attributes

| Attribute | Description |
| --- | --- |
| `colspan` | Number of columns a cell should span |
| `headers` | One or more header cells a cell is related to |
| `rowspan` | Number of rows a cell should span |

See:td#Attributes

### <th> Attributes

| Attribute | Description |
| --- | --- |
| `colspan` | Number of columns a cell should span |
| `headers` | One or more header cells a cell is related to |
| `rowspan` | Number of rows a cell should span |
| `abbr` | Description of the cell's content |
| scope | The header element relates to |

See:th#Attributes

## HTML Lists

### Unordered list

```html
<ul>
  <li>I'm an item</li>
  <li>I'm another item</li>
  <li>I'm another item</li>
</ul>

```

See:The Unordered List element

### Ordered list

```html
<ol>
  <li>I'm the first item</li>
  <li>I'm the second item</li>
  <li>I'm the third item</li>
</ol>

```

See:The Ordered List element

### Definition list

```html
<dl>
  <dt>A Term</dt>
  <dd>Definition of a term</dd>
  <dt>Another Term</dt>
  <dd>Definition of another term</dd>
</dl>

```

See:The Description List element

## HTML Forms

### Form tags

```html
<form method="POST" action="api/login">
  <label for="mail">Email: </label>
  <input type="email" id="mail" name="mail" />
  <br />
  <label for="pw">Password: </label>
  <input type="password" id="pw" name="pw" />
  <br />
  <input type="submit" value="Login" />
  <br />
  <input type="checkbox" id="ck" name="ck" />
  <label for="ck">Remember me</label>
</form>

```

#### â Preview

The HTML<form>element is used to collect and send information to an external source.

### Form Attribute

| Attribute | Description |
| --- | --- |
| `name` | Name of form for scripting |
| `action` | URL of form script |
| `method` | HTTP method, `POST` / `GET` (default) |
| `enctype` | Media type, Seeenctype |
| `onsubmit` | Runs when the form was submit |
| `onreset` | Runs when the form was reset |

### Label tags

```html
<!-- Nested label -->
<label
  >Click me
  <input type="text" id="user" name="name" />
</label>

```

```html
<!-- 'for' attribute -->
<label for="user">Click me</label>
<input id="user" type="text" name="name" />

```

forin a label references an input'sidattribute

### Input tags

```html
<label for="Name">Name:</label> <input type="text" name="Name" id="" />

```

#### â Preview

See:HTML input Tags

### Textarea tags

```html
<textarea rows="2" cols="30" name="address" id="address"></textarea>

```

#### â Preview

Textarea is a multiple-line text input control

### Radio Buttons

```html
<input type="radio" name="gender" id="m" />
<label for="m">Male</label>
<input type="radio" name="gender" id="f" />
<label for="f">Female</label>

```

#### â Preview

Radio buttons are used to let the user select exactly one

### Checkboxes

```html
<input type="checkbox" name="s" id="soc" />
<label for="soc">Soccer</label>
<input type="checkbox" name="s" id="bas" />
<label for="bas">Baseball</label>

```

#### â Preview

Checkboxes allows the user to select one or more

### Select tags

```html
<label for="city">City:</label>
<select name="city" id="city">
  <option value="1">Sydney</option>
  <option value="2">Melbourne</option>
  <option value="3">Cromwell</option>
</select>

```

#### â Preview

A select box is a dropdown list of options

### Fieldset tags

```html
<fieldset>
  <legend>Your favorite monster</legend>
  <input type="radio" id="kra" name="m" />
  <label for="kraken">Kraken</label><br />
  <input type="radio" id="sas" name="m" />
  <label for="sas">Sasquatch</label>
</fieldset>

```

#### â Preview

### Datalist tags(HTML5)

```html
<label for="b">Choose a browser: </label>
<input list="list" id="b" name="browser" />
<datalist id="list">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Internet Explorer"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
  <option value="Microsoft Edge"></option>
</datalist>

```

#### â Preview

### Submit and Reset Buttons

```html
<form action="register.php" method="post">
  <label for="foo">Name:</label>
  <input type="text" name="name" id="foo" />
  <input type="submit" value="Submit" />
  <input type="reset" value="Reset" />
</form>

```

#### â Preview

Submitthe data to server;Resetto default values

## HTML input Tags

### Input Attributes

The input tag is an empty element, identifying the particular type of field information to obtain from a user.

```html
<input type="text" name="?" value="?" minlength="6" required />

```

| - |  |  |
| --- | --- | --- |
|  | `type="â¦"` | The type of data that is being input |
|  | `value="â¦"` | Default value |
|  | `name="â¦"` | Used to describe this data in the HTTP request |
|  | `id="â¦"` | Unique identifier that other HTML elements |
|  | `readonly` | Stops the user from modifying |
|  | `disabled` | Stops any interaction |
|  | `checked` | The radio or checkbox select or not |
|  | `required` | Being compulsory, Seerequired |
|  | `placeholder="â¦"` | Adds a temporary, See::placeholder |
|  | `autocomplete="off"` | Disable auto completion |
|  | `autocapitalize="none"` | Disable auto capitalization |
|  | `inputmode="â¦"` | Display a specific keyboard, Seeinputmode |
|  | `list="â¦"` | The id of an associateddatalist |
|  | `maxlength="â¦"` | Maximum number of characters |
|  | `minlength="â¦"` | Minimum number of characters |
|  | `min="â¦"` | Minimum numerical value on range & number |
|  | `max="â¦"` | Maximum numerical value on range & number |
|  | `step="â¦"` | How the number will increment in range & number |
|  | `pattern="â¦"` | Specifies aRegular expression, Seepattern |
|  | `autofocus` | Be focused |
|  | `spellcheck` | Perform spell checking |
|  | `multiple` | Whether to allowmultiplevalues |
|  | `accept=""` | Expected file type infileupload controls |

{.left-text}

Also see:Attributes for the <input> element

### Input types

|  |  |
| --- | --- |
| `type="checkbox"` |  |
| `type="radio"` |  |
| `type="file"` |  |
| `type="hidden"` |  |
| `type="text"` |  |
| `type="password"` |  |
| `type="image"` |  |
| `type="reset"` |  |
| `type="button"` |  |
| `type="submit"` |  |

#### New Input Types in HTML5

|  |  |
| --- | --- |
| `type="color"` |  |
| `type="date"` |  |
| `type="time"` |  |
| `type="month"` |  |
| `type="datetime-local"` |  |
| `type="week"` |  |
| `type="email"` |  |
| `type="tel"` |  |
| `type="url"` |  |
| `type="number"` |  |
| `type="search"` |  |
| `type="range"` |  |

### Input CSS selectors

|  |  |
| --- | --- |
| `input:focus` | When its keyboard focused |

See:Input pseudo classes

## HTML meta Tags

### Meta tags

The meta tag describes meta data within an HTML document. It explains additional material about the HTML.

```html
<meta charset="utf-8" />

```

```html
<!-- title -->
<title>Â·Â·Â·</title>
<meta property="og:title" content="Â·Â·Â·" />
<meta name="twitter:title" content="Â·Â·Â·" />

```

```html
<!-- url -->
<link rel="canonical" href="https://Â·Â·Â·" />
<meta property="og:url" content="https://Â·Â·Â·" />
<meta name="twitter:url" content="https://Â·Â·Â·" />

```

```html
<!-- description -->
<meta name="description" content="Â·Â·Â·" />
<meta property="og:description" content="Â·Â·Â·" />
<meta name="twitter:description" content="Â·Â·Â·" />

```

```html
<!-- image -->
<meta property="og:image" content="https://Â·Â·Â·" />
<meta name="twitter:image" content="https://Â·Â·Â·" />

```

```html
<!-- ua -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

```

```html
<!-- viewport -->
<meta name="viewport" content="width=device-width" />
<meta name="viewport" content="width=1024" />

```

### Open Graph

```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_CA" />
<meta property="og:title" content="HTML cheatsheet" />
<meta property="og:url" content="https://cheatsheets.zip/html" />
<meta property="og:image" content="https://xxx.com/image.jpg" />
<meta property="og:site_name" content="Name of your website" />
<meta property="og:description" content="Description of this page" />

```

Used by Facebook, Instagram, Pinterest, LinkedIn, etc.

### Twitter Cards

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@FechinLi" />
<meta name="twitter:title" content="HTML cheatsheet" />
<meta name="twitter:url" content="https://cheatsheets.zip/html" />
<meta name="twitter:description" content="Description of this page" />
<meta name="twitter:image" content="https://xxx.com/image.jpg" />

```

See:Twitter Card Documentation

### Geotagging

```html
<meta name="ICBM" content="45.416667,-75.7" />
<meta name="geo.position" content="45.416667;-75.7" />
<meta name="geo.region" content="ca-on" />
<meta name="geo.placename" content="Ottawa" />

```

See:Geotagging

## Also see

- HTML 4.01 Specification(w3.org)

