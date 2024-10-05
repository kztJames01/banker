import RecentTransactions from "@/components/RecentTransactions";
import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {firstName: "John", lastName: "Doe", email: "b7d9K@example.com"}
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
                        accounts = {[]}
                        totalBanks = {3}
                        totalCurrentBalance = {1234.34} 
                    />
                </header>

                <RecentTransactions />
            </div>
            <RightSideBar 
                user = {loggedIn}
                transactions = {[]}
                banks = {[{ currentBalance: 234.50}, { currentBalance: 200.50}]}
            />
        </section>
        
    )
};

export default Home;