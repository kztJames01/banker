import React from 'react'

import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
const CustomInput = ({ control, name,label, placeholder }: { label: string, placeholder: string, name: string, control: any }) => {
    return (

        <FormField
            control={control}
            name= {name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>{label}</FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                type={label}
                                placeholder={placeholder}
                                className="input-class"
                                {...field}
                            />
                        </FormControl>

                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />

    )
}

export default CustomInput