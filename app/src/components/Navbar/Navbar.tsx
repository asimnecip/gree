import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import greeLogo from '../../assets/gree.svg'; // Import the logo
import { ConnectButton } from '@particle-network/connect-react-ui';


const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <div className="logo">
                <img 
                    src={greeLogo} 
                    alt="gree" 
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                     />
                <span>gree</span>
            </div>
            <div className="menu">
                <ConnectButton />
            </div>
        </nav>
    );
};

export default Navbar;
