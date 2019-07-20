const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt = require('bcryptjs');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    adminCode:{
        type:String
    },
    isadmin:{
        type:Boolean,
        default:false
    },
    itemDescription:{
        type:Array,
        required:true,
        trim:true,
    },
    quantity:{
        type:Number,
        required:true,
        trim:true,
    },
    feedback:{
        type:String,
        required:true,
        trim:true,
    },
})
//userSchema.statics.findByCredentials = async (email, password) => {
    // userSchema.statics.findByCredentials = async (email, password) => {
    //     const user = this.findOne({email})
        
        
    //     if (!user) {
    //     throw new Error('Unable to login')
    //     }
    //     const isMatch = await bcrypt.compare(password, user.password)
    //     if (!isMatch) {
    //     throw new Error('Unable to login')
    //     }
    //     return user
    //    }
    
userSchema.pre('save', async function(next){
    const user=this;
   
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8);
    }
    next();
    
    
    

})


const user= mongoose.model('user',userSchema);

module.exports=user;