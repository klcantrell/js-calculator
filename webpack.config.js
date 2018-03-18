const path = require('path'),
      ImageminPlugin = require('imagemin-webpack-plugin').default,
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/js/index.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
    publicPath: 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/js-calculator/images/',
		filename: "[name].bundle.js"
	},
	module: {
    rules: [
			{
	      test: /\.js$/,
	      exclude: /node_modules/,
	      use: {
            loader: 'babel-loader',
  	        options: {
  	          presets: [
  	            ['env', {
  	            	modules: false
  	            }]
  	          ]
  	        }
        }
	    },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: path.join(__dirname + 'dist')
            }
          },
          'extract-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            name: '[name]-[width].[ext]'
          }
        }
      }
    ]
	},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false
    }),
    new ImageminPlugin({test: /\.(png|jpg|gif)$/}),
    new MinifyPlugin({}, {
      exclude: /node_modules/
    })
  ]
}
