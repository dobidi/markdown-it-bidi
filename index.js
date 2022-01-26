module.exports = function markdownItBidi (md) {
  const bidi = function(tokens, idx) {
    const wrapperTags = ['ul', 'ol', 'blockquote'];
    const tag = tokens[idx].tag;

    let result = `<${tag} dir="auto">`;
    result += wrapperTags.includes(tag) ? '\n' : '';

    return result;
  }

  md.renderer.rules.heading_open = (...args) => bidi(...args);
  md.renderer.rules.blockquote_open = (...args) => bidi(...args);
  md.renderer.rules.paragraph_open = (...args) => bidi(...args);
  md.renderer.rules.bullet_list_open = (...args) => bidi(...args);
  md.renderer.rules.ordered_list_open = (...args) => bidi(...args);
};