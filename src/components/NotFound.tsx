import React from 'react';

interface NotFoundProps {
    setNotFound: (notFound: boolean) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ setNotFound }) => {
    React.useEffect(() => {
        setNotFound(true);
    }, []);

    return (
        <div>
            <p style={{ fontWeight: 900, fontSize: 35 }}>404</p>
            <h2 style={{ fontWeight: 400 }}>Page not found</h2>
        </div>
    );
};

export default NotFound;
