const users = require('../models/User');

exports.signup  = async (req , res , next) => {
    const {email , username , phonenumber} = req.body;
    const userExist = await users.findOne({email , username , phonenumber});

    if(userExist){
        return res.status(400).json({
            sucsess : false,
            message: 'user accunt alreday exists'
        })
    }
    try {
        const user = await users.create(req.body);
        res.status(201).json({
            sucsess:true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            sucsess:false,
            message: error.message
        })
    }
}
exports.signin  = async (req , res , next) => {
    
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                sucsess:false ,
                message: "email or password are required"
            })}

             const user = await users.findOne({email});
             if (!user) {
                return res.status(400).json({
                    sucsess:false ,
                    message: "invalid account"
                })
             }
             const isMatched = await user.comparePassword(password)
             if(!isMatched){
                return res.status(400).json({
                    sucsess:false ,
                    message: "invalid account"
                })
             }

             generateToken(user , 200 , res);
   
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            sucsess:false ,
            message: "cannot login"
        })
    }
}

const generateToken = async (user , statusCode , res) => {

    const token = await user.jwtGenrateToken();
    const ticket = await user.id
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 1*60*60*1000)
    };

    res.status(statusCode)
    .cookie('token' , token , options)
    .json({
        sucsess:true , token, ticket
        
    })

}



exports.logout = ( req , res , next) => {
res.clearCookie('token');
res.status(200).json({
    sucsess: true , 
    message: 'logged out'
})
}

exports.userinfo = async (req, res) => {
    try {
      const { id } = req.params;
      if(id === '656a3c8265100ce2bd574a5d'){
          const Users = await users.find();

          if (Users) {
            res.status(200).json(Users);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
      }else{

          const user = await users.findById(id);
          
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.admin  = async (req , res , next) => {

    try {
        const user = await users.findById('655c0fcf772ba0f32b7e0583');
        res.status(200).json({
            sucsess:true,
            user
        })
    } catch (error) {
        next(error)
    }
}