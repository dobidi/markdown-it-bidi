module.exports = function markdownItBidi(md) {
    const rules = [
        'heading_open',
        'blockquote_open',
        'paragraph_open',
        'bullet_list_open',
        'ordered_list_open',
        'table_open',
        'th_open',
        'td_open'
    ]

    const bidi = defaultRenderer => (tokens, idx, opts, env, self) => {
        const token = tokens[idx]
        token.attrSet('dir', 'auto')
        return defaultRenderer(tokens, idx, opts, env, self)
    }

    const proxy = (tokens, idx, opts, _, self) => {
        return self.renderToken(tokens, idx, opts)
    }

    rules.forEach(rule => {
        const defaultRenderer = md.renderer.rules[rule] || proxy
        md.renderer.rules[rule] = bidi(defaultRenderer)
    })
}
