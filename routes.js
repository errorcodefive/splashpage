module.exports = function(app, passport){

	app.get('/', function(req,res){
		res.render('pages/index.ejs');
	});


	app.get('/login', function(req,res){
		res.render('pages/login.ejs');
	});

	app.get('/signup', function(req, res){
		res.render('pages/signup.ejs');

	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}