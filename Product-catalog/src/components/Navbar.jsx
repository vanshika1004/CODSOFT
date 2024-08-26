import React from 'react'
import {FaShoppingCart} from "react-icons/fa"
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const {cart} = useSelector((state)=>state);
  return (
    <div >
        <div className='flex flex-row justify-between items-center h-20 max-w-6xl mx-auto'>
            <NavLink to="/">
              <div className='ml-5'>
              <img src="https://th.bing.com/th/id/OIP.dCNy5XucoInkYH2kVsnhuQAAAA?w=250&h=250&rs=1&pid=ImgDetMain" width={100} height={100}/>
              </div>
            </NavLink>
            <div className='flex items-center font-medium text-slate-100 mr-5 space-x-6'>
                <NavLink to="/">
                <p>Home</p>
                </NavLink>
                <NavLink to="/cart">
                <div className='relative'>
                  <FaShoppingCart className='text-2xl'/>
                  {
                    cart.length>0 && 
                    <span className='absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white'>{cart.length}</span>
                  }
                  </div>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar;