import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {  logoutAccount } from '@/lib/actions/user.actions';

const Footer = ({user, type='desktop'}: FooterProps) => {
    const router = useRouter();
    const handleLogout = async() => {
        const loggout = await logoutAccount();
        if(loggout) router.push('/sign-in')
    }
  return (
    <footer className='footer '>
        <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
            <p className='text-xl font-bold text-gray-700'>
                {user?.name[0]}
            </p>
        </div>
        <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
            <h1 className='truncate text-14 font-semibold text-gray-900'>{user?.name}</h1>
            <p className='truncate text-14 font-normal text-gray-600'>{user?.email}</p>
        </div>
        <div className='footer_image' onClick={handleLogout}>
            <Image src='/icons/logout.svg'  fill alt='logout'/>
        </div>
    </footer>
  )
}

export default Footer