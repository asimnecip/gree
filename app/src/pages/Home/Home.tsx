import React from 'react';
import Landing from '../../components/Landing/Landing';
import { useAccount } from '@particle-network/connect-react-ui';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const account = useAccount();
    const navigate = useNavigate();

    if (account) {
        return (
            <>
            <button onClick={() => navigate('/contracts')} ></button>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            <p>BAŞARILI</p>
            </>
        );
    } else {
        return <Landing />
    }
};

export default Home;
