# Markdown

> This is a quick reference cheat sheet to the Markdown syntax.

Category: Programming

## Markdown Quick Reference

### Headers (atx style)

```markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6

```

### Headers (setext style)

```markdown
Header 1
========

Header 2
--------

```

### Blockquotes

```markdown
> This is  
> a blockquote
>
> > Nested  
> > Blockquote

```

### Unordered List

```markdown
* Item 1
* Item 2
  * item 3a
  * item 3b

```

or

```markdown
- Item 1
- Item 2

```

or

```markdown
_ Item 1
+ Item 2

```

or

```markdown
- [ ] Checkbox off
- [x] Checkbox on

```

### Ordered List

```markdown
1. Item 1
2. Item 2  
   a. Item 3a  
   b. Item 3b

```

### Links

```markdown
[link](http://google.com)

[link][google]  
[google]: http://google.com

<http://google.com>

```

### Emphasis

```markdown
*italic*  
_italic_

**bold**  
__bold__

`inline code`  
~~struck out~~

```

### Horizontal line

Hyphens

```markdown
---

```

Asterisks

```markdown
***

```

Underscores

```markdown
___

```

### Code

```markdown
```javascript
console.log('This is a block code');
```

```

```markdown
~~~css
.button {
  border: none;
}
~~~

```

```markdown
    4 space indent makes a code block

```

### Escaped code

Escaped code blocks can be done with more back ticks on the outside or a different symbol.

```markdown
````markdown
```bash
echo hi
```
````

~~~markdown
```bash
echo hi
```
~~~

```

#### Inline code

```markdown
`Inline code` has back-ticks around it

```

### Tables

```markdown
| Left column | Center column | Right column |
| :---------- | :-----------: | -----------: |
| Cell 1      |   Centered    |        $1600 |
| Cell 2      |    Cell 3     |          $12 |

```

Simple style

```markdown
Left column | Center column | Right column
:----------:|:-------------:|:-----------:
   Cell 1   |   Centered    |    $1600
   Cell 2   |    Cell 3     |     $12

```

A markdown table generator:tableconvert.com

### Images

```markdown
![GitHub Logo](/images/logo.png)

![Alt Text](url)

```

#### Image with link

```markdown
[![GitHub Logo](/images/logo.png)](https://github.com/)

[![Alt Text](image_url)](link_url)

```

#### Reference style

```markdown
![alt text][logo]

[logo]: /images/logo.png 'Logo Title'

```

### Backslash escapes

| Characters | Escape | Description |
| --- | --- | --- |
| `\` | `\\` | Backslash |
| ``` | `\`` | Backtick |
| `*` | `\*` | Asterisk |
| `_` | `\_` | Underscore |
| `{}` | `\{\}` | Curly braces |
| `[]` | `\[\]` | Square brackets |
| `()` | `\(\)` | Parentheses |
| `#` | `\#` | Hash mark |
| `+` | `\+` | Plus sign |
| `-` | `\-` | Minus sign (hyphen) |
| `.` | `\.` | Dot |
| `!` | `\!` | Exclamation mark |

{.show-header}

