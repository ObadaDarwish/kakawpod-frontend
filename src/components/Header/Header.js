import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon from '../../assets/images/cocoaPlant.png';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import UserMenu from './User_menu/User_menu';
import VerifyEmailPrompt from './VerifyEmailPrompt/VerifyEmailPrompt';
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -4,
        top: 15,
        border: `2px solid #F3E1E1`,
        fontSize: '1.2rem',
        width: '2.4rem',
        height: '2.4rem',
        borderRadius: '10rem',
        background: '#7D5A5A',
    },
}))(Badge);
const Header = () => {
    const isAuth = useSelector((state) => state.user);
    const isLoading = useSelector((state) => state.loadingIndicator);
    const [canShowEmailPrompt, setShowEmailPrompt] = useState(
        isAuth && !isAuth.email_verified
    );
    const closePrompt = () => {
        setShowEmailPrompt(false);
    };

    return (
        <div className={'headerOuterContainer'}>
            {canShowEmailPrompt && isAuth && !isAuth.email_verified && (
                <VerifyEmailPrompt closePrompt={closePrompt} />
            )}

            <div className={'headerOuterContainer__headerTopContainer'}>
                <section className={'headerOuterContainer__navigationTabs'}>
                    <NavLink
                        className={'headerOuterContainer__navigationTabs__tab'}
                        to={'/about'}
                    >
                        about
                    </NavLink>
                </section>
            </div>
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
                        <p>ODs</p>
                        <span>Chocolate</span>
                    </Link>
                </section>
                <section className={'headerOuterContainer__navigationTabs'}>
                    {isAuth && <UserMenu isAuth={isAuth} />}

                    {!isAuth && (
                        <NavLink
                            className={
                                'headerOuterContainer__navigationTabs__tab'
                            }
                            to={'/login'}
                        >
                            login
                        </NavLink>
                    )}
                    <IconButton
                        aria-label="cart"
                        className={
                            'headerOuterContainer__navigationTabs__cartIcon'
                        }
                    >
                        <StyledBadge badgeContent={4} color="secondary">
                            <ShoppingCartOutlinedIcon fontSize={'large'} />
                        </StyledBadge>
                    </IconButton>
                </section>
            </div>
            {isLoading && <LoadingIndicator />}
        </div>
    );
};

export default Header;
