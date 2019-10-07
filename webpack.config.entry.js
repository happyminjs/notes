const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(path.resolve(__dirname, './src/index'));
module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build/index'),
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test:/\.css$/,
        exclude:/node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: '[name].js',
      inject: true,
      template: path.resolve(__dirname, './src' + '/index.html'),
    })
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./build"),
    compress: true,
    host: '0.0.0.0',
    port: 3008,
    open: true,
  }
}