var strategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		console.log("serializeUser");
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		console.log("deserializeUser");
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
	passport.use('local-signup', new strategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true
		},
		function(req, username, password,done){
			process.nextTick(function(){
				User.findOne({'username': username}, function(err, user){
					if (err)
						return done(err);
					if(user){
						console.log("user found");
						return done(null, false)
					} else{
						console.log("creating user");
						var newUser = new User();
						newUser.username = username;
						newUser.password = newUser.generateHash(password);
						newUser.save(function(err){
							if(err)
								return done(err);
							return done(null, newUser);
						});
					}
				})
			});
		}
	));
	passport.use('local-login', new strategy({
		usernameFiled: 'username', 
		passwordField: 'password',
		passReqToCallback: true
		}, function(req, username, password, done){
		console.log("logging in");
		User.findOne({'username': username}, function(err, user){
			console.log("looking for users");
			if (err)
				return done(err);
			if(!user){
				console.log("no user found");
				return done(null, false);
			}
			if(!user.validPassword(password)){
				console.log("passwordinvalid");
				return done(null, false);
			}
		});
	}));
};