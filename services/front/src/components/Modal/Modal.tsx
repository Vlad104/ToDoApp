import React from 'react';
import { IoIosClose } from 'react-icons/io';

import './Modal.css';

interface IModalProps {
    isOpen: boolean;
    header: React.ReactNode;
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
                        <IoIosClose
                            className="modal__close"
                            onClick={this.props.onClose}
                        />
                        <p className="modal__header">
                            {this.props.header}
                        </p> 
                        {this.props.body} 
                    </div>
                    <div className="modal__back" onClick={this.props.onClose}></div>
                </>
            )
        );
    }
}
