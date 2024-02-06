import axios from "axios"

class SearchService{
    constructor(){}

    searchWithQuery=async({query})=>{
        try {
            const {data}=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.VITE_GOOGLE_API}`);
            return data;
        } catch (error) {
            throw error
        }
    }

    searchWithId=async({id})=>{
        try {
            const {data}=await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}


export const searchService=new SearchService();