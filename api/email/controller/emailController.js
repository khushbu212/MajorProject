const Group = require("../../group/model/Group");
const Email = require("../model/Email");
const nodemailer = require("nodemailer");
var CronJobManager = require("cron-job-manager");
const manager = new CronJobManager();

exports.add = async (req, res) => {
  try {
    // create mail transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 465,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "9fcc6f9da930f9",
        pass: "9266fcef8fef28",
      },
    });


    manager.add(req.body.name,
      req.body.schedule, // the crontab schedule
      async () => {
        console.log("In job function");
        let group = await Group.findById(req.body.groupId)
          .populate({ path: "students", select: "name email" })
          .lean()
          .exec();

        let mails = [];

        if (
          typeof group.students !== "undefined" &&
          group.students.length > 0
        ) {
          group.students.forEach((student) => {
            mails.push(student.email);
          });

          mailData = {
            from: "admin@admin.com", // sender address
            to: mails, // list of receivers
            subject: req.body.subject,
            text: req.body.message,
            html: `<p> ${req.body.message} </p>`,
          };

          transporter.sendMail(mailData, function (err, info) {
            if (err) return console.log(err);
            else {
              console.log(info);
              console.log("Mail Sent")
            }
          });
        }
      });

    // manager1 = new CronJobManager( // this creates a new manager and adds the arguments as a new job.
    //   ,
    //   {
    //     // extra options..
    //     // see https://www.npmjs.com/package/cron for all available
    //     start: true,
    //     timeZone: "UTC",
    //     onComplete: () => {
    //       console.log("req.body.name has stopped....");
    //     },
    //   }
    // );

    manager.start(req.body.name);

    // check the key exist on the job
    if (manager.exists(req.body.name)) {
      const email = new Email({
        name: req.body.name,
        groupId: req.body.groupId,
        schedule: req.body.schedule,
        subject: req.body.subject,
        message: req.body.message,
      });

      let data = await email.save();

      res.status(201).json({ success: true, data: data });
    } else {
      res
        .status(201)
        .json({ success: false, message: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.getListOfJob = async (req, res) => {
  try {
    Email.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.edit = async (req, res) => {
  try {
    Email.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.update = async (req, res) => {
  try {
    // create mail transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 465,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "9fcc6f9da930f9",
        pass: "9266fcef8fef28",
      },
    });

    // get email
    let email = await Email.findById(req.params.id).lean().exec();
    // update cron job
    // manager = new CronJobManager();
    // manager.deleteJob(email.name);
    console.log(email.name);
    if (manager.exists(email.name)) {
      manager.stop(email.name);
      manager.update(
        email.name,
        req.body.schedule, // the crontab schedule
        async () => {
          let group = await Group.findById(req.body.groupId)
            .populate({ path: "students", select: "name email" })
            .lean()
            .exec();

          let mails = [];

          if (
            typeof group.students !== "undefined" &&
            group.students.length > 0
          ) {
            group.students.forEach((student) => {
              mails.push(student.email);
            });

            mailData = {
              from: "admin@admin.com", // sender address
              to: mails, // list of receivers
              subject: req.body.subject,
              text: req.body.message,
              html: `<p> ${req.body.message} </p>`,
            };

            transporter.sendMail(mailData, function (err, info) {
              if (err) return console.log(err);
              else {
                console.log(info);
              }
            });
          }
        }
      );
      manager.stop(email.name);
      manager.start(email.name);
    }else{
      // manager1 = new CronJobManager();
      // manager1.stop(email.name);

      manager.add(req.body.name,
        req.body.schedule, // the crontab schedule
        async () => {
          console.log("In job function");
          let group = await Group.findById(req.body.groupId)
            .populate({ path: "students", select: "name email" })
            .lean()
            .exec();
  
          let mails = [];
  
          if (
            typeof group.students !== "undefined" &&
            group.students.length > 0
          ) {
            group.students.forEach((student) => {
              mails.push(student.email);
            });
  
            mailData = {
              from: "admin@admin.com", // sender address
              to: mails, // list of receivers
              subject: req.body.subject,
              text: req.body.message,
              html: `<p> ${req.body.message} </p>`,
            };
  
            transporter.sendMail(mailData, function (err, info) {
              if (err) return console.log(err);
              else {
                console.log(info);
                console.log("Mail Sent")
              }
            });
          }
        });
  
      manager.start(req.body.name);
    }

    // update email in the database
    Email.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
          console.log("Email successfully updated!");
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.delete = async (req, res) => {
  try {
    // get email
    let email = await Email.findById(req.params.id).lean().exec();
    // manager = new CronJobManager();
    manager.deleteJob(email.name);

    Email.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    }); 
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

exports.test = async (req, res) => {

  try{

    var jobs = manager.listCrons();
    console.log("Displaying the job");
    console.log(jobs);
    res.status(200).json({
      msg: jobs,
    });

  }catch(err) {
    console.log(err);
    res.status(400).json({err: err});
  }

}
