const express = require('express');

const app = express();

app.get('/',(req, res) => {
    return res.send('hello word')
});

app.listen(333);