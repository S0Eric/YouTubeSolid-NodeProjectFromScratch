const path = require('path');

var config = {
  optimization: {
    minimize: true
  },
  mode: 'none',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(t|j)s(x?)$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          'babel-loader',
          'ts-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    publicPath: 'public',
    filename: 'ts-bundle.min.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.mode = 'development';
        config.optimization.minimize = false;
        config.devtool = 'inline-source-map';
        config.devServer = {
          overlay: true
//          contentBase: "public" // Causes source maps to not be found, so --open-page is used in CLI command.
        };
        config.output.filename = 'ts-bundle.js'
    }
    else if (argv.mode === 'production') {
        config.mode = 'production';
    }

    return config;
}
