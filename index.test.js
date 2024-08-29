const markdownIt = require('markdown-it');
const mdBidi = require('./index');

const md = markdownIt().use(mdBidi);

test('Add Bidi support to isolated elements', () => {
  // Headings
  expect(md.render('# Heading 1')).toEqual('<h1 dir="auto">Heading 1</h1>\n');
  expect(md.render('## Heading 2')).toEqual('<h2 dir="auto">Heading 2</h2>\n');
  expect(md.render('### Heading 3')).toEqual('<h3 dir="auto">Heading 3</h3>\n');
  expect(md.render('#### Heading 4')).toEqual('<h4 dir="auto">Heading 4</h4>\n');
  expect(md.render('##### Heading 5')).toEqual('<h5 dir="auto">Heading 5</h5>\n');
  expect(md.render('###### Heading 6')).toEqual('<h6 dir="auto">Heading 6</h6>\n');
  
  // Paragraphs
  expect(md.render('Some text')).toEqual('<p dir="auto">Some text</p>\n');
  expect(md.render('Some\ntext')).toEqual('<p dir="auto">Some\ntext</p>\n');

  // Lists
  expect(md.render('- item 1\n- item 2')).toEqual('<ul dir="auto">\n<li>item 1</li>\n<li>item 2</li>\n</ul>\n');
  expect(md.render('1. item 1\n1. item 2')).toEqual('<ol dir="auto">\n<li>item 1</li>\n<li>item 2</li>\n</ol>\n');
  expect(md.render('1. item 1\n2. item 2')).toEqual('<ol dir="auto">\n<li>item 1</li>\n<li>item 2</li>\n</ol>\n');
});

test('Add Bidi support to ul and ol but not li elements', () => {
  // Lists
  expect(
    md.render('- item 1\n    - item 2')
  ).toEqual('<ul dir="auto">\n<li>item 1\n<ul dir="auto">\n<li>item 2</li>\n</ul>\n</li>\n</ul>\n');
  expect(
    md.render('1. item 1\n    1. item 2')
  ).toEqual('<ol dir="auto">\n<li>item 1\n<ol dir="auto">\n<li>item 2</li>\n</ol>\n</li>\n</ol>\n');
});

test('Omit dir="auto" for the first child element', () => {
  expect(
    md.render('> # Heading\n> Some text')
  ).toEqual('<blockquote dir="auto">\n<h1>Heading</h1>\n<p dir="auto">Some text</p>\n</blockquote>\n');
});

test('Add bidi support to table', () => {
  const markdown = `
| a | b |
|---|---|
| c | d |
`;
  expect(md.render(markdown)).toEqual('<table dir="auto">\n<thead>\n<tr>\n<th>a</th>\n<th dir="auto">b</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td dir="auto">c</td>\n<td dir="auto">d</td>\n</tr>\n</tbody>\n</table>\n');
});
