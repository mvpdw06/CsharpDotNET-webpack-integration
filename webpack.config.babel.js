const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const isDevEnv = env === 'development';

// webpack settings
const getDevtoolSetting = () => {
    return isDevEnv ?
    'cheap-module-eval-source-map' :
    'cheap-module-source-map';
}
const getPluginsSetting = () => {
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new WebpackNotifierPlugin()
    ];
    if (isDevEnv) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    } else {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );
    }
    return plugins;
}
const webpackConfig = {
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: getDevtoolSetting(),
    plugins: getPluginsSetting()
}

const AppConfig = Object.assign({}, webpackConfig, {
    context: path.join(__dirname, 'Src'),
    entry: [
        "./Render.jsx",
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js'
    }
});


// module export
module.exports = [
    AppConfig
];