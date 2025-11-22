let express = require('express');
let app = express();

app.use(express.static('public'));
app.use(express.json());

let fails = [];

app.post('/uploadFail', (req, res) => {
    let fail = req.body.failLink;
    console.log("Adding fail:", fail);
    fails.push(fail);
    res.json({ status: "ok" });
});

app.get('/fails', (req, res) => {
    res.json({ recipes: fails });
});

app.listen(1111, () => {
    console.log('Server running on http://localhost:1111');
});
