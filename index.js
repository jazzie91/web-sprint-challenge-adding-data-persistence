const express = require('express');
const projectRoutes = require('./routes/projectRoutes'); 
const resourceRoutes = require('./routes/resourceRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 


const app = express();


app.use(express.json());


app.use('/api/projects', projectRoutes); 
app.use('/api/resources', resourceRoutes); 
app.use('/api/tasks', taskRoutes); 


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

