import jwt from 'jsonwebtoken';

function auth(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(401).send({message:"Not Logged In"});
    }
    try{
        let decode=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decode
        next()
        
    }catch(e){
        console.log(e); 
        return res.status(401).send({message:e})
    }

}

export default auth;
