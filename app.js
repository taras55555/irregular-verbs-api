const express = require('express')
require('dotenv').config();

const posts = require('./routes/posts');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/posts', posts);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});