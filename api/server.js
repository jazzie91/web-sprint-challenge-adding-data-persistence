const express = require('express');
const projects = express.Router();

const server = express();

server.use(express.json()); 
server.use('/api/projects', projects); 

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
