import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    return (
        <li className='p-2 m-2 mt-4 h-9 bg-slate-200 rounded-2xl flex items-center w-full sm:w-40 justify-between'>
            <input  type="text" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='bg-transparent font-medium focus:outline-none w-3/4 pl-2 text-sm '
                    />
            <button onClick={() => navigate(`/${searchTerm}`)}
                    className='focus:outline-none'    >
                <BiSearch className='mr-1  text-xl font-bold hover:text-blue-800'/> 
            </button>
        </li>
    )
}