import axios from 'axios'

class AuthService {

    constructor(){}

    signup=async({email,password,fullName})=>{
        if(!email || !password || !fullName) return;
       try {
        const {data}=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/user/signup",{
            email,
            password,
            fullName
        },{
            withCredentials:true
        });
        return data;
       } catch (error) {
        throw error
       }

    };


    login=async({email,password})=>{
        if(!email || !password) return;
        try {
            const {data}=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/user/login",{
                email,
                password
            },{
                withCredentials:true
            });
            return data
        } catch (error) {
            throw error;
        }
    }

    verifyLogin=async()=>{
        try {
            const {data}=await axios.get(import.meta.env.VITE_SERVER_ENDPOINT+"/user/verify",{
                withCredentials:true
            });
            return data
        } catch (error) {
            throw error
        }
    }

    logout=async()=>{
        try {
            const {data}=axios.get(import.meta.env.VITE_SERVER_ENDPOINT+"/user/logout",{withCredentials:true});
            return data;
        } catch (error) {
            throw error;
        }
    }
};




export const authService=new AuthService();