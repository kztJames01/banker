'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react'
import {cn, UrlQuery} from '@/lib/utils';
const BankTabItem = ({account, appwriteItemId}: BankTabItemProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isActive = appwriteItemId === account?.appwriteItemId;

    const handleBankChange = () => {
        const url = UrlQuery({
            params : searchParams.toString(),
            key: 'id',
            value: account?.appwriteItemId
        })
        router.push(url, {scroll: false});
    }
  return (
    <div onClick = {handleBankChange} className={cn(`bank-tab-item`, {'border-blue-600': isActive})}>
        <p className={cn(`text-16 line-champ-1 flex-1 font-medium text-gray-500`, {'text-blue-600': isActive}) }>
            {account?.name}
        </p>
        
    </div>
  )
}

export default BankTabItem