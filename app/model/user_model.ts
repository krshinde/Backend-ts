import mongoose,{Schema,Document} from 'mongoose'
import bcrypt from 'bcryptjs';

export interface UserInput {
    full_name:string,
    user_name:string,
    email:string,
    password:string,
    country_code:string,
    phone_number:number,
    device_token:string
  }
export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema <UserDocument>({
    full_name:{type:String, default:""},
    user_name:{type:String},
    email:{type:String,lowercase:true,unique:true},
    password:{type:String},
    country_code:{type:String},
    phone_number:{type:Number},
    device_token:{type:String},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

userSchema.pre<UserDocument>('save', async function (this: UserDocument, next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error:any) {
        next(error);
    }
});

export default mongoose.model<UserDocument>("user",userSchema)