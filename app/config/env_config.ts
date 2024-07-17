// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config();

interface Config {
    NODEENV: any
    LIVEMODE: any;
    PORT: any;
    MONGOURI: any;
    JWTSECRET: any;
    JWTEXPIRE: any;
    SALT: any,
    ACCESSTOKEN:any,
    REFRESHTOKEN:any,
    ACCESSTOKENPRIVATEKEY:any,
    ACCESSTOKENPUBLICKEY:any,
    REFRESHTOKENPRIVATEKEY:any,
    REFRESHTOKENPUBLICKEY:any
}
const config: Config = {
    NODEENV:process.env.NODE_ENV??"development",
    LIVEMODE:process.env.LIVE_MODE,
    PORT:process.env.PORT??3500,
    MONGOURI:process.env.LIVE_MODE=="true" ? process.env.LIVE_MONGO_URI : process.env.LOCAL_MONGO_URI??"mongodb://localhost:27017/loReady",
    JWTSECRET:process.env.ACCESS_SECRET_KEY,
    JWTEXPIRE:process.env.ACCESS_EXPIRE_IN,
    SALT: process.env.SALT || 10,
    ACCESSTOKEN: "15m",
    REFRESHTOKEN: "1y",
    ACCESSTOKENPRIVATEKEY: ``,
    ACCESSTOKENPUBLICKEY: ``,
    REFRESHTOKENPRIVATEKEY: ``,
    REFRESHTOKENPUBLICKEY: ``,
}

export default config