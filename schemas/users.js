var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});
//unsure if i need this since I'll be creating the hashes online anyways
// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
  
userSchema.methods.validPassword = function(password) {
    console.log("comparing passwords:");
    console.log(password + ":"+this.password);
    return bcrypt.compare(this.password, password);
};
  
module.exports = mongoose.model('User', userSchema);