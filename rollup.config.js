const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')
const pkg = require('./package.json')

const plugins = [
    nodeResolve(),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        presets: [
            [
                '@babel/preset-env',
                { targets: '> 0.2%, not dead, not op_mini all' }
            ]
        ]
    }),
    {
        banner() {
            return `/*! ${pkg.name} ${pkg.version} ${pkg.repository.url} @license ${pkg.license} */`
        }
    }
]

module.exports = {
    input: 'index.js',
    output: [
        {
            file: 'dist/markdown-it-bidi.js',
            format: 'umd',
            name: 'markdownItBidi'
        },
        {
            file: 'dist/markdown-it-bidi.min.js',
            format: 'umd',
            name: 'markdownItBidi',
            plugins: terser({
                ecma: 5
            })
        }
    ],
    plugins
}
