const express = require('express');
const router = express.Router();
const auth = require("../../../config/auth");
const studentController = require("../controller/studentController");

// Student model
let StudentModel = require('../model/Student');

router.route('/').get(auth,(req, res) => {
    StudentModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 router.post('/create-student',studentController.registerNewStudent)

//  router.route('/create-student').post(auth,(req, res, next) => {
//     StudentModel.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// });

router.route('/edit-student/:id').get(auth,(req, res) => {
   StudentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update student
router.route('/update-student/:id').post(auth,(req, res, next) => {
  StudentModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

// Delete student
router.route('/delete-student/:id').delete(auth,(req, res, next) => {
  StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;