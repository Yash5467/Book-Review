import React, { useEffect, useId, useState } from 'react'
import { searchService } from '../../services/Search.service';
import ReviewCard from '../ReviewCard/ReviewCard';
import ReviewForm from '../ReviewForm/ReviewForm';
import { contentService } from '../../services/Content.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Book({bookId}) {
    const [bookData,setBookData]=useState({});
    const [isReviewPopup,setIsReviewPopup]=useState(false);
    const [bookReviews,setBookReviews]=useState([]);
    const id=useId();
    const reviewMap=[1,2,3,4,5];
    useEffect(()=>{
        searchService.searchWithId({id:bookId}).then((res)=>setBookData(res));
        contentService.getBookReview({bookId}).then((res)=>setBookReviews(res.data));
    },[isReviewPopup])
  return (
    <div className=' flex flex-col gap-20 ' >
        <section className="overflow-hidden bg-white py-11 font-poppins ">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 md:w-1/2 ">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                        <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                            <img src={bookData?.volumeInfo?.imageLinks?.thumbnail} alt=""
                                className="object-contain max-h-[80vh] w-full h-full "/>
                        </div>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                    <div className="lg:pl-20">
                        <div className="mb-8 ">
                            <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold  md:text-4xl">
                               {bookData?.volumeInfo?.title}</h2>
                            <span className="text-lg font-medium text-rose-500 ">{bookData?.volumeInfo?.subtitle}</span>
                            <div className="flex items-center mt-4 mb-6">
                                <ul className="flex mr-2">
                                  {reviewMap.map(()=><span><FontAwesomeIcon color='gray' icon={faStar} /></span>)}
                                </ul>
                                <p className="text-xs  ">{bookReviews.length} Reviews</p>
                            </div>
                            <p className="max-w-md overflow-ellipsis h-20   mb-8 text-gray-700 ">
                               Authors : {bookData?.volumeInfo?.authors?.map((auther)=><span key={id} >{auther}</span>)}
                            </p>
                            <p className="inline-block mb-8 text-4xl font-bold text-gray-700  ">
                                <span>{bookData?.saleInfo?.listPrice?.amount} INR</span>
                              
                            </p>
                            <p className="text-green-600  ">{bookData?.volumeInfo?.pageCount} pages</p>
                        </div>
                        <div className="w-32 mb-8 ">
                           <a target='__blank' href={bookData?.volumeInfo?.previewLink} className="flex items-center justify-center w-full p-4 text-gray-500 border border-gray-500 rounded-md hover:bg-gray-600 hover:border-gray-600 hover:text-gray-100 ">
                  Get Preview
                           </a>
                        </div>
                        <div className="flex flex-wrap items-center -mx-4 ">
                            <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                                <button onClick={()=>setIsReviewPopup(true)}
                                    className="flex items-center justify-center w-full p-4 border border-gray-500 rounded-md hover:text-gray-400 text-white bg-black hover:bg-transparent ">
                                    Add Review
                                </button>
                            </div>
                            <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                <a  target='__black' href={bookData?.saleInfo?.buyLink}
                                    className="flex items-center justify-center w-full p-4 text-gray-500 border border-gray-500 rounded-md  hover:bg-black hover:border-gray-600 hover:text-white">
                                   Buy Here
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

          <div className='grid grid-cols-1 md:px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {bookReviews.map((review,i)=><div key={id} >
              <ReviewCard reviewId={review._id} description={review.description} userId={review.userId} rating={review.rating} userName={review.userName} avatar={review.userAvatar}  />
            </div>)}
           
           
          </div>
          <div className={`${!isReviewPopup?"hidden":""}`} >
          <ReviewForm setReviewPopup={setIsReviewPopup} bookId={bookId}  />
          </div>
    </div>
  )
}

export default Book