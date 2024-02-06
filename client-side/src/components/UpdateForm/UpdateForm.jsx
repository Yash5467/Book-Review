import React, { useState } from 'react'
import { contentService } from '../../services/Content.service';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function UpdateForm({prevDescription,prevRating,reviewId,setUpdatePopup}) {
    const [userRating,setUserRating]=useState(prevRating);
    const [description,setDescription]=useState(prevDescription);
    const {userData}=useSelector((state)=>state?.auth)
    const rating=[1,2,3,4,5];

    const handleSubmit=async()=>{
        try {
            await contentService.updateReview({reviewId:reviewId,description:description,rating:userRating});
            setUpdatePopup(false);
        } catch (error) {
            throw error
        }
    }
  return (
    <div>
    <div className="fixed  z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
        <div className="p-6 pt-0 text-center">
          <h1 className="text-xl p-4  font-semibold ">
            {userData?.fullName}
          </h1>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none p-3 w-full h-20 font-normal border-gray-100 border outline-gray-300 text-gray-500 mt-5 mb-6"
            ></textarea>
          </div>
          <div className="flex gap-5 justify-center">
            {rating.map((item) => (
              <span
                key={item}
                className="cursor-pointer"
                onClick={() => setUserRating(item)}
              >
                <FontAwesomeIcon
                  color={userRating >= item ? "orange" : "gray"}
                  icon={faStar}
                />
              </span>
            ))}
          </div>
          <div className="flex justify-evenly mt-8">
            <button
              onClick={() => setUpdatePopup(false)}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateForm