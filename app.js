const express = require('express');

const app = express();

app.get('/', (req, res)=>{
	res.status(200).send("<h1>Hello!</h1>");
});


app.get('/sayHello', (req, res)=>{
	res.status(200).send("<h1>SAY HELLO FROM BACK END</h1>");
});

app.listen(8000);
