module.exports = function markdownItBidi(md) {
  const rules = [
    'heading_open',
    'blockquote_open',
    'paragraph_open',
    'bullet_list_open',
    'ordered_list_open',
    'bullet_list_close',
    'ordered_list_close',
    'table_open',
    'th_open',
    'td_open'
  ];

  const isInactiveRangeStart = token => {
    return [
      'bullet_list_open',
      'ordered_list_open'
    ].includes(token.type);
  };

  const isInInactiveRange = (token, env) => {
    const inactiveRangeStart = env.inactiveRangeStart;

    if (!inactiveRangeStart) {
      return false;
    }

    if (
      token.nesting === -1
      && token.tag === inactiveRangeStart.tag
      && token.level === inactiveRangeStart.level
    ) {
      delete env.inactiveRangeStart;
      return false;
    }

    return true;
  };

  const isFirstChildInBlockquote = prevToken =>
    (prevToken && prevToken.type === 'blockquote_open');

  const isFirstThInTable = (token, prevToken) => 
    (token.type === 'th_open' && prevToken.type === 'tr_open');

  const bidi = defaultRenderer => (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const prevToken = tokens[idx - 1];

    if (
      !isInInactiveRange(token, env)
      && token.nesting === 1
      && !isFirstChildInBlockquote(prevToken)
      && !isFirstThInTable(token, prevToken)
    ) {
      token.attrSet('dir', 'auto');
    }

    if (
      !env.inactiveRangeStart
      && isInactiveRangeStart(token)
    ) {
      env.inactiveRangeStart = token;
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
