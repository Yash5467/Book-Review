import { faArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { searchService } from '../../services/Search.service';

function SearchBox({setData}) {
    const [filter,setFilter]=useState("All Categories");
    const [isDrop,setIsDrop]=useState(false);
    const [searchQuery,setSearchQuery]=useState("java");
    const filterOptions=[
        {
            id:"education",
            label:"Education"
        },
        {
            id:"action",
            label:"Action"
        },
        {
            id:"horrer",
            label:"Horrer"
        }
    ]

    const handleClick=(filter)=>{
        setIsDrop(false);
        setFilter(filter);
    }

    useEffect(()=>{
    searchService.searchWithQuery({query:searchQuery}).then((res)=>setData(res.items))
    },[searchQuery])
  return (
   <div>
    
<form>
    <div className="flex">
        <button onClick={()=>setIsDrop((prev)=>!prev)} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100" type="button">{filter}<span className='ml-3' >
            <FontAwesomeIcon icon={faArrowDown} />
        </span>
  </button>
        <div className={`z-10 ${!isDrop?"hidden":""} top-40 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdown-button">
            {filterOptions.map((item)=>(  <li key={item.id} >
                <button onClick={()=>handleClick(item.label)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">{item.label}</button>
            </li>))}
            </ul>
        </div>
        <div className="relative w-full">
            <input type="search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg  border border-gray-300 focus:outline-none  " placeholder="Search Something..." required/>
            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
               <span>
                <FontAwesomeIcon icon={faSearch} />
               </span>
                
            </button>
        </div>
    </div>
</form>

   </div>
  )
}

export default SearchBox