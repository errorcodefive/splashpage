var mongoose = require('mongoose');
var User = require('../schemas/users');

module.exports = (app) => {
    app.post('/api/users/signin', (req,res)=>{
        console.log("received POST /api/user/signin");
        var username = req.body.username;
        var password = req.body.password;

        if(!username){
            return res.send({ success: false,
            message: 'Error: Username cannot be blank.'
            });
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        username = username.trim();
        //find user via username
        User.find({
            username: username
        }, (err,users)=>{
            if(err){
                console.log("Error finding user." + err);
                return res.send({
                    success:false,
                    message: 'Error finding user.'
                });
            }
            if(users.length !=1){
                console.log("Error finding user." + err);
                return res.send({
                    success:false,
                    message: "Error finding user."
                })
            }
            var foundUser=users[0];
            var passwordMatches;

            passwordMatches = foundUser.validPassword(password);

            if(passwordMatches == false){
                console.log("Password does not match");
                return res.send({
                    success:false,
                    message: "Password does not match"
                })
            } else{
                //otherwise login is all good
                console.log("Username and Password is good");
                return(res.send({
                    success:true,
                    message: "Authenticated"
                }))
            }
            //implement certificate stuff
        })
    });
    app.get('/api/users/signin',(req,res)=>{
        console.log("received a GET request for /api/users/siginin");
        return(res.send({
            succes:true,
            message: "testing app.get for /api/users/signin"
        }));
    });
}