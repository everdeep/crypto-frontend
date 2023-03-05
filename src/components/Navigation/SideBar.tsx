import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Sidebar, Divider } from 'semantic-ui-react'

import { icons } from '@src/components/App/Icons';

interface SideBarProps {
    handleLogout: () => void;
    setSidebarOpen: (open: boolean) => void;
    open: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ handleLogout, setSidebarOpen, open }) => {

    return (
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            borderless
            onHide={() => setSidebarOpen(false)}
            vertical
            visible={open}
            width='wide'
        >
            <Menu.Item as={NavLink} to='/' onClick={() => setSidebarOpen(false)} >
                <div>
                    <img src={icons.dashboard} /> <span>Dashboard</span>
                </div>
            </Menu.Item>
            <Menu.Item as={NavLink} to='/portfolio' onClick={() => setSidebarOpen(false)}>
                <div>
                    <img src={icons.portfolio} /> <span>Portfolio</span>
                </div>
            </Menu.Item>

            <Menu.Item as={NavLink} to='/terminal' onClick={() => setSidebarOpen(false)}>
                <div>
                    <img src={icons.chart} /> <span>Terminal</span>
                </div>
            </Menu.Item>
            
            <Menu.Item as={NavLink} to='/market' onClick={() => setSidebarOpen(false)}>
                <div>
                    <img className='item-icon' src={icons.market} /> <span>Market</span>
                </div>
            </Menu.Item>

            <Menu.Item as={NavLink} to='/news' onClick={() => setSidebarOpen(false)}>
                <div>
                    <img src={icons.newspaper} /> <span>News</span>
                </div>
            </Menu.Item>

            {/* Bottom section */}
            <Divider />

            <Menu.Item as={NavLink} to='/settings' onClick={() => setSidebarOpen(false)}>
                <div>
                    <img src={icons.gear} /> <span>User Settings</span>
                </div>
            </Menu.Item>
            <Menu.Item onClick={() => setSidebarOpen(false)}>
                <div>
                    <img src={icons.wrench} /> <span>Support</span>
                </div>
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
                <div>
                    <img src={icons.exit} /> <span>Logout</span>
                </div>
            </Menu.Item>
        </Sidebar>
    );
}

export default SideBar;
