import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn={$id: "1",
        email: "b7d9K@example.com",
        userId: "1",
        dwollaCustomerUrl: "https://",
        dwollaCustomerId: "1",
        name: "John Doe",
        address1: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        dateOfBirth: "1990-01-01",
        ssn: "123-45-6789",
        firstName: "John", lastName: "Doe"};
    return (
        <main className="flex h-screen w-full font-inter">
            <SideBar user={loggedIn}/>
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                    <div>
                        <MobileNav user={loggedIn}/>
                    </div>
                </div>
                {children}
            </div>
            
        </main>
    );
}