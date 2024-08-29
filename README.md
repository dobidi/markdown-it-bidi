# Markdown-it-bidi

This is a plugin for Markdown-it to add bidi (bidirectinal text) support to
its Markdown to HTML parser.

## Usage

Install dependencies

```shell
npm i markdown-it
npm i markdown-it-bidi
```

Use the package to add bidi support. For example:

```js
const markdownit = require('markdown-it')
const mdBidi = require('markdown-it-bidi')

const md = markdownit().use(mdBidi)

const inputText = `
# Heading 1
## Heading 2

Some text
in two lines!

- unordered list 1
    - unordered list 2

1. ordered list 1
    1. ordered list 2

> first paragraph
>
> second paragraph
`;

const result = md.render(inputText)
console.log(result)
```

Output:

```html
<h1 dir="auto">Heading 1</h1>
<h2 dir="auto">Heading 2</h2>
<p dir="auto">Some text
in two lines!</p>
<ul dir="auto">
<li>unordered list 1
<ul dir="auto">
<li>unordered list 2</li>
</ul>
</li>
</ul>
<ol dir="auto">
<li>ordered list 1
<ol dir="auto">
<li>ordered list 2</li>
</ol>
</li>
</ol>
<blockquote dir="auto">
<p>first paragraph</p>
<p dir="auto">second paragraph</p>
</blockquote>
```

## License:
This plugin is released under LGPL v3 or later
