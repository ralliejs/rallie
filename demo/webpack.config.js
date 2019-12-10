const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = (env, args) => { // eslint-disable-line
    return {
        mode: 'development',
        entry: {
            vueModule: './web/vueModule/main.js',
            bundle: './web/index.jsx'
        },
        output: {
            path: path.resolve(__dirname, './server/public/assets'),
            filename: '[name].js'
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.jsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'react']
                    }
                },
                {
                    test: /.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /.css$/,
                    loader: ['style-loader', 'css-loader']
                },
                {
                    test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
                        name: '[name].[ext]'
                    }
                }
            ]
        },
        plugins: [
            // make sure to include the plugin for the magic
            new VueLoaderPlugin()
        ]
    };
};