module.exports = {
  entry: './src/App.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2']
        }
      }
    ]
  },

}
