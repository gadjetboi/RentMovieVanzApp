import { userModel } from "./userModel";

export interface tokenModel {
    token: string,
    expiration: string,
    appUser: userModel
}