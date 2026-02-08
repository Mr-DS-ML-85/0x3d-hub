# CheatSheets

> This is the magic syntax variant manual that you can use on CheatSheets.zip, It's a good practice for contributors.

Category: Other

## Getting Started

### Develop Setup

- Clone RepositoryView on Github$ git clone https://github.com/Fechin/reference.git
- Install Dependencies in the project directory$ npm install
- Start a Dev Serverhttp://localhost:4000$ npm run dev
- Create or modifysource/_posts/{name}.md
- Send us pull request and chill {.marker-timeline}

```shell
$ git clone https://github.com/Fechin/reference.git

```

```shell
$ npm install

```

```shell
$ npm run dev

```

It's a good practice to refer to the source code of theCheatSheets reference.

### Directory Structure

```yaml
.
âââ source
â   âââ _posts   # Cheatsheet source files
â   â   âââ awk.md
â   â   âââ vim.md # => cheatsheets.zip/vim
â   â   âââ php.md
â   â   âââ css.md # => cheatsheets.zip/css
â   â   âââ ...
â   âââ widget   # Widget files
â       âââ chmod.html
âââ public       # Distribution files
âââ _config.yml
âââ gulpfile.js
âââ package.json
âââ postcss.config.js
âââ tailwind.config.js
âââ themes
    âââ coo      # Theme files

```

### Cheatsheet Structure

```yaml
.
âââ Section 1   # Header
â   âââ Card 1
â   âââ Card 2
â   âââ Card 3
â   âââ ...
âââ Section 2
â   âââ Card 1
â   â   âââ Paragraph
â   â   âââ Code
â   â   âââ <hr/> (aka "---")
â   â   âââ List
â   â   â   âââ Paragraph
â   â   â   âââ Code
â   â   âââ Table
â   â       âââ Paragraph
â   â       âââ Code
â   âââ Card 2
â   âââ Card 3
â   âââ ...
âââ Section 3
âââ Section 4
âââ ...

```

- One cheatsheet contains multiple sections
- One section contains multiple cards
- One card can contain Code, Table, List and Paragraph
- One list can contain Code and Paragraph
- One table can contain Code and Paragraph

### Syntax Variants

- Section Variants
- Card Variants
- Table Variants
- List Variants
- Code Variants
- Paragraph Variants
- Cards Example

All the magic variants supported by CheatSheets.zip

### Create source/_posts/demo.md

```markdown
## Getting Started

### List Card {.col-span-2}

- Share quick reference
- Cheatsheet for developers ... {.style-timeline}

### Table Card

| id  | name    |
| --- | ------- |
| 1   | Roberta |

{.show-header}

```

## Section Variants

### Section Overview

| - | - |
| --- | --- |
| `{.cols-1}` | one-column layout |
| `{.cols-2}` | two-column layout |
| `{.cols-3}` | three-column layout(default) |
| ... |  |
| `{.cols-6}` | six-column layout |

- Section contains multiple cards
- Use {.cols-n} to specify section as an-column layout
- Click the preview button below to focus on the section

Preview{.link-arrow}

### .cols-1

```text
# One Column Example {.cols-1}
â­ââââââââââââââââââââââââââââââââââââââ®
â  1                                  â
â°ââââââââââââââââââââââââââââââââââââââ¯
â­ââââââââââââââââââââââââââââââââââââââ®
â  2                                  â
â°ââââââââââââââââââââââââââââââââââââââ¯

```

#### â Source Code

```markdown
## One Column Example {.cols-1}

### 1

### 2

```

Preview{.link-arrow}

### .cols-2

```text
# Two Columns Example
â­ââââââââââââââââââ® â­ââââââââââââââââââ®
â  1              â â  2              â
â°ââââââââââââââââââ¯ â°ââââââââââââââââââ¯
â­ââââââââââââââââââ®
â  3              â
â°ââââââââââââââââââ¯

```

#### â Source Code

```markdown
## Two Columns Example {.cols-2}

### 1

### 2

### 3

```

Preview{.link-arrow}

### .cols-3 (default)

