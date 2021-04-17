const { Router } = require('express')
const router = require('express').Router()
const User = require("../models/user-model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// //Route Create User 
// router.post("/", (req, res) => {
//   const user = User.create(req.body, (error) => {
//     if (error)
//       return res.status(400).json({
//         error: true,
//         message: "Error: User not saved, try again!",
//       });
//     return res.status(200).json({
//       error: false,
//       message: "User saved!",
//     });
//   });
// });

//Route Create User NEW
router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt() 
  const hashedPassword = await bcrypt.hash(req.body.password, salt)


  const user = new User({
    type: req.body.type,
    register_number: req.body.register_number,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  const result = await user.save()

  const { password, ...data} = await result.toJSON()

  res.send(data)

})  

//Route List Users 

router.get("/", (req, res) => {
  User.find()
    .then((client) => {
      return res.json(client);
    })
    .catch((error) => {
      return res.status(400)({
        error: true,
        message: "Registry not found!",
      });
    });
});

//Route Edit User
router.put("/user/:id", (req, res) => {
  const user = User.updateOne({ _id: req.params.id }, req.body, (error) => {
    if (error)
      return res.status(400).json({
        error: true,
        message: "Error: Client not updated! Try again!",
      });
    return res.json({
      error: false,
      message: "Sucess! User updated!",
    });
  });
});

//Route Delete User
router.delete("/:id", (req, res) => {
  const user = User.deleteOne({ _id: req.params.id }, (error) => {
    if (error)
      return res.status(400).json({
        error: true,
        message: "Error: User is not deleted!",
      });
    return res.json({
      error: true,
      message: "User Deleted!",
    });
  });
});

 
module.exports = router