const Group = require("../model/Group");
// require('dd-js');

exports.addNewGroup = async (req, res) => {
    try {
        
         const group = new Group({
           name: req.body.name,
         });

         let data = await group.save();
         
         res.status(201).json({success:true, data: data });
       } catch (err) {
         res.status(400).json({ err: err });
       }
};

exports.getAllGroups = async (req, res) => {
    Group.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      }).populate({path: 'students', select: 'name email'});
};