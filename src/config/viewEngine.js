const express = require('express')
const path = require('path')

const configViewEngine = (app) => {
    // config template view engine
    // console.log('__dirname: ', __dirname); // __dirname: to use absolute path based on parent folder of current file
    // console.log('path: ', path.join(__dirname, 'views'));

    // app.set('views', path.join(__dirname, 'views')) //only find in this folder named 'views'
    app.set('views', path.join('./src', 'views'))
    app.set('view engine', 'ejs') //dinh nghia view engine

    // config static files: img, css, js
    app.use(express.static(path.join('./src', 'public'))) //only find in this folder named 'public'
}

module.exports = configViewEngine // = export default in reactjs