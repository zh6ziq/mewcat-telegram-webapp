const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const tgBot = require('./bot');

require("dotenv").config();

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

tgBot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  console.log(`chatId: ${chatId}, message: ${messageText}`)

  if (messageText === "/start") {
    tgBot.sendMessage(chatId, "Welcome to the bot!");
  } else if (messageText.startsWith('/say')) {
    const msg = messageText.slice(5);

    if (!msg) {
      tgBot.sendMessage(chatId, "Please input your message");
    } else {
      tgBot.sendMessage(chatId, msg);
    }
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
