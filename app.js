import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.send('Welcome Bhaiji 😢!');
});

app.get('/:slipid', (req, res) => {
    const slipid = req.params.slipid;
    const sourceFile = path.join(__dirname, 'slips', `${slipid}.txt`);

    fs.readFile(sourceFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('❌ File Not Found');
        }
        res.send(`File Content:\n${data}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
