import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import CSS from 'csstype';

// SCSS
import 'semantic-ui-css/semantic.min.css';
import './Application.scss';

import { alertClear, signIn, signOut } from '@src/actions';
import ProtectedRoute from '@src/components/ProtectedRoute';
import { AppContextInterface, AppContextProvider } from './AppContext';

// API
import { checkLogin } from '@src/api/authService';

// Public Components
import Welcome from '@src/components/Welcome';
import { Navigation } from '@src/components/Navigation';
import Alert from '@src/components/Alert';
import LoginForm from '@src/components/Authentication/LoginForm';
import RegisterForm from '@src/components/Authentication/RegisterForm';
import ResetPassword from '@src/components/Authentication/ResetPassword';
import Loading from '@src/components/Loading';

// Platform components
import Dashboard from '@src/components/Dashboard';
import Overview from '@src/components/Overview';
// import Terminal from '@src/components/Terminal';
// import Market from '@src/components/Market';
// import News from '@src/components/News';

import OrderHistory from '../OrderHistory';

// Bots components
import Bots from '@src/components/Bots';
import MyBots from '@src/components/Bots/MyBots';
import Strategies from '@src/components/Bots/Strategies';

// Settings components
import Settings from '@src/components/Settings';
import ProfileDetails from '@src/components/Settings/ProfileDetails';
import Verification from '@src/components/Settings/Verification';
import Preferences from '@src/components/Settings/Preferences';
import ChangePassword from '@src/components/Settings/ChangePassword';
import Security from '@src/components/Settings/Security';
import Accounts from '@src/components/Settings/Accounts';
// import Referrals from '@src/components/Settings/Referrals';
import NotFound from '@src/components/NotFound';

// Admin components
import Admin from '@src/components/Admin';

// Transition settings
const duration = 800;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
};
const transitionStyles: Partial<Record<TransitionStatus, CSS.Properties>> = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

interface ApplicationProps {
    isSignedIn: any;
    alert: any;
    alertClear: () => void;
    signIn: (user: any) => void;
    signOut: () => void;
}

const Application: React.FC<ApplicationProps> = ({
    isSignedIn,
    alert,
    alertClear,
    signIn,
    signOut,
}) => {
    const nodeRef = React.useRef(null);

    const [darkTheme, setDarkTheme] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);

    const appContext: AppContextInterface = {
        loading: loading,
        setLoading: setLoading,
    };

    /**
     * On component mount
     */
    useEffect(() => {
        const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
        if (isNaN(useDarkTheme)) {
            setDarkTheme(true);
        } else if (useDarkTheme == 1) {
            setDarkTheme(true);
        } else if (useDarkTheme == 0) {
            setDarkTheme(false);
        }

        // Reset not found
        setNotFound(false);

        checkLogin()
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.loggedIn === true) {
                        signIn(response.data.user);
                    } else {
                        signOut();
                    }
                }
            })
            .catch((error) => {
                signOut();
            });
    }, []);

    /**
     * On alert change
     * Clear alert after 5 seconds
     */
    useEffect(() => {
        if (alert.active) {
            setTimeout(() => {
                alertClear();
            }, 5000);
        }
    }, [alert.active]);

    /**
     * On Dark theme change
     */
    useEffect(() => {
        if (darkTheme) {
            localStorage.setItem('dark-mode', '1');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('dark-mode', '0');
            document.body.classList.remove('dark-mode');
        }
    }, [darkTheme]);

    /**
     * Toggle Theme
     */
    function toggleTheme() {
        setDarkTheme(!darkTheme);
    }

    return (
        <BrowserRouter>
            {loading && <Loading />}

            {isSignedIn && !notFound && (
                <Navigation toggleTheme={toggleTheme} isDarkTheme={darkTheme} />
            )}

            {alert.active && (
                <Transition
                    className='alert'
                    nodeRef={nodeRef}
                    in={alert.active}
                    timeout={duration}
                >
                    {(state) => (
                        <div
                            ref={nodeRef}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                            }}
                        >
                            <Alert
                                message={alert.message}
                                className={alert.className}
                            />
                        </div>
                    )}
                </Transition>
            )}

            <div className='main'>
                <AppContextProvider value={appContext}>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute
                                    isSignedIn={!isSignedIn}
                                    redirectPath='/'
                                />
                            }
                        >
                            <Route path='welcome' element={<Welcome />} />
                            <Route path='login' element={<LoginForm />} />
                            <Route path='register' element={<RegisterForm />} />
                            <Route
                                path='reset-password'
                                element={<ResetPassword />}
                            />
                        </Route>

                        <Route
                            element={<ProtectedRoute isSignedIn={isSignedIn} />}
                        >
                            <Route index element={<Dashboard />} />
                            <Route path='overview' element={<Overview />} />
                            <Route path='bots' element={<Bots />}>
                                <Route index element={<MyBots />} />
                                <Route path='my-bots' element={<MyBots />} />
                                <Route path='strategies' element={<Strategies />} />
                                <Route
                                    path='*'
                                    element={<Navigate to='/error' replace />}
                                />
                            </Route>
                            {/* Not in MVP */}
                            {/* <Route path='terminal' element={<Terminal />} />
                            <Route path='market' element={<Market />} />
                            <Route path='news' element={<News />} /> */}
                            <Route path='test' element={<OrderHistory />} />
                            <Route path='settings' element={<Settings />}>
                                <Route index element={<ProfileDetails />} />
                                <Route
                                    path='user'
                                    element={<ProfileDetails />}
                                />
                                <Route
                                    path='verification'
                                    element={<Verification />}
                                />
                                <Route
                                    path='preferences'
                                    element={<Preferences />}
                                />
                                <Route
                                    path='password'
                                    element={<ChangePassword />}
                                />
                                <Route path='security' element={<Security />} />
                                <Route path='accounts' element={<Accounts />} />
                                {/* Not in MVP */}
                                {/* <Route
                                    path='referrals'
                                    element={<Referrals />}
                                /> */}
                                <Route
                                    path='*'
                                    element={<Navigate to='/error' replace />}
                                />
                            </Route>
                        </Route>

                        <Route
                            path='error'
                            element={<NotFound setNotFound={setNotFound} />}
                        />
                        <Route
                            path='*'
                            element={<Navigate to='/error' replace />}
                        />
                    </Routes>
                </AppContextProvider>
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        alert: state.alert,
    };
};

export default connect(mapStateToProps, { alertClear, signIn, signOut })(
    Application,
);
