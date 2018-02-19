require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const d3 = require('d3');
const gTrends = require('./googleTrends');

const port = 3000;

app.use(express.static('client'));

app.get('/', (req, res) => res.send('You have arrived.'));
app.use('/leaflet', express.static('./client/index.htm'));
app.listen(port, () => console.log(`Listening on port ${port}`));

gTrends.collectData().catch(err => console.error(err));