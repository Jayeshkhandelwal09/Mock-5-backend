const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.json({msg:"Not authorized"})
      }
    } catch (error) {
        res.json({error:error.message})
    }
  }else{
    res.json({msg:"Please Login"})
  }
};

module.exports={
    auth
}