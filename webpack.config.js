const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
   mode: 'none',
   entry: './src/app.js',
   output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
   },
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
   },
   devtool: 'cheap-module-eval-source-map',
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
               },
            },
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif|ttf|mp3|wav)$/,
            use: ['file-loader'],
         },
      ],
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         title: 'Dragon',
         template: './src/index.html',
      }),
   ],
}
