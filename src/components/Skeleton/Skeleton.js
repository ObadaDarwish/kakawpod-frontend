import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonComp = ({ hideDescription }) => {
    return (
        <div className={'skeletonWrapper'}>
            <Skeleton variant="rect" width={250} height={220} />
            {!hideDescription && <Skeleton width="60%" height={20} />}
            {!hideDescription && <Skeleton width="30%" height={20} />}
        </div>
    );
};

export default SkeletonComp;
