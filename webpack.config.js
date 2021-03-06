const webpack = require('webpack');
const minimize = process.argv.indexOf('--minimize') !== -1;
const colors = require('colors');
if (minimize) {
  console.log('Building minified version of the library'.bgGreen.red);
} else {
  console.log('Building non minified version of the library'.bgGreen.red);
}

// Fail plugin will allow the webpack ts-loader to fail correctly when the TS compilation fails
var plugins = [];

module.exports = {
  mode: minimize ? "production" : "development",
  entry: {
    'coveo.extension': './src/Index'
  },
  output: {
    path: require('path').resolve('./bin/js'),
    // Output a filename based on the entry. This will generate a "coveo.extension.js" file.
    filename: minimize ? `[name].min.js` : `[name].js`,
    libraryTarget: 'umd',
    library: 'CoveoExtension',
    publicPath: '/js/'
  },
  externals: [{
    // Defines the module "coveo-search-ui" as external, "Coveo" is defined in the global scope. 
    // This requires you to load the original CoveoJsSearch.js file in your page.
    "coveo-search-ui":"Coveo",
    "coveofordynamics-search-ui":"CoveoForDynamics"
  }],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      options: {}
    }]
  },
  plugins: plugins,
  bail: true
}
