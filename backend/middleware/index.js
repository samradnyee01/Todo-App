const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authmiddleware(req,res,next){
    const token=req.headers.authorization;
    const decodedValue=jwt.verify(token,JWT_SECRET);
    if(token){
        req.username=decodedValue.username;
        next();
    }else{
        res.status(404).json({
            msg:"You are not authenticated"
        })
    }
}
module.exports=authmiddleware;