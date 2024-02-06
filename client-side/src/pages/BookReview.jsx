import React from 'react'
import { Book } from '../components'
import { useParams } from 'react-router-dom'

function BookReview() {
    const {id}=useParams();
  return (
   <div>
    <Book bookId={id} />
   </div>
  )
}

export default BookReview