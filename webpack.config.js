const path = require('path');


/* ---------------
 * Main config
 * We will place here all the common settings
 * ---------------*/
var config = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    }
}

var configDist = Object.assign({}, config, {
    entry: 
    {
        dist: './src/index.js'
    },    
    output: {
        library: 'sandbox',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'sandbox.js',
        path: path.resolve(__dirname, 'dist'),
    }
});


var configExamples = Object.assign({}, config, {
    entry: 
    {
        dist: './src/index.js'
    },    
    output: {
        library: 'sandbox',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'sandbox.js',
        path: path.resolve(__dirname, 'examples'),
    }
});


module.exports = [configDist, configExamples];