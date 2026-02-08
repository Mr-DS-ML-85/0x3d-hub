# INI

> This is a quick reference cheat sheet for understanding and writing INI-format configuration files.

Category: Programming

## Getting Started

### Introduction

- INI is a configuration file with a fixed standard format
- Base elements are keys or properties
- Each key consists of anameand avalue, separated by an equal sign (=)
- key nameis displayed to theleft sideof the equals sign
- Equal sign (=) and semicolon (;) arereservedcharacters
- INI configuration method comes from the MS-DOS operating system

Now an informal standard for many configurations, other operating systems may use.confor.cfgas a suffix

### Example

```ini
; Here are the comments
[owner]
name=John Doe
organization=Acme Products

[database]
; Here are the comments
server=192.0.2.42
port=143
file="acme payroll.dat"

[section.subsection]
foo = bar

```

### Comments

Comment (;)

```ini
; This is the comment text and will be ignored

```

Comment (#)

```ini
# Here is the comment text, â ï¸ Some compilers support it

```

Comments after a line (;,#)(not standard)

```ini
var = a ; this is an inline comment
foo = bar # this is another inline comment

```

Comments must appear alone on lines in some cases

### Sections

- The name appears on a line by itself
- Names are enclosed in square brackets[and]
- No explicitsection enddelimiter
- End at the nextsectiondeclaration or at the end of the file
- Section and attribute names are case insensitive

```ini
[section]
key1 = a
key2 = b

```

The same asJSONbelow ð

```json
{
  "section": {
    "key1": "a",
    "key2": "b"
  }
}

```

### Nesting (supported by some parsers)

```ini
[section]
domain = cheatsheets.zip
[section.subsection]
foo = bar

```

The same asJSONbelow ð

```json
{
  "section": {
    "domain": "cheatsheets.zip"
    "subsection": {
      "foo": "bar"
    }
  }
}

```

Nest to previous section (shorthand)

```ini
[section]
domain = cheatsheets.zip
[.subsection]
foo = bar

```

### Escape character

| sequence | meaning |
| --- | --- |
| `\\` | \ (single backslash, escape escape character) |
| `\'` | apostrophe |
| `\"` | double quotes |
| `\0` | null character |
| `\a` | ringtone/alert/sound |
| `\b` | Backspace, [Bell character] for some applications (https://en.wikipedia.org/wiki/Bell_character) |
| `\t` | tab character |
| `\r` | carriage return |
| `\n` | newline |
| `\;` | semicolon |
| `\#` | number sign |
| `\=` | equal sign |
| `\:` | colon |
| `\x????` | Unicode character for the hexadecimal code point corresponding to ???? |

### Array

```ini
[section]
domain = cheatsheets.zip
array[]=first value
array[]=second value

```

The same asJSONbelow ð

```json
{
  "section": {
    "domain": "cheatsheets.zip",
    "array": ["first value", "second value"]
  }
}

```

### Interpreter

- @go-ini/ini(golang)
- @npm/ini(nodejs)
- @zonyitoo/rust-ini(rust)
- @rxi/ini(c)
- @pulzed/mINI(c++)
- @rickyah/ini-parser(c#)
- @Enichan/Ini(c#)

## See also

- INI file configuration(wikipedia.org)

