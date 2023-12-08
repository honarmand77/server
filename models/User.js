const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        trim: true , 
        require : [true , 'please add a username'],
        maxlength: 32
    },
    email:{
        type : String,
        trim: true , 
        require : [true , 'please add a e-mail'],
        minlength:[8, 'password must have at least 8 characters'],
        match:[
            /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ,
            'password must contain at least 1 upercase letter 1 lowercase 1'
        ],
        
    },
    password:{
        type : String,
        trim: true , 
        require : [true , 'please add a password'],
        uniqe: true,
        match:[
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/ ,
            'please add a valid e-mail'
        ]
    },
    phonenumber:{
        type : String,
        require : [true , 'please add a your phone number'],
        trim: true , 
        uniqe: true,
        match:[
            /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/ ,
            'please add a valid number'
        ]
    },
    
},{timestamps: true })


//انکریپت پاسورد 

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
       next() 
    }
    this.password = await bcrypt.hash(this.password , 10)
});


userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword , this.password);

}


userSchema.methods.jwtGenrateToken = function(){
    return jwt.sign({
        id: this.id
    },'MHOOKNHATRAMRAND',{
        expiresIn: 3600
    })
}


module.exports = mongoose.model("users" , userSchema)