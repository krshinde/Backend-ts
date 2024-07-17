

import { compare } from "bcryptjs";
import * as apiResponse from "../helper/api_response";
import {user_model} from "../model";
import { create_token } from "../middleware/authjwt";

export const sign_up_serv = async (data:any) =>{
    try {
        let {email,user_name, country_code, phone_number} = data
        let emailCheck = await user_model.findOne({email})
        if(emailCheck)return {mess:"Email already exists"}
        let usernameCheck = await user_model.findOne({user_name:user_name})
        if(usernameCheck)return {mess:"Username already exists"}
        let phoneCheck = await user_model.findOne({country_code,phone_number})
        if(phoneCheck)return {mess:"Phone number already exists"}
        let userCreate= await user_model.create(data)
        return userCreate
    } catch (error:any) {
        if(error.code===11000){return {mess:"Email already exists"}}
        console.log(error)
    }
}

export const login_serv = async (data:any) =>{
    try {
        let {email,user_name, country_code, phone_number,password} = data    
        let loginResult:any = await user_model.findOne({$or:[
            {email:email},
            {user_name:user_name},
            {$and:[{country_code:country_code},{phone_number:phone_number}]},
        ]}).lean()
        if(!loginResult)return null
        let pcheck = await compare(password,loginResult?.password)
        if(!pcheck) return null
        let token =await create_token(loginResult)
        
        loginResult.token=token
        return loginResult
    } catch (error:any) {
        console.log(error)
    }
}

export const user_detail_serv = async (id:string) =>{
    try {
        let user_detail:any = await user_model.findOne({_id:id})
        return user_detail
    } catch (error:any) {
        console.log(error)
    }
}