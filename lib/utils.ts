import qs from 'query-string'
import { twMerge } from 'tailwind-merge';
import {type ClassValue, clsx} from 'clsx';
import {z} from 'zod';
export const formatDateTime = (dateString:Date) => {
    const dateTimeOptions : Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const dateDayOptions : Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: '2-digit',
    };

    const dateOptions : Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    };

    const timeOptions : Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formatDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions);
    const formatDateDay: string = new Date(dateString).toLocaleString('en-US', dateDayOptions);
    const formatDate: string = new Date(dateString).toLocaleString('en-US', dateOptions);
    const formatTime: string = new Date(dateString).toLocaleString('en-US', timeOptions);

    return {
        dateTime: formatDateTime,
        dateDay: formatDateDay,
        date: formatDate,
        time: formatTime,
    };
};

export function formatAmount(amount:number): string{

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const authFormSchema = (type:string) => z.object({
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3, 'First Name is required'),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3, 'Last name is required'),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(4).max(10),
    //phone: type === 'sign-in' ? z.string().optional() : z.string().min(10).max(15),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password is required'),
    //confirmPassword: type === 'sign-in' ? z.string().optional() : z.string().min(8, 'Password is required'),
})
// This is used to parse the query string and convert it to a javascript object
// so that it can be used in the zod schema
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function encryptId(id: string) {
    return btoa(id);
}

export function extractCustomerIdFromUrl(url: string) {
    const parts = url.split('/');
    const customerId = parts[parts.length - 1];
    return customerId;
}