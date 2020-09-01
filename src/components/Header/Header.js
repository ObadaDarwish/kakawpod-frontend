import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../assets/images/cocoaPlant.png';
const Header = () => {
    return (
        <div className={'headerContainer'}>
            <section className={'headerContainer__logo'}>
                <Link to={'/'} className={'headerContainer__logo__wrapper'}>
                    <img
                        src={icon}
                        name="ODs chocolate logo"
                        alt="ODs chocolate logo"
                    />
                    <p>
                        ODs <br />
                        <span>Chocolate</span>
                    </p>
                </Link>
            </section>
            <section className={'headerContainer__navigationTabs'}>
                <NavLink to={'/login'}>login</NavLink>
                <NavLink to={'/about'}>about</NavLink>
            </section>
        </div>
    );
};

export default Header;
