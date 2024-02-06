import React, { useState } from 'react'
import { SearchBox,Card } from '../components'


function Home() {
  const [data,setData]=useState([]);
  return (
  <div className='flex flex-col gap-20' >
      <div className='max-w-md mt-10 sm:ml-14' >
        <SearchBox setData={setData} />
    </div>
    <div className='grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' >
      {data && data.map((card)=>(
        <Card redirection={`/books/${card.id}`} imgSrc={card?.volumeInfo?.imageLinks?.thumbnail} subTitle={card?.volumeInfo?.subtitle} tittle={card?.volumeInfo?.title}  />
      ))}
    </div>
  </div>
  )
}

export default Home