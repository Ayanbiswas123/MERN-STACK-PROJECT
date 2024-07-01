import React from 'react'
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'

function Footer() {

    const curentDate = new Date();
    const year = curentDate.getFullYear();

    return (
        <>
            <footer className='bg-base-100 relative left-0 bottom-0 h-[10vh] py-5 sm:px-20 flex flex-col sm:flex-row items-center justify-between text-white '>
                <section className='text-lg flex-1 sm:flex-none text-center sm:text-left'>
                    Copyright {year} | All rights reserved
                </section>
                <section className='flex flex-1 sm:flex-none items-start justify-end gap-5 text-2xl text-white'>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsFacebook />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsInstagram />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsTwitter />
                    </a>
                    <a className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
                        <BsLinkedin />
                    </a>
                </section>
            </footer>

        </>
    )
}

export default Footer