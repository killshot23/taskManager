const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    // require: true,
    default: false
  },
});

module.exports = mongoose.model("Task", TaskSchema);
//looks for two things name and schema
//after this we can go to our controllers and start using our models

/* a mongoose model provides an interface to the db 

model is a wrapper for the schema
model defines type
model provides interface to the db

*/
