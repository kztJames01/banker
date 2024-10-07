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

} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)
    const router = useRouter()
    const formSchema = authFormSchema(type)
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address: data.address!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    phone: data.phone!,
                    email: data.email,
                    password: data.password,
                }
                const newUser = await signUp(userData);
                setUser(newUser);
            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password
                });
                if (response) 
                    router.push('/');
            }
         }
        catch (error) {

        } finally {
            setLoading(false);
        }
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
                                        <CustomInput control={form.control} name="phone" label="Phone" placeholder="Example: +17374209436" />
                                        <CustomInput control={form.control} name="address" label="Address" placeholder="Enter your address" />
                                        <CustomInput control={form.control} name="city" label="City" placeholder="Example: New York" />

                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control} name="state" label="State" placeholder="Example: TX" />
                                            <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                                        </div>
                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control} name="postalCode" label="Zip Code" placeholder="Example: 11010" />
                                            <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                                        </div>
                                    </>
                                )}
                                <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                                <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />
                                {type === 'sign-up' && (
                                    <CustomInput control={form.control} name="confirmPassword" label="Password" placeholder="Confirm your password" />
                                )}

                                <Button type="submit" disabled={loading} className="form-btn w-full">
                                    {loading ?
                                        <>
                                            <Loader2 size={20} className='animate-spin mr-3' /> &nbsp;
                                            Loading...
                                        </>
                                        : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>

                            </form>
                        </Form>
                        <footer className="flex justify-center gap-1">
                            <p className='text-14 font-normal text-gray-600'>
                                {type === 'sign-in' ? 'Don’t have an account?' : 'Already have an account?'}
                            </p>
                            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                                {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                            </Link>
                        </footer>
                    </>

                )
            }
        </section>
    )
}

export default AuthForm