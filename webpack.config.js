var webpack = require('webpack');

var jsLoaders = ["babel-loader?stage=0"];

module.exports = {

  output: {
    library: 'AtomicForm',
    libraryTarget: 'umd'
  },

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  module: {
    loaders: [
      { test: /\.js$/,   loaders: jsLoaders, exclude: /node_modules/ },
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

};
