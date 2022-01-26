# Markdown-it-bidi

This is a plugin for Markdown-it to add bidi (bidirectinal text) support to
its Markdown to HTML parser.

## Usage

Install dependencies
```
npm i markdown-it
npm i markdown-it-bidi
```

Use the package to add bidi support. For example:

```js
const MarkdownIt = require('markdown-it')
const mdBidi = require('markdown-it-bidi');

let md = new MarkdownIt();
mdBidi(md);

const inputText = `
# Heading 1
## Heading 2

Some text
in two lines!

- unordered list 1
    - unordered list 2

1. ordered list 1
    1. ordered list 2

> blockquote
`;

var result = md.render(inputText);
console.log(result)

```

## License:
This plugin is released under LGPL v3 or later
