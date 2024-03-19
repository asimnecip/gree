// PrivateRoute.tsx

import { useAccount } from '@particle-network/connect-react-ui';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const  account  = useAccount();
    console.log(account);
    // Redirect to login page if not connected
    return account ? children : <Navigate to="/" />;
};

export default PrivateRoute;
