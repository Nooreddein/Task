const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


let Schema = mongoose.Schema;

let Userscehma  = new Schema ({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

Users = mongoose.model('Users', Userscehma);

module.exports.Users = Users;
