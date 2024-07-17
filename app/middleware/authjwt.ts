import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";
import env_config from "../config/env_config";
import * as apiResponse from "../helper/api_response";


// export interface customeRequest extends Request {
//     myId:string;
// }
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token  = req.headers.authorization;
    if (!token) return apiResponse.forbiddenAccess(res, "No token provided!");
    // const refreshToken = get(req, "headers.x-refresh");
    let decoded:any= await jwt.verify(token, env_config.JWTSECRET)
    res.locals.myId = decoded._id
    //   {
    //     valid: true,
    //     expired: false,
    //     decoded,
    //   };
        next();
    } catch (error:any) {
        console.error(error);
        if(error.message === "jwt expired"){
        //     if(refreshToken){
        //         const newAccessToken = await reIssueAccessToken({ refreshToken });
        //     if (newAccessToken) {
        //       res.setHeader("x-access-token", newAccessToken);
        //     }
        //     const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");
        //     res.locals.user = result.decoded;
        //     return next();
        //     }
        // {
        //   valid: false,
        //   expired: error.message === "jwt expired",
        //   decoded: null,
        // };
            return apiResponse.unauthorizedResponse(res,"Token exprired")
        }
        return apiResponse.forbiddenAccess(res,"Invalid Token")
    }
};

export const create_token = async (userData: object): Promise<string> => {
    return jwt.sign(userData, env_config.JWTSECRET, { expiresIn: env_config.JWTEXPIRE });
};

// export async function reIssueAccessToken({
//     refreshToken,
//   }: {
//     refreshToken: string;
//   }) {
//     const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
  
//     if (!decoded || !get(decoded, "session")) return false;
  
//     const session = await SessionModel.findById(get(decoded, "session"));
  
//     if (!session || !session.valid) return false;
  
//     const user = await findUser({ _id: session.user });
  
//     if (!user) return false;
  
//     const accessToken = signJwt(
//       { ...user, session: session._id },
//       "accessTokenPrivateKey",
//       { expiresIn: config.get("accessTokenTtl") } // 15 minutes
//     );
  
//     return accessToken;
//   }

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
  
    if (!user) {
      return res.sendStatus(403);
    }
  
    return next();
  };