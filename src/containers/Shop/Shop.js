import React from 'react';
import banner from '../../assets/images/banner.jpg';
import ButtonUI from '../../components/UI/ButtonUI/ButtonUI';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ShopProducts from '../../components/ShopProducts/ShopProducts';
import ShopMixBox from '../../components/ShopMixBox/ShopMixBox';
import { NavLink, Route } from 'react-router-dom';
import { Switch, Redirect } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ShopLuxuryBox from '../../components/ShopLuxuryBox/ShopLuxuryBox';

const Shop = ({ match }) => {
    const matches = useMediaQuery('(max-width:768px)');
    return (
        <div className={'shopContainer'}>
            <div className={'shopContainer__carousel'}>
                <Carousel
                    autoPlay={true}
                    interval={2000}
                    showArrows={false}
                    showThumbs={false}
                    showStatus={false}
                >
                    <div className={'shopContainer__carousel__carousel-item'}>
                        <img
                            className={
                                'shopContainer__carousel__carousel-item__image'
                            }
                            alt={'ODs chocolate promotion banner'}
                            src={banner}
                        />
                    </div>
                    <div className={'shopContainer__carousel__carousel-item'}>
                        <img
                            className={
                                'shopContainer__carousel__carousel-item__image'
                            }
                            alt={'ODs chocolate promotion banner'}
                            src={banner}
                        />
                        <div
                            className={
                                'shopContainer__carousel__carousel-item__button'
                            }
                        >
                            <ButtonUI name={'Know more'} inverseBackground />
                        </div>
                    </div>
                </Carousel>
            </div>
            <div className={'shopContainer__navTabs'}>
                <NavLink
                    to={`${match.path}/bars`}
                    activeClassName={'shopContainer__navTabs__tab--active'}
                    className={`shopContainer__navTabs__tab`}
                >
                    {matches ? 'bars' : 'Chocolate bars'}
                </NavLink>
                <NavLink
                    to={`${match.path}/mixBox`}
                    activeClassName={'shopContainer__navTabs__tab--active'}
                    className={`shopContainer__navTabs__tab`}
                >
                    Mix box
                </NavLink>
                <NavLink
                    to={`${match.path}/luxuryBox`}
                    activeClassName={'shopContainer__navTabs__tab--active'}
                    className={`shopContainer__navTabs__tab`}
                >
                    Luxury box
                </NavLink>
                <NavLink
                    to={`${match.path}/cooking`}
                    activeClassName={'shopContainer__navTabs__tab--active'}
                    className={`shopContainer__navTabs__tab`}
                >
                    {matches ? 'Cooking' : 'Cooking chocolate'}
                </NavLink>
            </div>
            <Switch>
                <Route
                    path={`${match.path}/`}
                    exact
                    render={() => (
                        <Redirect to={`${match.path}/bars?type=milk`} />
                    )}
                />
                <Route
                    path={`${match.path}/bars`}
                    render={(props) => (
                        <ShopProducts {...props} category={'bar'} />
                    )}
                />
                <Route path={`${match.path}/mixBox`} component={ShopMixBox} />
                <Route
                    path={`${match.path}/luxuryBox`}
                    component={ShopLuxuryBox}
                />
                <Route
                    path={`${match.path}/cooking`}
                    render={(props) => (
                        <ShopProducts {...props} category={'cooking'} />
                    )}
                />
                <Route
                    path={`${match.path}/samples`}
                    render={(props) => (
                        <ShopProducts {...props} category={'sample'} sample />
                    )}
                />
            </Switch>
        </div>
    );
};

export default Shop;
