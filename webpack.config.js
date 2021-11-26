const path = require('path')

module.exports = {
  mode: 'production',

  entry: {
    main: path.resolve(__dirname, 'src/scripts')
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: 'navkit.js',
    environment: {
      arrowFunction: false,
      destructuring: false
    }
  },

  // loaders
  module: {
    rules: [
      // js for babel
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
