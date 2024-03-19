// App.tsx

import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ContractsPage from '../pages/ContractsPage/ContractsPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'; // Import the PrivateRoute component
import Layout from './Layout'; // Import the Layout component

import '@particle-network/connect-react-ui/dist/index.css';

const App: React.FC = () => {
    return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contracts" element={<PrivateRoute><ContractsPage /></PrivateRoute>} />
                {/* <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> */}
            </Routes>
        </Layout>
    </Router>
    );
}

export default App;