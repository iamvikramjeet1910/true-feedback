import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document {  
    content: string;
    createdAt: Date;
}
// interface used for type safety
const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});


export interface User extends Document {  
    username:string;
    email: string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage:boolean;
    messages: Message[];
}

//match is called regex to validate email
const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                ,'please use a valid email address'],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"VerifyCode is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"VerifyCodeExpiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:false,
    },
    messages:[MessageSchema],
},{timestamps: true});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema));

export default UserModel;