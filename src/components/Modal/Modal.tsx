import React from 'react';
import { IoIosClose } from 'react-icons/io';

import './Modal.css';

interface IModalProps {
    isOpen: boolean;
    header: string;
    body: React.ReactNode;
    footer?: React.ReactNode;
    onClose: () => void;
}

export class Modal extends React.Component<IModalProps> {
    public render() {
        return (
            this.props.isOpen && (
                <>
                    <div className="modal">
                        <p className="modal__header">
                            {this.props.header}
                            <IoIosClose
                                className="modal__close"
                                onClick={this.props.onClose}
                            />
                        </p> 
                        {this.props.body} 
                    </div>
                    <div className="modal__back"></div>
                </>
            )
        );
    }
}
