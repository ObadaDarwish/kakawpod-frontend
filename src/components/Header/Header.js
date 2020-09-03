import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../assets/images/cocoaPlant.png';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useSelector } from 'react-redux';
const Header = () => {
    const isLoading = useSelector((state) => state.loadingIndicator);
    return (
        <div className={'headerOuterContainer'}>
            <div className={'headerOuterContainer__headerContainer'}>
                <section
                    className={'headerOuterContainer__headerContainer__logo'}
                >
                    <Link
                        to={'/'}
                        className={
                            'headerOuterContainer__headerContainer__logo__wrapper'
                        }
                    >
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
                <section
                    className={
                        'headerOuterContainer__headerContainer__navigationTabs'
                    }
                >
                    <NavLink to={'/login'}>login</NavLink>
                    <NavLink to={'/about'}>about</NavLink>
                </section>
            </div>
            {isLoading && <LoadingIndicator />}
        </div>
    );
};

export default Header;
