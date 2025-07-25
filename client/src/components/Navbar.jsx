// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { Link, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Navbar = () => {

//     const { user } = useContext(AppContext);
//     const { setShowLogin, logout, credit } = useContext(AppContext);
//     const navigate = useNavigate()

//     return (
//         <div className='flex items-center justify-between py-4'>
//             <Link to='/'><h1 className='w-28 sm:w-32 lg:40 text-2xl sm:text-3xl lg:text-4xl cursor-pointer'>PIXELVERSE</h1></Link>

//             <div>
//                 {user ?
//                     <div className='flex items-center gap-2 sm:gap-3'>
//                         <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
//                             <img src={assets.credit_star} className='w-5' alt="" />
//                             <p className='text-xsm sm:text-sm font-medium text-gray-600'>Credits Left: {credit}</p>
//                         </button>
//                         <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
//                         <div className='relative group'>
//                             <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
//                             <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
//                                 <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
//                                     <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     :
//                     <div className='flex items-center gap-2 sm:gap-5 '>
//                         <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
//                         <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>Login</button>
//                     </div>
//                 }



//             </div>
//         </div>
//     )
// }

// export default Navbar






















import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { user } = useContext(AppContext);
    const { setShowLogin, logout, credit } = useContext(AppContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div className='flex items-center justify-between py-4'>
            <Link to='/'><h1 className='w-28 sm:w-32 lg:40 text-2xl sm:text-xl lg:text-4xl cursor-pointer'>PIXELVERSE</h1></Link>

            <div>
                {user ? (
                    <div className='flex items-center gap-2 sm:gap-3 relative'>
                        <button
                            onClick={() => navigate('/buy')}
                            className='flex items-center gap-1 sm:gap-2 bg-blue-100 px-2 sm:px-4 py-1 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700'
                        >
                            <img src={assets.credit_star} className='w-4 sm:w-5' alt="" />
                            <p className='text-[10px] sm:text-sm font-medium text-gray-600'>
                                Credits Left: {credit}
                            </p>
                        </button>

                        <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>

                        {/* Profile dropdown for sm and above */}
                        <div className='relative group hidden sm:block'>
                            <img src={assets.profile_icon} className='w-10 drop-shadow cursor-pointer' alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                </ul>
                            </div>
                        </div>

                        {/* Initial-based button for mobile */}
                        <div className='sm:hidden relative'>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className='bg-zinc-800 text-white w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold'
                            >
                                {getInitial(user.name)}
                            </button>

                            {mobileMenuOpen && (
                                <div className='absolute right-0 top-10 bg-white rounded-md border text-sm z-20'>
                                    <ul className='list-none p-2'>
                                        <li onClick={logout} className='py-1 px-4 cursor-pointer'>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-2 sm:gap-5 '>
                        <p onClick={() => navigate('/buy')} className='cursor-pointer'>Pricing</p>
                        <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>Login</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;
