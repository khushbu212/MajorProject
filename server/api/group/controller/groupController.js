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

exports.editGroup = async (req, res) => {

  Group.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })

}

exports.updateGroup = async (req,res) => {
  Group.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Group successfully updated!')
    }
  })
}

exports.deleteGroup = async(req, res) => {
  Group.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
}

exports.getAllGroups = async (req, res) => {
    Group.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      }).populate({path: 'students', select: 'name email'});
};