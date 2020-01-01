import React from 'react';

import './Button.css';

interface IButtonProps {
    text: string;
    className?: string;
    onClick: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
    return (
        <input
            type="button"
            value={props.text}
            className={`button ${props.className}`}
            onClick={props.onClick}
        />
    );
};
