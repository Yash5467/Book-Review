import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { contentService } from "../../services/Content.service";
import CommentCard from "../CommentCard/CommentCard";
import UpdateForm from "../UpdateForm/UpdateForm";
import CommentForm from "../CommentForm/CommentForm";

function ReviewCard({ userName, rating, description, avatar, userId ,reviewId}) {
  const { userData } = useSelector((state) => state?.auth);
  const [isUpdatePopup,setIsUpdatePopup]=useState(false);
  const [reviewComments,setReviewComments]=useState([]);
  const [isCommentPopup,setIsCommentPopup]=useState(false);
  const handleDelete=async()=>{
    try {
      await contentService.removeReview({reviewId:reviewId});
   const data= await contentService.getComment({reviewId:reviewId});
   setReviewComments(data.data);
    } catch (error) {
      throw error
    }
  }
  const ratingArray = [1, 2, 3, 4, 5];

  const handleComment=async(description)=>{
    console.log(userData,description);
    try {
      await contentService.addComment({userId:userData._id,userName:userData.fullName,reviewId:reviewId,comment:description,avatar:userData.avatar});
      setIsCommentPopup(false);

    } catch (error) {
      throw error 
    }
  }

  useEffect(()=>{
    contentService.getComment({reviewId}).then((res)=>setReviewComments(res.data))
  },[isCommentPopup])
  return (
    <div>
      <article>
        <div className="flex items-center mb-4">
          <img className="w-10 h-10 me-4 rounded-full" src={avatar} alt="" />
          <div className="font-medium ">
            <p>{userName}</p>
          </div>
        </div>
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
          {ratingArray.map((_, i) => (
            <span key={i}>
              <FontAwesomeIcon
                color={rating >= i + 1 ? "orange" : "gray"}
                icon={faStar}
              />
            </span>
          ))}
        </div>
        <p className="mb-2 text-gray-500 ">{description}</p>
        <aside>
          
            <div className="flex items-center mt-3">
              <button onClick={()=>setIsCommentPopup(true)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5">
                Add Comment
              </button>
              {  userId==userData?._id?
              <button onClick={handleDelete} className="ps-4 text-sm font-medium text-gray-600 hover:underline ">
                Delete
              </button>:""
          }
          {
            userId===userData?._id? <button onClick={()=>setIsUpdatePopup(true)} className="ps-4 text-sm font-medium text-gray-600 hover:underline ">
            update
          </button>:""
          }
            </div>
        </aside>
        <div>
          {
            isCommentPopup && <CommentForm setIsCommentPopup={setIsCommentPopup} handleComment={handleComment} userDescription={"Write Comment Here"}  />
          }
        </div>
       <div className="mt-5" >
        { reviewComments &&
          reviewComments.map((reviewComment,i)=><div key={i} >
            <CommentCard  commentId={reviewComment?._id} commentLabel={reviewComment?.comment} avatar={reviewComment?.avatar} commentUser={reviewComment.userName} isAdmin={reviewComment.userId===userData?._id} />
            </div>)
        }
       </div>
       <div className={`${!isUpdatePopup?"hidden":""}`} >
        <UpdateForm prevDescription={description} prevRating={rating} reviewId={reviewId} setUpdatePopup={setIsUpdatePopup}  />
       </div>

      </article>
    </div>
  );
}

export default ReviewCard;
