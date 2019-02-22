var mongoose = require('mongoose');
var User = require('../schemas/bookmarks');

module.exports = (app) => {
    app.post('/api/user/signup', (req,res,next)=>{
        var { body } = req;
        var { password } = body;
        let {
            email
        } = body;
        if(!email){
            return res.send({ success: false,
            message: 'Error: Email cannot be blank.'
            });
        }
        if(!password){
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        email = email.toLowerCase();
        email = email.trim();
        //Verify user doesnt exist already
        User.find({
            email:email
        }, (err, prevUser) =>{
            if(err){
                return res.send({
                    success: false, 
                    message: 'Error: Server error'
                });
            } else if (prevUser.length>0){
                return res.send({
                    success: false,
                    message: 'Error: Email already exists.'
                });
            }
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err,user)=>{
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: User could not be saved'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Successfully signed up'
                });
            });
        });
    });
}