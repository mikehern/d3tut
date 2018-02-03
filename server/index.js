const express = require('express')
const app = express()

const port = 3000;

app.get('/', (req, res) => res.send('Test!'))

app.use('/l1', express.static('./lessons/1/index.html'))

app.listen(port, () => console.log(`Listening on port ${port}`))