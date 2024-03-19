import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
// import { useAccount } from '@particle-network/connect-react-ui';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../features/user/userSlice';
// import { useWallet } from '@solana/wallet-adapter-react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // const account = useAccount();
    
    // const getUsername = useCallback(async () => {
    //     if (account) {
    //         console.log("CONNECTED")            
    //     }
    // }, []);
    
    // useEffect(() => {
    //     getUsername();
    // }, [getUsername]);


    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
