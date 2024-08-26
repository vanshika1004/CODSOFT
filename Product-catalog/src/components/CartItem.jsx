import React from 'react'
import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from 'react-redux'
import { remove } from '../redux/Slices/CartSlice';
import {toast} from "react-hot-toast"

const CartItem = ({item , itemIndex}) => {
    const dispatch = useDispatch();
    const removeFromCart = () =>{
        dispatch(remove(item.id));
        toast.success("Item removed");
    }
  return (
    <div>
        <div className='flex justify-between gap-4 border-b-2 border-black h-[310px]'>
            <div className='w-2/5 h-[290px]'>
                <img src={item.image} className='w-full h-full'/>
            </div>
            <div className='w-2/5 flex flex-col gap-4'>
                <h1 className='text-gray-900 font-semibold text-lg'>{item.title}</h1>
                <h1>{item.description.split(" ").slice(0,15).join(" ")+"..."}</h1>
                <div className='flex justify-between'>
                    <p className='text-green-600 font-semibold'>${item.price}</p>
                    <div onClick={removeFromCart}
                    className='bg-red-300 rounded-full p-2 cursor-pointer'>
                        <FcDeleteDatabase/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem