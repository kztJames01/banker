
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {firstName: "John"}
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
            </div>
        </section>
    )
};

export default Home;