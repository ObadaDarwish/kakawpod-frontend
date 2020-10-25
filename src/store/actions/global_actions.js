import { TOGGLE_FOOTER } from '../action_types';

export const toggleFooter = (canShow) => {
    return {
        type: TOGGLE_FOOTER,
        show: canShow,
    };
};
