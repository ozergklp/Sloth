import React from 'react'
import { IItem } from '../types/type';
import { useNavigate } from 'react-router-dom';

interface IItemsArray {
    items: IItem[]
}
const  ItemsLayout: React.FC<IItemsArray> = ({items}) => {
    const navigate = useNavigate();
    return (
        <ul className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-8/12 gap-1  sm:place-items-center'>
        {items.map((item: IItem) => {
            const imageUrl = `http://localhost:4000/api/items/img/${item.imagePath}`;
            return (
                <li
                    key={item._id}
                    className='mx-2 w-[210px] my-2 shrink border-[1px] cursor-pointer inline rounded-xl hover:border-blue-500 p-1 ml-2 overflow-hidden '
                    onClick={() => navigate(`/${item._id}`)}
                >
                    <aside className='relative aspect-w-1 aspect-h-1'>
                        <img
                            src={imageUrl}
                            className='w-[250px] h-[245px] object-scale-down hover:scale-125 transition duration-500'
                            alt={item.name}
                        />
                    </aside>
                    <article className='border-[1px] rounded-xl text-sm mt-1 inline-flex font-semibold bg-white relative z-20'>
                        <p className='m-1 mr-2 p-1 truncate'>{item.name}</p>
                        <p className='bg-slate-800 rounded-xl p-1 m-1 text-white font-normal'>
                            {`$${item.price.toFixed(2)}`}</p>
                    </article>
                </li>
            );
        })}
        </ul>
    )
}

export default ItemsLayout;
