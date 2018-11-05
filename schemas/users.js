var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
module.exports = mongoose.model('User', userSchema);