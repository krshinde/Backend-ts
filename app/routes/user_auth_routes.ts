import express from 'express'
const route=express.Router();
import * as authjwt from '../middleware/authjwt' 
import * as controller from '../controller/user_auth_controller' 
import {validateRequest,user_auth_validation} from '../schema'
import {userLoginSchema, userSignUpSchema} from '../schema/user_auth_validation'


route.post("/sign-up",validateRequest(userSignUpSchema),controller.sign_up)
route.post("/login",validateRequest(userLoginSchema),controller.login)
route.get("/my-profile",authjwt.verifyToken,controller.user_detail)


export default route
