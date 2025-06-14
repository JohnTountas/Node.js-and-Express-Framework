const User = require('../model/User');
const bcrypt = require("bcrypt");



const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).send("Username and Password are required!");
  //400: Bad Request

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({username:user }).exec();
  if (duplicate) return res.status(409).send("This User already exists!"); //409: Conflict

  try {
    //Encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //Create and store the new user in the MongoDB
    const result = await User.create ({
      username: user,
      password: hashedPwd

    });

    console.log(result);

    
    res.status(201).json({ Success: `New User: ${user} created successfully!` });
  } catch (err) {
    res.status(500).json({ Error_Message: err.message });
  }
};


module.exports = { handleNewUser };
