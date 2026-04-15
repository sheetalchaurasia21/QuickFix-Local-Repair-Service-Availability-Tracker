import jwt from 'jsonwebtoken';

function auth(re,res){
    const token=req.cookies.token
    if(!token){
        res.statur(401).send({message:"Not Logged In"});
    }
    try{
        let decode=jwt.verift(token, process.env.JWT_SECRET);
        req.user=decode
        next()
        
    }catch(e){
        console.log(e);
        res.status(401).send({message:e})
    }

}
export default auth;
