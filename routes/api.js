const router = require("express").Router();
const User = require("../model/User");
const { v4: uuidv4 } = require("uuid");
const {
  addProductValidation,
  updateProductValidation,
} = require("../validation");
const verify = require("./verifytoken");

//route for  adding expenses

router.post("/addnote", verify, (req, res) => {
  console.log("/addnote request with body");
  console.log(req.body);

  const id = req.user.id;
  User.findById(id, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        foundUser.notes.push({
          noteid: req.body.noteid,
          title: req.body.title,
          note: req.body.note,
          date: req.body.date,
          important: req.body.important,
        });
        foundUser.save();
        res.status(201).send("note added successfully");
      }
    }
  });
});

//route for viewing products
router.get("/viewnotes", verify, (req, res) => {
  console.log("/viewnote request with body");

  const id = req.user.id;

  User.findById(id, (error, foundUser) => {
    if (error) {
      res.send(error.message);
      console.log(error);
    } else {
      const { notes } = foundUser;
      res.send(notes);
    }
  });
});

//route for deleting expense
router.delete("/deletenote/:noteid", verify, (req, res) => {
  console.log("/deletenote request with noteid");
  console.log(req.params.noteid);
  const id = req.user.id;

  User.findById(id, (error, foundUser) => {
    if (error) {
      res.send(error);
      console.log(error);
    } else {
      if (foundUser) {
        const { notes } = foundUser;

        const filterednotes = notes.filter((item) => {
          return item.noteid != req.params.noteid;
        });
        while (foundUser.notes.length > 0) {
          foundUser.notes.pop();
        }

        foundUser.notes = filterednotes;
        foundUser.save();
        res.send(foundUser.notes);
      }
    }
  });
});

//route for updating expenses
router.patch("/updatenote", verify, (req, res) => {
  console.log("updatenote request with body");
  console.log(req.body);
  const id = req.user.id;
  try {
    User.findById(id, (error, foundUser) => {
      if (foundUser) {
        const { notes } = foundUser;

        const newNote = {
          noteid: req.body.noteid,
          title: req.body.title,
          note: req.body.note,
          date: req.body.date,
          important: req.body.important,
        };

        const updatedNote = notes.findIndex((item) => {
          return item.noteid === req.body.noteid;
        });

        foundUser.notes.splice(updatedNote, 1, newNote);

        foundUser.save();
        res.status(200).send("update successfull");
      }
    });
  } catch (err) {
    res.send(err);
  }
});

router.patch("/importantnote", verify, (req, res) => {
  console.log("updatenote request with body");
  console.log(req.body.noteid);
  const id = req.user.id;
  try {
    User.findById(id, (error, foundUser) => {
      if (foundUser) {
        const { notes } = foundUser;

        const newNote = {
          noteid: req.body.noteid,
          title: req.body.title,
          note: req.body.note,
          date: req.body.date,
          important: !req.body.important,
        };

        const updatedNote = notes.findIndex((item) => {
          return item.noteid === req.body.noteid;
        });

        foundUser.notes.splice(updatedNote, 1, newNote);

        foundUser.save();
        res.status(200).send("importance updated successfully");
      }
    });
  } catch (err) {
    res.send(err);
  }
});

// user detail
router.get("/userdetail", verify, (req, res) => {
  const id = req.user.id;

  User.findById(id, (error, foundUser) => {
    if (error) {
      res.send(error.message);
      console.log(error);
    } else {
      const user = {
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
        mobile: foundUser.mobile,
      };
      res.send(user);
    }
  });
});

module.exports = router;
