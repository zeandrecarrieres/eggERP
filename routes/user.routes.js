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
  //preparing salt to hashe password
  const salt = await bcrypt.genSalt() 
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //create new user and hashe password
  const user = new User({
    type: req.body.type,
    register_number: req.body.register_number,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  //save user in MongoDB
  const result = await user.save()

  const { password, ...data} = await result.toJSON()

  //server return after user saved.
  res.send(data)

})  

//Route Login
router.post('/login', async (req, res)=>{
    //First Step) User email verification 
    const user = await User.findOne({email:req.body.email})

    if(!user){
      return res.status(404).send({
        message: 'User not found!'
      })
    }

    //Second Step) Password verification
    if(!await bcrypt.compare(req.body.password, user.password)) {
      return res.status(404).send({
        message: 'Invalid Credentials'
      })
    }

    //Third Step) Session Token Creation
    const token = jwt.sign({_id: user._id}, "secret")

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 //token time expiration (1day)
    })

    res.send({
      message: "Authentication sucess!"
    })

    console.log(token)
})


//Route Dash (Dashboard)

router.get('/', async (req, res) => {
  try {
    //Get cookie 
    const cookie = req.cookies['jwt']

    //Cookie verification
    const claims = await jwt.verify(cookie, 'secret')

    //if cookie is invalid, send msg 401 - not authorized!
    if(!claims) {
      return res.status(401).send({
        message: 'Not Autheticated!'
      })
    }

    //if cookie is valid, get user by Id associed
    const user = await User.findOne({_id:claims._id})

    // user {(JSON) _id,username,email,password}

    // const password = {(JSON)password} && const data = {(JSON)_id,username,email}

    const {password, ...data} = await user.toJSON()

    // const data = {(JSON)_id, name, email}

    //Send informations to authenticated user

    res.send(data)
  } catch (error) {
      return res.status(401).send({
        message: 'Not Authenticated!'
      })
  }
})


//Route Logout

router.post('/logout', (req, res) =>{
  res.cookie('jwt', '', {maxAge:0}) //Force Cookie time expiration (putting maxAge in 0 )

  res.send({
    message: 'User logout!'
  })
})


//Route List Users - essa

// router.get("/", (req, res) => {
//   User.find()
//     .then((client) => {
//       return res.json(client);
//     })
//     .catch((error) => {
//       return res.status(400)({
//         error: true,
//         message: "Registry not found!",
//       });
//     });
// });

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