module.exports = {
	// entry: './src/entry.js',		>> Using Gulp + WebpackStream to Watch and compile
	output:{
		filename: 'main.js' //  	>> name of the file, if omitted name will be random
	},
	module:{
		loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}
		]
	}
}