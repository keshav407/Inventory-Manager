
const User= require('../models/userSchema');




const findUserByEmail= async(email)=>{
    
	return await User.findOne({email})
}
module.exports={findUserByEmail};