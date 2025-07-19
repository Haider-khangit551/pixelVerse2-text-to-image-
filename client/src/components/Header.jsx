import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate()

    const onclickHandler = () => {
        // if (user) {
        //     navigate('/result');
        // } else {
        //     setShowLogin(true);
        // }

        if (!user) {
            // navigate('/login')
            setShowLogin(true);
        } else {
            navigate('/result')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col justify-center items-center text-center my-20'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className='inline-flex items-center gap-2 text-stone-500 bg-white px-6 py-1 rounded-full border border-neutral-500'>
                <p>Best text to image converter</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
                className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Convert Text To <span className='text-blue-600'>Image</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='text-center max-w-xl max-auto mt-5'>Type your thoughts, and let AI turn them into art.
                Stylize your words, pick your vibe —
                with PixelVerse, creativity comes alive.
            </motion.p>

            <motion.button
                onClick={onclickHandler}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
                className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer'>
                Generate Image
                <img className='h-6' src={assets.star_group} alt="" />
            </motion.button>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className='flex flex-wrap justify-center gap-2 mt-16'>
                {
                    Array(6).fill('').map((item, index) => (
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            key={index}
                            width={70}
                            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} />
                    ))
                }
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className='mt-2 text-neutral-600'>Generated Images From PixelVerse.</motion.p>

        </motion.div>
    )
}

export default Header
