import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
            <p className='text-gray-500 mb-8'>Type it. See it. Share it.</p>



            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
                <img src={assets.sample_img_1} className='w-80 xl:w-96 rounded-lg' alt="" />
                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
                    <p className='text-gray-600 mb-4'>Bring your words to life with the power of AI. Whether it's quotes, captions, or creative thoughts, our intelligent generator transforms plain text into visually stunning images in seconds. Customize fonts, backgrounds, and styles to match your vibe — no design skills needed. It's fast, simple, and made for creators like you.</p>
                    <p className='text-gray-600'>Just type your prompt — anything you imagine.
                        Sit back for a moment while our AI works its magic.
                        In seconds, you’ll get a high-quality image based on your text.
                        Love it? Hit download and make it yours instantly.</p>
                </div>
            </div>

        </motion.div>
    )
}

export default Description
