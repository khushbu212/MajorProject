const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const groupSchema = new Schema({
   name: String,
},
   {timestamps: true}
);

groupSchema.virtual('students', {
   ref: 'Student', //The Model to use
   localField: '_id', //Find in Model, where localField 
   foreignField: 'group', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
groupSchema.set('toObject', { virtuals: true });
groupSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Group', groupSchema);
