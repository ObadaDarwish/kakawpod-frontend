import React from 'react';
import useFetchData from '../../hooks/useFetchData';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/actions/auth_actions';
import CircularLoadingIndicator from '../../components/LoadingIndicator/CircularLoadingIndicator';
const Auth = (props) => {
    const [isLoading, auth] = useFetchData(
        `${process.env.REACT_APP_API_ENDPOINT}/user`
    );
    const dispatch = useDispatch();
    dispatch(updateUser(auth));
    return <>{isLoading ? <CircularLoadingIndicator /> : props.children}</>;
};

export default Auth;
