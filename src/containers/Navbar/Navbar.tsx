import React from 'react';

import User from '../User/User';
import { Time } from '../../components/Time/Time';
import './Navbar.css';

interface INavbarProps {

}

export default class Navbar extends React.Component<INavbarProps> {
    public render() {
        return (
            <div className="navbar">
                <Time className="navbar__time" />
                <User className="navbar-view__person" />
            </div>
        );
    }
}
