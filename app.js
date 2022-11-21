const path = require('path')

const sharedRoutes = require('./Router/shared.routes');
const authRoutes = require('./Router/auth.routes');

const db = require('./db/database')

const express = require('express');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'))
app.use(express.urlencoded({ extended: false }))

// app.use(express.static(__dirname, 'Public'))
app.use(express.static(path.join(__dirname, 'Public')));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.use(sharedRoutes);
app.use(authRoutes);

app.use(function (req, res, next) {
	res.send('500: RESOURCE NOT FOUND')
});

db.connectTODB().then(function () {
	app.listen(3690);
}).catch(function (error) {
	console.log(error)
});
