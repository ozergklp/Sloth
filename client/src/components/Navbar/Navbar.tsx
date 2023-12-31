import React from 'react'
import ICON from './sloth.png'
import Search from './SearchC'
import { BiCartAlt } from "react-icons/bi"
import { Link, Outlet } from 'react-router-dom'
import CartSideBar from '../CartSideBar/CartSideBar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import { SetCategories, SetItems } from '../../redux/features/itemSlice'
import { IItem } from '../../types/type'


export default function Navbar() {

    
    const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }
    return (
        <>
            <nav>
                <ul className='flex font-montserrat p-2 px-6 font-semibold text-sm  '>
                    <li className='p-2 m-2 flex'>
                    <img src={ICON} alt="sloth icon" width={50} className='mr-2'/>
                        <Link to='/' className='mt-2 font-bold hover:underline cursor-pointer   decoration-2 '>SLOTH</Link>
                    </li>
                    <Link to='/search' className='p-2 m-2 mt-4 text-slate-500 hover:underline cursor-pointer decoration-blue-700  '>
                    All 
                    </Link>
                    <Link to='/search/Shirts' className='p-2 m-2 mt-4 text-slate-500 hover:underline cursor-pointer decoration-blue-700  '>
                        Shirts</Link>
                    <Link to='/search/Drinkware'  className='flex-1 p-2 m-2 mt-4 text-slate-500 hover:underline cursor-pointer decoration-blue-700  '>
                        Drinkware</Link>
                    <Search />
                    <li className='p-2 m-2 mt-3 text-2xl  hover:underline cursor-pointer '>
                        <BiCartAlt className='hover:text-blue-700' onClick={toggleCart}/>
                        <CartSideBar isCartOpen={isCartOpen} toggleCart={toggleCart} />
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>

    )
}
