import express from 'express'
const Router=express.Router();

import user_auth_routes from './user_auth_routes';

Router.use("/v0/user",user_auth_routes)

 export default Router
