const Student = require("../model/Student");
const Group = require("../../group/model/Group");

exports.registerNewStudent = async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      group: req.body.group
    });

    let data = await student.save();

    // console.log("student created successfully");
    // const group = await Group.findById({ _id: student.group });
    // console.log("Group");
    // console.log(group);
    // group.students.push(gorup);
    // await group.save();

    res.status(201).json({ success: true, data: data });
  } catch (err) {
      console.log(err)
    res.status(400).json({ err: err });
  }
};
