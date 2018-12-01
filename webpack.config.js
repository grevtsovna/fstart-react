const path = require('path');

module.exports = {
    entry: ['./src/core/main.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};