```text
# Default
â­âââââââââââ® â­âââââââââââ® â­âââââââââââ®
â  1       â â  2       â â  3       â
â°âââââââââââ¯ â°âââââââââââ¯ â°âââââââââââ¯
â­âââââââââââ®
â  4       â
â°âââââââââââ¯

```

#### â Source Code

```markdown
## Default

### 1

### 2

### 3

### 4

```

## Card Variants

### Card Overview

#### Specifies the number of columns the card spans

| - | - |
| --- | --- |
| `{.col-span-2}` | Example |
| `{.col-span-3}` |  |
| ... |  |
| `.col-span-6}` |  |

#### Specifies the number of rows the card spans

| - | - |
| --- | --- |
| `{.row-span-2}` | Example |
| `{.row-span-3}` |  |
| ... |  |
| `{.row-span-6}` |  |

#### Emphasize card (akaH3Section)

| - | - |
| --- | --- |
| `{.primary}` | Red titles,Example |
| `{.secondary}` | Yellow titles,Example |

A complete example:Cards Example

### .col-span-2

#### The fifth card spans two columns

```text
â­ââââââââââ® â­ââââââââââ® â­ââââââââââ®
â  1      â â  2      â â  3      â
â°ââââââââââ¯ â°ââââââââââ¯ â°ââââââââââ¯
â­ââââââââââ® â­ââââââââââââââââââââââ®
â  4      â â  5                  â
â°ââââââââââ¯ â°ââââââââââââââââââââââ¯

```

```markdown
### 1

### 2

### 3

### 4

### 5 {.col-span-2}

```

#### The second card spans two columns

```text
â­ââââââââââ® â­ââââââââââââââââââââââ®
â  1      â â  2                  â
â°ââââââââââ¯ â°ââââââââââââââââââââââ¯
â­ââââââââââ® â­ââââââââââ® â­ââââââââââ®
â  3      â â  4      â â  5      â
â°ââââââââââ¯ â°ââââââââââ¯ â°ââââââââââ¯

```

```markdown
### 1

### 2 {.col-span-2}

### 3

### 4

### 5

```

#### The fourth card spans two columns

```text
â­ââââââââââ® â­ââââââââââ® â­ââââââââââ®
â  1      â â  2      â â  3      â
â°ââââââââââ¯ â°ââââââââââ¯ â°ââââââââââ¯
â­ââââââââââââââââââââââ® â­ââââââââââ®
â  4                  â â  5      â
â°ââââââââââââââââââââââ¯ â°ââââââââââ¯

```

```markdown
### 1

### 2

### 3

### 4 {.col-span-2}

### 5

```

### .row-span-2

#### The first card spans two rows

```text
â­âââââââââ® â­ââââââââââ® â­ââââââââââ®
â 1      â â 2       â â 3       â
â        â â°ââââââââââ¯ â°ââââââââââ¯
â        â â­ââââââââââ® â­ââââââââââ®
â        â â 4       â â 5       â
â°âââââââââ¯ â°ââââââââââ¯ â°ââââââââââ¯

```

```markdown
### 1 {.row-span-2}

### 2

### 3

### 4

### 5

```

#### The second card spans two rows

```text
â­ââââââââââ® â­âââââââââ® â­ââââââââââ®
â 1       â â 2      â â 3       â
â°ââââââââââ¯ â        â â°ââââââââââ¯
â­ââââââââââ® â        â â­ââââââââââ®
â 4       â â        â â 5       â
â°ââââââââââ¯ â°âââââââââ¯ â°ââââââââââ¯

```

```markdown
### 1

### 2 {.row-span-2}

### 3

### 4

### 5

```

#### The third card spans two rows

```text
â­ââââââââââ® â­ââââââââââ® â­âââââââââ®
â 1       â â 2       â â 3      â
â°ââââââââââ¯ â°ââââââââââ¯ â        â
â­ââââââââââ® â­ââââââââââ® â        â
â 4       â â 5       â â        â
â°ââââââââââ¯ â°ââââââââââ¯ â°âââââââââ¯

```

