const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
 }
}, {
  collection: 'students'
},{timestamps: true})

module.exports = mongoose.model('Student', studentSchema)