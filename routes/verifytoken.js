const jwt=require('jsonwebtoken');
module.exports=function(req,res,next){
const token=req.header("authtoken")
if(!token){
res.status(400).send("Access denied")    
}else{
try{
const verified=jwt.verify(token,process.env.TOKEN_SECRET) 
req.user=verified
next()   
}
catch(error){
res.status(400).send("Invalid token")    
}    
}    
}