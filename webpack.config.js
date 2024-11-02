const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    entry: './src/index.js', // your entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // your output file
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // or any other loader you are using
                },
            },
            // Other loaders...
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Add other extensions as necessary
    },
    devtool: 'source-map', // This could be 'inline-source-map' or 'cheap-module-source-map' if needed
    ignoreWarnings: [
        {
            module: /chart\.js/,
            message: /Failed to parse source map/,
        },
    ],
    // Additional configurations...
    plugins: [
        // Your plugins...
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000, // Your port number
        historyApiFallback: true,
    },
};
