import { Request } from "express";
import { verifyData } from "./Verify.type.js";


export interface AuthRequest extends Request {
    verify?: verifyData
    user?: object
}
