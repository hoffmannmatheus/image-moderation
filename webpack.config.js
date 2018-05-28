//require our dependencies
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,

    entry: {
        ui: './ui/static/js/app/index.js',
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/assets/bundles'
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [
            //a regexp that tells webpack use the following loaders on all
            //.js and .jsx files
            {
                test: /\.jsx?$/,
                //we definitely don't want babel to transpile all the files in
                //node_modules. That would take a long time.
                exclude: /node_modules/,
                //use the babel loader
                loader: 'babel-loader',
                query: {
                    //specify that we will be dealing with React code
                    presets: ['react'],
                    plugins: ['transform-class-properties']
                }
            }
        ]
    },

    resolve: {
        //tells webpack where to look for modules
        modules: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['.js', '.jsx']
    },

    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
  }
};