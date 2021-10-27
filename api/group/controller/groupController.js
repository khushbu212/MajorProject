const Group = require("../model/Group");
const nodemailer = require("nodemailer");
// require('dd-js');

exports.addNewGroup = async (req, res) => {
  try {
    const group = new Group({
      name: req.body.name,
    });

    let data = await group.save();

    res.status(201).json({ success: true, data: data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.editGroup = async (req, res) => {
  Group.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.updateGroup = async (req, res) => {
  Group.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("Group successfully updated!");
      }
    }
  );
};

exports.deleteGroup = async (req, res) => {
  Group.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

exports.getAllGroups = async (req, res) => {
  Group.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  }).populate({ path: "students", select: "name email" });
};

exports.sendMailToTheGroup = async (req, res) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "9fcc6f9da930f9",
      pass: "9266fcef8fef28",
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let sendMailId = [];

  // get all groups
  let groups = await Group.find().populate({ path: "students", select: "name email" }).lean().exec(); 

  // console.log();

  groups.forEach((group) => {
    let mails = [];

    if (typeof group.students !== 'undefined' && group.students.length > 0) {
      group.students.forEach((student) => {
        mails.push(student.email);
      });

      const mailData = {
        from: "admin@admin.com", // sender address
        to: mails, // list of receivers
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        html: "<b>Hey there! </b>\n <br> This is our first message sent with Nodemailer<br/>",
      };
    
      transporter.sendMail(mailData, function (err, info) {
        if (err) return console.log(err);
        else {
          console.log(info);
          // res.json({ message: "mail send", message_id: info.messageId });
          sendMailId.push(info.messageId);
        }
      });

    }
  });

  
   res.json({ message: "mail send", message_id: sendMailId});

  
};