```markdown
### 1

### 2

### 3 {.row-span-2}

### 4

### 5

```

### .col-span-2 .row-span-2

```text
â­ââââââââââââââââââââââ® â­ââââââââââ®
â 1                   â â 2       â
â                     â â°ââââââââââ¯
â                     â â­ââââââââââ®
â                     â â 3       â
â°ââââââââââââââââââââââ¯ â°ââââââââââ¯
â­ââââââââââ® â­ââââââââââ® â­ââââââââââ®
â 4       â â 5       â â 6       â
â°ââââââââââ¯ â°ââââââââââ¯ â°ââââââââââ¯

```

#### â Source Code

```markdown
### 1 {.col-span-2 .row-span-2}

### 2

### 3

### 4

### 5

```

Spans rows and columns at the same time

## Table Variants

### Table Overview

| - | - |
| --- | --- |
| `{.show-header}` | Show the header of the table |
| `` | Render shortcut key style |
| `{.bold-first}` | Bold first column |
| `{.plus-first}` | Plus first column |
| `{.show-header}` | Show headers |
| `{.left-text}` | Align the last column left |
| `{.no-wrap}` | Don't wrap text |

### Basic table

| Pattern | Description |
| --- | --- |
| `[abc]` | Match a, b or c |
| `[^abc]` | Match except a, b or c |
| `[a-z]` | Match a to z |

#### â Source Code

```markdown
| Pattern  | Description            |
| -------- | ---------------------- |
| `[abc]`  | Match a, b or c        |
| `[^abc]` | Match except a, b or c |
| `[a-z]`  | Match a to z           |

```

### .shortcuts

| - | - |
| --- | --- |
| `Ctrl` `N` | New File |
| `Ctrl` `S` | Save |

#### â Source Code

```markdown
| -          | -        |
| ---------- | -------- |
| `Ctrl` `N` | New File |
| `Ctrl` `S` | Save     |


```

### .show-header

| Pattern | Description |
| --- | --- |
| `[abc]` | Match a, b or c |
| `[^abc]` | Match except a, b or c |
| `[a-z]` | Match a to z |

{.show-header}

#### â Source Code

```markdown
| Pattern  | Description            |
| -------- | ---------------------- |
| `[abc]`  | Match a, b or c        |
| `[^abc]` | Match except a, b or c |
| `[a-z]`  | Match a to z           |

{.show-header}

```

### .left-text

| Pattern | Description |
| --- | --- |
| `[abc]` | Match a, b or c |
| `[^abc]` | Match except a, b or c |
| `[a-z]` | Match a to z |

{.left-text}

#### â Source Code

```markdown
| Pattern  | Description            |
| -------- | ---------------------- |
| `[abc]`  | Match a, b or c        |
| `[^abc]` | Match except a, b or c |
| `[a-z]`  | Match a to z           |

{.left-text}

```

### .bold-first

| Pattern | Description |
| --- | --- |
| `[abc]` | Match a, b or c |
| `[^abc]` | Match except a, b or c |
| `[a-z]` | Match a to z |

{.bold-first}

#### â Source Code

```markdown
| Pattern  | Description            |
| -------- | ---------------------- |
| `[abc]`  | Match a, b or c        |
| `[^abc]` | Match except a, b or c |
| `[a-z]`  | Match a to z           |

{.bold-first}

```

## List Variants

### List Overview

List columns

| - | - |
| --- | --- |
| `{.cols-1}` | one column(default) |
| `{.cols-2}` | two columns |
| ... |  |
| `{.cols-6}` |  |

List markers

| - | - |
| --- | --- |
| `{.marker-none}` | Marker is not set |
| `{.marker-timeline}` | Marker style like timeline |
| `{.marker-round}` | Round marker |

### One Column (Default)

- Share quick reference.
- cheat sheet for developers.
- Contributed by open source angels.
- Manage your code snippets.

#### â Source Code

```markdown
- Share quick reference.
- cheat sheet for developers.
- Contributed by open source angels.
- Manage your code snippets.

```

### .cols-3

- Share
- Quick
- Reference
- And
- Cheat Sheet
- For
- Developers

