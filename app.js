const express = require('express');
const app = express();

// middleware
app.use(express.json());


// routes
const convertorRoutes = require('./routes/convertor.route');
app.use('/api', convertorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})