const express = require('express');

const app = express();

app.get('/', (req, res) => res.json('Hello there, welcome to Contacts app'));

// Routs def.
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));