require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const indexRouter = require('./routes/index.routes');

const { verifyAccessToken } = require('./middleware/verifyToken');
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cookieParser());
app.use(verifyAccessToken);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(process.env.NODE_ENV === 'production' 
// ? path.join('application/dist')
// : path.join(__dirname, '../client/dist')));
app.use('/', indexRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
