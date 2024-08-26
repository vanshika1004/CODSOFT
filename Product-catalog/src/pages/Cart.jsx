import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from "../components/CartItem"
import { NavLink } from 'react-router-dom'

const Cart = () => {
    const {cart} = useSelector((state)=>state);
    const [totalAmount , setTotalAmount] = useState(0);
    useEffect(()=>{
        setTotalAmount(cart.reduce((acc,curr)=>acc+curr.price,0));
    },[cart])
  return (
    <div>
        {
            cart.length > 0 ?
            (<div className='flex gap-28 max-w-6xl mx-auto p-4'>
                <div className='flex flex-col max-w-2xl gap-6 '>
                {
                    cart.map((item , index)=>{
                        return <CartItem key={item.id} item={item} itemIndex={index}/>
                    })
                }
                </div>

                <div className='flex flex-col gap-y-96'>
                    <div className='flex flex-col gap-2'>
                    <div className='text-green-700 font-semibold uppercase'>
                    <div >Your Cart</div>
                    <div className='text-[40px] -mt-2'>Summary</div>
                    </div>
                    
                    <p className='text-black font-semibold'>
                        <span>Total items:{cart.length}</span>
                    </p>
                    </div>

                    <div>
                        <p className='text-black font-semibold'>Total Amount:<span className='font-extrabold'>${totalAmount}</span></p>
                        <button className='bg-green-700 p-2 px-24 text-white'>Checkout Now!</button>
                    </div>
                </div>
            </div>) :
            (<div>
                <h1>Your cart is empty</h1>
                <NavLink to={"/"}>
                <button>Shop Now</button>
                </NavLink>
            </div>)
        }
    </div>
  )
}

export default Cart