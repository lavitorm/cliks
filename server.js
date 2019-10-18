var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var session = require('express-session');

// set the view engine to ejs
app.set('view engine', 'ejs');

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 1 * 1000 * 60 * 60 * 24 * 365 } }));

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'password',
//   database : 'cliks_db'
// });
var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "password",
	database: "cliks_db"
});

connection.connect();


/* -- Sessions / Authentication -- */

app.post('/auth/login', function(req,res){
	console.log(req.body)
	connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password],function (error, results, fields) {
		if (error) throw error;

		if (results.length == 0) {
			res.redirect('/index.html')
		} else {
			req.session.user_id = results[0].id;
			req.session.email = results[0].email;

			res.redirect('/my_network')
		}
	})
})

app.get('/my_network', function (req,res){
	// res.json(req.session)
	// res.sendfile('public/my_network.html')
	connection.query('SELECT * FROM academic_info', function (error, results, fields) {
		if (error) throw error;
		res.render('pages/my_network', {
			data: {
				user_name: req.session.user_name,
				academic_info: results
			}
		})
	})
})



// app.get('/index/:email/:password', function(req, res){
// 	connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.params.email, req.params.password],function (error, results, fields) {
// 	  if (error) throw error;
	  

// 	  if (results.length == 0){
// 		  res.redirect('/index.html')
// 	  }else {
// 	  	req.session.user_id = results[0].id;
// 	  	req.session.email = results[0].email;

// 		res.redirect('/my_network.html')
	  	
// 	  }

// 	});
// });



// app.get('/another-page', function(req, res){
// 	var user_info = {
// 		user_id : req.session.user_id,
// 		email: req.session.email
// 	}
// 	res.json(user_info);
// });


/* -- User Set Up -- */
// app.get('/user-setup', function(req, res){
// 	// if (req.query.user_name.length > 1){
// 		connection.query('INSERT INTO users (user_name, email, password, picture) VALUES (?)', [req.query.user_name], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid name')
// 	}
// 	if (req.query.picture.length > 1){
// 		connection.query('INSERT INTO users (picture) VALUES (?)', [req.query.picture], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid link')
// 	}
// 	if (req.query.email.length > 1){
// 		connection.query('INSERT INTO users (email) VALUES (?)', [req.query.email], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid email')
// 	}
// 	if (req.query.picture.length > 1){
// 		connection.query('INSERT INTO users (picture) VALUES (?)', [req.query.picture], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid link')
// 	}
// 	if (req.query.profession.length > 1){
// 		connection.query('INSERT INTO academic_info (profession) VALUES (?)', [req.query.profession], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid')
// 	}
// 	if (req.query.academic_degree.length > 1){
// 		connection.query('INSERT INTO academic_info (academic_degree) VALUES (?)', [req.query.academic_degree], function (error, results, fields) {
// 		  if (error) res.send(error)
// 		  else res.redirect('/');
// 		});
// 	}else{
// 		res.send('invalid')
// 	}
	
// });


/* -- Socket Chat -- */
app.get('/chat', function (req, res) {
	res.sendFile(__dirname + '/public/chat.html');
});

// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('disconnect', function(){
//       console.log('user disconnected');
//     });
//   });


// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', function (socket) {
	socket.on('chat message', function (msg) {
		io.emit('chat message', msg);
	});
});

io.emit('some event', { for: 'everyone' });

http.listen(3306, function () {
	console.log('listening on *:3306');
});

// app.get('/users', function(req, res){
// 	connection.query('SELECT * FROM users', function (error, results, fields) {
// 	  if (error) res.send(error)
// 	  else res.json(results);
// 	});
// });



// app.listen(3000, function(){
// 	console.log('listening on 3000');
// });