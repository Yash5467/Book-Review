import axios from "axios";

class ContentService {
  constructor() {}

  addReview = async ({ userId, userAvatar, userName, description, rating,bookId }) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_ENDPOINT + "/content/add-review",
        {
          userId,
          userAvatar,
          userName,
          description,
          rating,
          bookId
        },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  getBookReview = async ({ bookId }) => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER_ENDPOINT + "/content/get-book-reviews",
        {
          bookId,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  removeReview=async({reviewId})=>{
      if(!reviewId) return;
 try {
  const {data}=await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/content/remove-review/${reviewId}`);

  return data;
 } catch (error) {
  throw error
 }

  };


  updateReview=async({reviewId,description,rating})=>{
    if(!reviewId || !description || !rating) return;

    try {
      const {data}=await axios.patch(import.meta.env.VITE_SERVER_ENDPOINT+"/content/update-review",{
        reviewId,
        description,
        rating
      });

      return data;
    } catch (error) {
      throw error
    }
  }


  addComment=async({userId,userName,reviewId,comment,avatar})=>{
         if(!userId || !userName || !reviewId || !comment || !avatar) return;

         try {
          const {data}=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/content/add-comment",{
            userId,
            userName,
            reviewId,
            comment,avatar
          });

          return data;
         } catch (error) {
          throw error
         }
  };

  getComment=async({reviewId})=>{
    if(!reviewId) return;
    try {
      const {data}=await axios.post(import.meta.env.VITE_SERVER_ENDPOINT+"/content/get-comments",{
        reviewId
      });
      return data;
    } catch (error) {
      throw error
    }
  }

  removeComment=async({commentId})=>{
    if(!commentId) return;

    try {
      const {data}=await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/content/remove-comment/${commentId}`);
      return data;
    } catch (error) {
      throw error
    }
  };

  updateComment=async({commentId,comment})=>{
    if(!commentId || !comment)return;

    try {
       const {data}=await axios.patch(import.meta.env.VITE_SERVER_ENDPOINT+"/content/update-comment",{
        comment,
        commentId
       });

       return data;
    } catch (error) {
       throw error;
    }
  }
}

export const contentService = new ContentService();
