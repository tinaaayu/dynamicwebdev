const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
const DATA_PATH = path.join(__dirname, 'public', 'data.json');

app.get('/api/rocks', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    res.send(data.rocks);
});

app.post('/api/adopt', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

    const newRock = {
        id: Date.now(),
        name: req.body.name,
        adoptedBy: req.body.adoptedBy,
        type: req.body.type,
        trait: req.body.trait,
        image: req.body.image,
        petCount: 0
    };

    data.rocks.push(newRock);

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    res.send({ success: true, rock: newRock });
});

app.post('/api/pet/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const rock = data.rocks.find(r => r.id == req.params.id);

    if (!rock) return res.status(404).send({ error: "Rock not found" });

    rock.petCount++;

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    res.send({ success: true, petCount: rock.petCount });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
