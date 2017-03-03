var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);//session 持久化

var index = require('./routes/index');
var users = require('./routes/users');

var port = process.env.PORT || 3100;

var app = express();
var dbUrl = 'mongodb://127.0.0.1:27017/ys';
mongoose.connect(dbUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('body-parser').urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret:'ys',
  store: new mongoStore({
    url:dbUrl,
    collection:'sessions'
  })
}))
app.use(express.static(path.join(__dirname,'publics')));
app.use(express.static(path.join(__dirname,'public')));
app.listen(port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', index);
app.use('/users', users);
require('./routes/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
