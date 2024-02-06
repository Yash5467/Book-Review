import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Card({redirection,imgSrc,tittle,subTitle}) {
  return (
    

<div className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow ">
    <Link to={redirection} >
        <img className="rounded-t-lg " src={imgSrc} alt="" />
    </Link>
    <div className="p-5">
        <Link to={redirection}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{tittle}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 ">{subTitle}</p>
        <Link to={redirection} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">
            Read more
           <span className='ml-4' >
            <FontAwesomeIcon icon={faArrowLeft} />
           </span>
        </Link>
    </div>
</div>

  )
}

export default Card