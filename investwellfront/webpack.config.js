
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './app/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                },
            },
            {

                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ['style-loader','css-loader']
                        
            
            },
            {
                test: /\.(jpeg|jpg|png)$/,
                use: [
                    'file-loader'
                ]
      },
            
        ]
    },
    

}