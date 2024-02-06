import React, { useState } from 'react'
import { contentService } from '../../services/Content.service'
import CommentForm from '../CommentForm/CommentForm';

function CommentCard({commentUser,commentLabel,commentId,isAdmin,avatar}) {
    const [isMenu,setIsMenu]=useState(false);
    const [isUpdatePopup,setIsUpdatePopup]=useState(false);
   const handleDelete=async()=>{
    try {
     await   contentService.removeComment({commentId:commentId});
     setIsMenu(false);
    } catch (error) {
     throw error   
    }
   }

   const handleEdit=async(desrciption)=>{
    try {
        await contentService.updateComment({commentId:commentId,comment:desrciption});
        setIsUpdatePopup(false);
        setIsMenu(false);
    } catch (error) {
        throw error;
    }
   }
  return (
  <div>
     <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src={avatar}
                        alt="User"/>{commentUser}</p>
                
            </div>
          {isAdmin && <div> <button onClick={()=>setIsMenu((prev)=>!prev)}
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>
            <div 
                class={` ${!isMenu?"hidden":""} z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow `}>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <button  onClick={()=>setIsUpdatePopup(true)}
                            class="block py-2 px-4 text-black ">Edit</button>
                    </li>
                    <li>
                        <button onClick={handleDelete}
                            class="block py-2 px-4 text-black ">Remove</button>
                    </li>
                    
                </ul>
            </div>
            </div>}

            <div>
                {
                    isUpdatePopup && <CommentForm userDescription={commentLabel} handleComment={handleEdit} setIsCommentPopup={setIsUpdatePopup} />
                }
            </div>
        </footer>
        
        <p class="text-gray-500 dark:text-gray-400">{commentLabel}</p>
  </div>
  )
}

export default CommentCard