module.exports = function(app, passport){
	app.get('/', isLoggedIn, function(req,res){
		res.render('index');
	});

	app.get('/login', function(req,res){
		res.render('login');
		console.log('rendering login');
	});
	/*
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login'
	}));

	app.get('/signup', function(req, res){
		res.render('pages/signup.ejs');
		console.log('rendering signup');
	});
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/',
		failureRedirect: '/signup',
	}));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});*/
};

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	res.redirect('login');
};