{.cols-3}

#### â Source Code

```markdown
- Share
- Quick
- Reference
- And
- Cheat Sheet
- For
- Developers

{.cols-3}

```

### .marker-timeline

- Renamedtonew_name$ git branch -m <new_name>
- Pushand reset$ git push origin -u <new_name>
- Deleteremote branchshell script     $ git push origin --delete <old>

```shell
$ git branch -m <new_name>

```

```shell
$ git push origin -u <new_name>

```

{.marker-timeline}

#### â Source Code

```markdown
- **Renamed** to `new_name`
  ```shell script
  $ git branch -m <new_name>
  ```
- **Push** and reset
  ```shell script
  $ git push origin -u <new_name>
  ```
- **Delete** remote branch `shell script     $ git push origin --delete <old>     `

{.marker-timeline}

```

### .marker-none

- Share
- Quick
- Reference
- And
- Cheat Sheet

{.cols-2 .marker-none}

#### â Source Code

```markdown
- Share
- Quick
- Reference
- And
- Cheat Sheet

{.cols-2 .marker-none}

```

### .marker-round

- Share
- Quick
- Reference

{.marker-round}

#### â Source Code

```markdown
- Share
- Quick
- Reference

{.marker-round}

```

## Code Variants

### Basic code

```js
cheatsheets.zip.is(() => {
  awesome.site();
});

```

```js
here.is.some.more();

```

#### â Source Code

```markdown
````js
cheatsheets.zip.is(() => {
  awesome.site()
})
\```

```js
here.is.some.more()
\```
````

```

Code blocks can be placed one after the other.

### Code with headings

#### index.js

```js
cheatsheets.zip.is(() => {
  awesome.site();
});

```

#### other.js

```js
here.is.some.more();

```

#### â Source Code

```markdown
#### index.js

```js
cheatsheets.zip.is(() => {
  awesome.site();
});
```

#### other.js

```js
here.is.some.more();
```

```

Code blocks can have headings.

### Line wrapping

```js
<script>(function(d,s){if(window.Promise&&[].includes&&Object.assign&&window.Map)return;var js,sc=d.getElementsByTagName(s)[0];js=d.createElement(s);js.src='https://cdn.polyfill.io/v2/polyfill.min.js';sc.parentNode.insertBefore(js, sc);}(document,'script'))</script>

```

#### â Source Code

```markdown
```js {.wrap}
<script>(function(d,s){if(window.Promise&&[].includes&&Object.assign&&window.Map)return;var js,sc=d.getElementsByTagName(s)[0];js=d.createElement(s);js.src='https://cdn.polyfill.io/v2/polyfill.min.js';sc.parentNode.insertBefore(js, sc);}(document,'script'))</script>
```

```

Add{.wrap}to wrap long lines.

### Long lines (default)

```js
function createNode(nodeName: string, options: { key: string }) {
  return true
}

```

Long lines will have scrollbars.

## Paragraph Variants

### Header paragraphs

The text that appears in the header

#### â Source Code

```markdown
### Basic paragraphs

The text that appears in the header

```

### Middle paragraphs

- This is a list

This paragraph will appear in the middle

```js
cheatsheets.is(() => {
  awesome.site();
});

```

#### â Source Code

```markdown
### Middle paragraphs

- This is a list

This paragraph will appear in the middle

```js
cheatsheets.is(() => {
  awesome.site();
});
```

```

### Footer paragraphs

```js
cheatsheets.is(() => {
  awesome.site();
});

```

#### â Source Code

```markdown
```js
cheatsheets.is(() => {
  awesome.site();
});
```

This paragraph will appear in the footer

```

This paragraph will appear in the footer

### Crosslink

Add{.link-arrow}to make big loud external links:

```js
[Home](/) {.link-arrow}

```

Home{.link-arrow}

## Cards Example

### row-span-2

```
1

```

### col-span-2

```
2

```

### Primary Card

```
3

```

Add{.primary}to make the title red.

### Secondary Card

```
4

```

Add{.secondary}to make the title yellow.

### col-span-3

```
5

```

