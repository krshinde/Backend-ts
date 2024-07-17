import {Request,Response} from 'express'
import * as apiResponse from "../helper/api_response";
import {login_serv, sign_up_serv, user_detail_serv} from "../services/user_auth_services";


export const sign_up = async (req:Request,res:Response) => {
    try {
        interface userResult {
            mess:string
        }
        let userresult : userResult | any = await sign_up_serv(req.body)
        if(!userresult)return apiResponse.badRequest(res,"Something Went Wrong")
        if(userresult?.mess)return apiResponse.badRequest(res,userresult?.mess)
        return apiResponse.successResponseWithData(res,"User registered successfully",userresult)
    } catch (error) {
        return apiResponse.errorResponse(res,error)
    }
}

export const login = async (req:Request,res:Response) => {
    try {
        interface userResult {
            mess:string
        }
        let userresult : userResult | any = await login_serv(req.body)
        if(!userresult)return apiResponse.badRequest(res,"Invalid credential")
        if(userresult?.mess)return apiResponse.badRequest(res,userresult?.mess)
        return apiResponse.successResponseWithData(res,"User login successfully",userresult)
    } catch (error) {
        return apiResponse.errorResponse(res,error)
    }
}

export const user_detail = async (req:Request,res:Response) => {
    try {
        let userresult = await user_detail_serv(res.locals.myId)
        if(!userresult)return apiResponse.notFoundResponse(res,"Something went wrong")
        return apiResponse.successResponseWithData(res,"User detail generated",userresult)
    } catch (error) {
        return apiResponse.errorResponse(res,error)
    }
}
