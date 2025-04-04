import RecentTransactions from "@/components/RecentTransactions";
import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";


const Home = async({searchParams }: SearchParamProps) => {
    const { id, page } = await searchParams;
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({userId:loggedIn?.$id});
    if(!accounts) return;
    const currentPage = Number(page as string) || 1;
    const appwriteItemId = (id as string) || accounts?.data[0].appwriteItemId;
    const account = await getAccount({ appwriteItemId });
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox 
                        type="greeting"
                        title="Welcome,"
                        user = {loggedIn?.firstName || "Guest"}
                        subtext="Let's get started. Access and manage your account
                        and transactions efficiently."
                    />

                    <TotalBalanceBox 
                        accounts = {accounts?.data}
                        totalBanks = {accounts?.totalBanks}
                        totalCurrentBalance = {accounts?.totalCurrentBalance} 
                    />
                </header>

                <RecentTransactions accounts = {accounts?.data}
                transactions = {account?.transactions}
                appwriteItemId = {appwriteItemId}
                page = {currentPage} />
            </div>
            <RightSideBar 
                user = {loggedIn}
                transactions = {account?.transactions}
                banks = {accounts?.data.slice(0,2)}
            />
        </section>
        
    )
};

export default Home;