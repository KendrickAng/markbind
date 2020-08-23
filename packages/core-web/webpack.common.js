const path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    markbind: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: 'js/[name].min.js',
    library: 'MarkBind',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  externals: {
    vue: 'Vue',
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]!static',
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              root: __dirname,
              rootMode: 'upward',
            },
          },
        ],
      },
    ],
  },
};