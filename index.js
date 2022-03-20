module.exports = function markdownItBidi(md) {
  const rules = [
    'heading_open',
    'blockquote_open',
    'paragraph_open',
    'bullet_list_open',
    'bullet_list_close',
    'ordered_list_open',
    'ordered_list_close',
    'list_item_open',
    'table_open',
    'th_open',
    'td_open'
  ];

  const bidi = defaultRenderer => (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const prevToken = tokens[idx - 1];
    let setDirection = true;

    // No dir="auto" for child block-elements of lists
    if (env.parentList) {
      setDirection = false;
    }

    // Maintaining bidirectional text without affecting alignment
    if (
      token.type !== 'bullet_list_open' && token.type !== 'ordered_list_open' &&
      env.parentList && token.nesting === 1
    ) {
      token.attrSet('style', 'unicode-bidi:inherit;');
    }
    if (token.type === 'list_item_open') {
      token.attrSet('style', 'unicode-bidi:plaintext;');
    }

    // Store the token in the env object if it represents a top level <ul> or <ol>
    if (
      (token.type === 'bullet_list_open' || token.type === 'ordered_list_open') &&
      !env.parentList
    ) {
      env.parentList = token;
    }

    // Then remove it after reaching the closing tag
    if (
      (token.type === 'bullet_list_close' || token.type === 'ordered_list_close') &&
      env.parentList && token.level === env.parentList.level
    ) {
      delete env.parentList;
    }

    // No dir="auto" for the first child element of blockquotes
    if (prevToken && prevToken.type === 'blockquote_open') {
      setDirection = false;
    }

    // No dir="auto" for the first table cell
    if (token.type === 'th_open' && prevToken.type === 'tr_open') {
      setDirection = false;
    }

    // No dir="auto" for closing tags
    if (token.nesting === 1 && setDirection) {
      token.attrSet('dir', 'auto');
    }

    return defaultRenderer(tokens, idx, opts, env, self);
  };

  const proxy = (tokens, idx, opts, env, self) => {
    return self.renderToken(tokens, idx, opts, env, self);
  };

  rules.forEach(rule => {
    const defaultRenderer = md.renderer.rules[rule] || proxy;
    md.renderer.rules[rule] = bidi(defaultRenderer);
  });
};
