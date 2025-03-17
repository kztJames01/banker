'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
    BANKER_DATABASE_ID: DATABASE_ID,
    BANKER_TRANSACTIONS_ID: TRANSACTIONS_ID,
} = process.env;

export const createTransaction = async(transaction: CreateTransactionProps)=>{
    try{
        const { database} = await createAdminClient();
        const newTransaction = await database.createDocument(
            DATABASE_ID!, 
            TRANSACTIONS_ID!, 
            ID.unique(), 
            {
                channel: 'online',
                category: 'Transfer',
                ...transaction
            });
            return parseStringify(newTransaction);
    }catch(error){
        console.log(error);
    }
}

export const getTransactionsByBankId = async ({ bankId }: getTransactionsByBankIdProps) => {
    try {
        const { database } = await createAdminClient();

        const senderTransactions = await database.listDocuments(
            DATABASE_ID!,
            TRANSACTIONS_ID!,
            [Query.equal('senderBankId', bankId)],
        )

        const receiverTransactions = await database.listDocuments(
            DATABASE_ID!,
            TRANSACTIONS_ID!,
            [Query.equal('receiverBankId', bankId)],
        );

        const transactions = {
            total: senderTransactions.total + receiverTransactions.total,
            documents: [
                ...senderTransactions.documents,
                ...receiverTransactions.documents,
            ]
        }

        return parseStringify(transactions);
    } catch (error) {
        console.log(error);
    }
}