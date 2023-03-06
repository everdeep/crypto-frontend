import React, { useState } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

import { Input } from 'semantic-ui-react';

interface PasswordProps {
    name: string;
    placeholder: string;
    value: string;
    required?: boolean;
    onChange: (e: any) => void;
    onBlur?: (name: string, value: any) => void;
    enableStrengthTest?: boolean;
    visible?: boolean;
    toggleVisibility?: () => void;
}

export const Password: React.FC<PasswordProps> = ({
    name, placeholder, value, required=false,
    onChange, onBlur = () => {},
    enableStrengthTest = false,
    visible=false,
    toggleVisibility=undefined }) => {

    const [type, setType] = useState('password');
    const [visibleLocal, setVisibleLocal] = useState(false);
    
    const showHide = (e: any) => {
        e.preventDefault();
        
        setType(type === 'password' ? 'text' : 'password');
        setVisibleLocal(!visibleLocal);

        if (toggleVisibility) {
            toggleVisibility();
        }
    }
    
    return(
        <>
            <Input
                fluid
                type={type}
                placeholder={placeholder}
                name={name}
                maxLength={60}
                transparent
                required={required}
                value={value ? value : ''}
                onChange={(e) => onChange(e)}
                onBlur={(e: any) => onBlur(e.target.name, e.target.value)}
            />
            {enableStrengthTest && <PasswordStrengthBar password={value} style={{height: 8}}/>}

            {(visible || visibleLocal) ? ( 
                <svg onClick={showHide} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM6.24234 6.34315C9.36653 3.21895 14.4319 3.21895 17.556 6.34315L19.7239 8.511C20.3508 9.13781 20.8909 9.67788 21.2653 10.1685C21.6665 10.6944 21.9703 11.2792 21.9703 12C21.9703 12.7208 21.6665 13.3056 21.2653 13.8315C20.8909 14.3221 20.3508 14.8622 19.7239 15.489L17.556 17.6569C14.4319 20.781 9.36653 20.781 6.24234 17.6569L4.07447 15.489C3.44759 14.8622 2.90746 14.3221 2.5331 13.8315C2.1319 13.3056 1.82812 12.7208 1.82812 12C1.82812 11.2792 2.1319 10.6944 2.5331 10.1685C2.90746 9.67788 3.44759 9.13781 4.07447 8.51101C4.08994 8.49555 4.10545 8.48003 4.12102 8.46447L6.24234 6.34315Z" fill="#323232"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="#323232"></path>
                    </g>
                </svg>
            ) : (
                <svg onClick={showHide} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.58579 4.71633C11.5332 3.37594 15.1293 3.91627 17.5561 6.3431L20.5579 9.34489C20.5881 9.37504 20.6179 9.40485 20.6475 9.43436C21.0546 9.84043 21.4062 10.1912 21.6188 10.5908C22.0875 11.4718 22.0875 12.5282 21.6188 13.4091C21.4062 13.8087 21.0546 14.1595 20.6475 14.5655C20.6179 14.5951 20.5881 14.6249 20.5579 14.655L20.5059 14.7071C20.1154 15.0976 19.4822 15.0976 19.0917 14.7071C18.7011 14.3165 18.7011 13.6834 19.0917 13.2929L19.1437 13.2408C19.6921 12.6924 19.8007 12.5683 19.8532 12.4697C20.0094 12.176 20.0094 11.8239 19.8532 11.5302C19.8007 11.4316 19.6921 11.3075 19.1437 10.7591L16.1419 7.75732C14.3237 5.93914 11.627 5.53041 9.41372 6.53692C8.91098 6.76554 8.31809 6.54333 8.08946 6.04059C7.86084 5.53785 8.08305 4.94496 8.58579 4.71633Z" fill="#323232"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.38203 4.51599C2.7211 4.08004 3.34938 4.00151 3.78533 4.34058L21.7853 18.3406C22.2213 18.6796 22.2998 19.3079 21.9607 19.7439C21.6217 20.1798 20.9934 20.2584 20.5574 19.9193L17.5965 17.6164L17.556 17.6569C14.4319 20.7811 9.36653 20.7811 6.24234 17.6569L4.07447 15.489C3.4476 14.8622 2.90746 14.3221 2.5331 13.8315C2.1319 13.3056 1.82812 12.7208 1.82812 12C1.82812 11.2792 2.1319 10.6944 2.5331 10.1686C2.90746 9.6779 3.44759 9.13783 4.07447 8.51102L4.86863 7.71687L2.55745 5.91928C2.1215 5.58021 2.04296 4.95194 2.38203 4.51599ZM12.7566 13.852L14.4455 15.1656C13.7694 15.6887 12.921 16 12 16C9.79086 16 8 14.2092 8 12C8 11.4344 8.11741 10.8962 8.32918 10.4084L10.0191 11.7228C10.0065 11.8134 10 11.906 10 12C10 13.1046 10.8954 14 12 14C12.2678 14 12.5232 13.9474 12.7566 13.852Z" fill="#323232"></path>
                    </g>
                </svg>
            )}
        </>
    )
    
}