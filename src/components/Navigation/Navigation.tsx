import React, { useState } from 'react';

import { connect } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { signOut } from '@src/actions';
import { logout } from '@src/api/authService';

import MenuBar from './MenuBar';
import SideBar from './SideBar';

import './Navigation.scss';

interface NavigationProps {
    signOut: () => void;
    toggleTheme: () => void;
    isDarkTheme: boolean;
};

const Navigation: React.FC<NavigationProps> = ({ signOut, toggleTheme, isDarkTheme }) => {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout(); // Clear the server session
        signOut(); // Clear the redux store
        navigate('/welcome');
    }
    
    return (
        <>
            <MenuBar handleLogout={handleLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}/>
            <SideBar open={sidebarOpen} handleLogout={handleLogout} setSidebarOpen={setSidebarOpen} />
        </>
    );
}

const mapStateToProps = (state: any) => {
    return { }
}

export default connect(
    mapStateToProps,
    { signOut }
)(Navigation);

