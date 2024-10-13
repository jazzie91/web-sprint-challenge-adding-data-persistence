const express = require('express');
const server = require('./server');


server.use(express.json());


server.get('/', (req, res) => {
  res.send('Server is running!');
});


const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
