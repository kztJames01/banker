import qs from 'query-string'
import { twMerge } from 'tailwind-merge';
import {type ClassValue, clsx} from 'clsx';
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