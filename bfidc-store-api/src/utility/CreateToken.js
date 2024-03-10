const jwt = require("jsonwebtoken");
const CreateToken= async (data) => {
    let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data}
    let Token = await jwt.sign(Payload, 'SecretKey123456789');
    return (Token);
}
module.exports=CreateToken