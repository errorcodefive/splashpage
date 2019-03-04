var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});
  
userSchema.methods.validPassword = function(password) {
    return bcrypt.compare(this.password, password);
};
  
module.exports = mongoose.model('User', userSchema);