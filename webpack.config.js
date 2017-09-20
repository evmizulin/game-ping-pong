const path = require('path')
const cwd = process.cwd()
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;

const plugins = IS_DEV_SERVER ? [ new ExtractTextPlugin('style.css') ] : [
    // react build in production mode
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new ExtractTextPlugin('style.[sha256:contenthash:hex:20].css'),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
    })
]

module.exports = {
    entry: path.resolve(cwd, 'src', 'index.js'),
    output: {
        path: path.resolve(cwd, 'dist'),
        publicPath: '/dist/',
        filename: IS_DEV_SERVER ? 'index.js' : 'index.[chunkhash].js'
    },
    devServer: {
        historyApiFallback: true,
        port: 8080
    },
    devtool: IS_DEV_SERVER ? 'source-map' : false,
    module: {
        rules: [
            { test: /\.js$/, exclude: [path.resolve(cwd, 'node_modules')], use: 'babel-loader' },
            { test: /\.(css)$/, use: ExtractTextPlugin.extract([{ loader: 'css-loader', options: { minimize: !IS_DEV_SERVER } }]) },
            { test: /\.(styl)$/, use: ExtractTextPlugin.extract([{ loader: 'css-loader', options: { minimize: !IS_DEV_SERVER } }, 'stylus-loader']) },
            { test: /\.(jpg)|(png)|(eot)|(woff2)|(woff)|(ttf)|(svg)/, use: 'file-loader'}
        ]
    },
    plugins: plugins,
    resolve: {
        alias: {
            'gm': path.resolve(cwd, 'src')
        }
    }
}
