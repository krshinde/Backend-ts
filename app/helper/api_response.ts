import {Response} from 'express'

export const successResponse = (res:Response, msg:string):void =>{
    const data :{ status:Boolean,message:string}={
        status: true,
        message: msg
    };
     res.status(200).json(data);
}

export const successResponseWithData = (res: Response, msg: string, resdata: any): void => {
    const data :{status:Boolean,message:String,data:any} = {
        status: true,
        message: msg,
        data: resdata
    };
     res.status(200).json(data);
};

export const errorResponse = (res: Response, msg: any): void => {
    const data :{status:Boolean,message:string} = {
        status: false,
        message: msg
    };
     res.status(500).json(data);
};

export const notFoundResponse = (res: Response, msg: string): void => {
    const data :{status:Boolean,message:string} = {
        status: false,
        message: msg
    };
     res.status(404).json(data);
};

export const badRequest = (res: Response, msg: string): void => {
    const data :{status:Boolean,message:String}= {
        status: false,
        message: msg
    };
     res.status(400).json(data);
};

export const unauthorizedResponse = (res: Response, msg: string): void => {
    const data :{status:Boolean,message:String}= {
        status: false,
        message: msg
    };
      res.status(401).json(data);
};

export const forbiddenAccess = (res: Response, msg: string, data1?: any): void => {
    const data: { status: boolean, message: string, data?: any } = {
        status: false,
        message: msg
    };
    if (data1) {
        data.data = data1;
    }
     res.status(403).json(data);
};