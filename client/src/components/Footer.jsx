import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='flex items-center justify-between gap-4 py-3 mt-20'>
            <Link to='/'><h1 className='w-28 sm:w-32 lg:40 text-2xl sm:text-3xl lg:text-4xl cursor-pointer'>PIXELVERSE</h1></Link>

            <p className='text-sm text-gray-500 max-sm:hidden'>Copyright @Haider.dev | All Right reserved.</p>

                <div className='flex items-center gap-2.5'>
                    <img src={assets.facebook_icon} className='cursor-pointer' width={35} alt="" />
                    <img src={assets.instagram_icon} className='cursor-pointer' width={35} alt="" />
                    <img src={assets.twitter_icon} className='cursor-pointer' width={35} alt="" />
                </div>
        </div>
    )
}

export default Footer
