'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,

} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { autoFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'




const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)
    const formSchema = autoFormSchema(type)
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        console.log(values)
    }
    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='flex mb-12  cursor-pointer items-center gap-2'>
                    <Image src="/icons/logo.svg" width={34} height={34} alt="NxtGen logo" className="size=[24px] max-xl:size-14" />
                    <h1 className=' font-bold text-26 font-robo text-gray-900 px-4 '>NxtGen</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3 '>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-700'>
                        {user ?
                            'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ?
                                'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ?
                (
                    <div className='flex flex-col gap-4'></div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {type === 'sign-up' && (
                                    <>
                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                                            <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                                        </div>
                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control} name="address" label="Address" placeholder="Enter your address" />
                                            <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                                        </div>
                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control} name="state" label="State" placeholder="Enter your state" />
                                            <CustomInput control={form.control} name="country" label="Country" placeholder="Enter your country" />
                                        </div>
                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control} name="postalCode" label="Zip Code" placeholder="Enter your zip code" />
                                            <CustomInput control={form.control} name="dateofBirth" label="Date of Birth" placeholder="Enter your date of birth" />
                                        </div>
                                    </>
                                )}
                                <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                                <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />
                                {type === 'sign-up' && (
                                    <CustomInput control={form.control} name="password1" label="Password" placeholder="Confirm your password" />
                                )}

                                <Button type="submit" disabled={loading} className="w-full py-4">
                                    {loading ? 
                                        <>
                                            <Loader2 size={20} className='animate-spin mr-3'/> &nbsp;
                                            Loading...
                                        </>
                                     : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>

                            </form>
                        </Form>
                    </>

                )
            }
        </section>
    )
}

export default AuthForm