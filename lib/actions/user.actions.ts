'use server';
import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async({email,password}:signInProps)=>{
    try{
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", response.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        })
        return parseStringify(response);
    }
    catch(error){
        console.log(error);
    }
}

// after creating the user, it creates a session and stores the session secret with cookies
// httpOnly" preventing XSS
// sameSite: "strict", CSRF attacks
// secure: true Ensure that cookies are only sent over https
export const signUp = async(userData: SignUpParams)=>{
    try{
        const { account } = await createAdminClient();
        const { email, password, firstName, lastName } = userData;
        const newUserAccount= await account.create(
            ID.unique(), email, password, `${firstName} ${lastName}`);
        if(!newUserAccount) throw new Error("User creation failed");
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount);
    }
    catch(error){}
}
export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();
        return parseStringify(result);
    }
    catch (error) {
        return null;
    }
}

export const logoutAccount = async ()=>{
    try{
        const { account } = await createSessionClient();

        cookies().delete('appwrite-session');

        await account.deleteSessions();
    }catch(error){
        return null;
    }
}


