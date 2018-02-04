const express = require('express')
const app = express()
const d3 = require('d3')

const port = 3000;

app.get('/', (req, res) => res.send('Test!'))

app.use('/l1', express.static('./lessons/1/index.html'))
app.use('/l2', express.static('./lessons/2/index.html'))

app.listen(port, () => console.log(`Listening on port ${port}`))