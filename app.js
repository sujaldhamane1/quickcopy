
import express from 'express';
import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome Bhaiji 😢!');
});

app.get('/:slipid', (req, res) => {
    const slipid = req.params.slipid;
    const sourceFile = path.join('./slips', `${slipid}.txt`);

    fs.readFile(sourceFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('❌');
        }
        clipboardy.write(data).then(() => {
            res.send('👋');
        }).catch(() => {
            res.status(500).send('Failed to copy text to clipboard');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});