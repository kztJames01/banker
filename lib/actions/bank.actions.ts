'use server'

import { getBanks, getBank } from './user.actions';
import { plaidClient } from '../plaid';
import { parseStringify } from '../utils';

import { getTransactionsByBankId } from './transaction.actions';
import {
    ACHClass, CountryCode,
    TransferAuthorizationCreateRequest,
    TransferCreateRequest,
    TransferNetwork, TransferType
} from 'plaid';

export const getAccounts = async ({ userId }: getAccountsProps) => {

    try {
        const banks = await getBanks({ userId: userId });
        const accounts = await Promise.all(banks.map(async (bank: any) => {

            const accountResponse = await plaidClient.accountsGet({ access_token: bank.processorToken });
            const accountData = accountResponse.data.accounts[0];
            const institution = await getInstitution({ institutionId: accountResponse.data.item.institution_id! });
            const account = {
                id: accountData.account_id,
                availableBalance: accountData.balances.available,
                currentBalance: accountData.balances.current,
                instiutionId: institution.institution_id,
                name: accountData.name,
                officialName: institution.name,
                mask: accountData.mask!,
                type: accountData.type,
                subtype: accountData.subtype,
                appwriteItemId: bank.$id,
                shareableId: bank.shareableId,
            };
            return account;
        }));
        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => { return total + account.currentBalance; }, 0);
        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
    }   
    catch (error) {
        console.error("An Error Ocurred", error);
    }
}

export const getAccount = async ({ appwriteItemId }: getAccountProps) => {

    try {
        const banks = await getBank({ documentId: appwriteItemId });
        const accounts = await Promise.all(banks.map(async (bank: any) => {

            const accountResponse = await plaidClient.accountsGet({ access_token: bank.processorToken });
            const accountData = accountResponse.data.accounts[0];
            const transferTransactionData = await getTransactionsByBankId({ bankId: bank.$id });
            const institution = await getInstitution({ institutionId: accountResponse.data.item.institution_id! });
            const transactions = getTransactions({
                accessToken: bank?.accessToken,
            })
            const transferTransactions = transferTransactionData.documents.map(
                (transferData: Transaction)=>({
                    id: transferData.$id,
                    amount: transferData.amount,
                    type: transferData.senderBankId === bank.$id ? 'debit' : 'credit',
                    date: transferData.$createdAt,
                    paymentChannel: transferData.channel,
                    category: transferData.category,
                })
            )
        }));
        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => { return total + account.currentBalance; }, 0);
        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
    }
    catch (error) {
        console.error("An Error Ocurred", error);
    }
}
// Get Bank Info
export const getInstitution = async ({ institutionId }: getInstitutionProps) => {
    try {
        const institutionResponse = await plaidClient.institutionsGetById({ 
            institution_id: institutionId, 
            country_codes: ['US'] as CountryCode[] });

        
        return parseStringify(institutionResponse.data.institution);
    }
    catch (error) {
        console.error("An Error Ocurred", error);
    }
}

export const getTransactions = async ({ accessToken }: getTransactionsProps) => {
    let hasMore = true;
    let transactions: any = [];
    try {
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
            const response = await plaidClient.transactionsSync({
                access_token: accessToken,
            });

            const data = response.data;

            transactions = response.data.added.map((transaction) => ({
                id: transaction.transaction_id,
                name: transaction.name,
                paymentChannel: transaction.payment_channel,
                type: transaction.payment_channel,
                accountId: transaction.account_id,
                amount: transaction.amount,
                pending: transaction.pending,
                category: transaction.category ? transaction.category[0] : "",
                date: transaction.date,
                image: transaction.logo_url,
            }));

            hasMore = data.has_more;
        }

        return parseStringify(transactions);
    } catch (error) {
        console.error("An error occurred while getting the accounts:", error);
    }

}