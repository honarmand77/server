const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        trim: true , 
        require : [true , 'لطفا یک نام کاربری اضافه کنید'],
        maxlength: 32
    },
    email:{
        type : String,
        trim: true , 
        require : [true , 'لطفا یک ایمیل اضافه کنید'],
        match:[
   
            /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            'لطفا یک ایمیل معتبر اضافه کنید'
        ],
        
    },
    password:{
        type : String,
        trim: true , 
        require : [true , 'لطفا یک رمز عبور اضافه کنید'],
        uniqe: true,
        minlength:[8, 'رمز عبور باید حداقل 8 کاراکتر داشته باشد'],
        match:[

            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/ ,
            'رمز عبور باید حداقل دارای 1 حرف بزرگ 1 کوچک 1 باشد'
        ]
    },
    phonenumber:{
        type : String,
        require : [true , 'لطفا یک شماره تلفن خود را اضافه کنید'],
        trim: true , 
        uniqe: true,
        match:[
            /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/ ,
            'لطفا یک شماره معتبر اضافه کنید'
        ]
    },
    
},{timestamps: true })



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