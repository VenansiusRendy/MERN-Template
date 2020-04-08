// Import Express, Cannot use normal import not es6
const express = require('express');
// Import mongoDB
const connectDB = require('./config/db');
// Import node js path
const path = require('path');
// Call Express
const app = express();
// Connect Database
connectDB();
// To test database - Innit Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
// Serve static assets in production
// Check if it is production build
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));
  // Create Route, dirname = current directory then look at client then build then index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
// Initalize port for production || local
const PORT = process.env.PORT || 5000;
// Listen to the change in server, in the terminall call npm run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
