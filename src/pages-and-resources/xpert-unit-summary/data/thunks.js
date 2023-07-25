import { getXpertSettings, postXpertSettings } from './api';

import { updateSavingStatus, updateLoadingStatus } from '../../data/slice';
import { RequestStatus } from '../../../data/constants';

import { addModel, updateModel } from '../../../generic/model-store';

export function updateXpertSettings(courseId, state) {
    return async (dispatch) => {
        await postXpertSettings(courseId, state);
        dispatch(updateSavingStatus({ status: RequestStatus.IN_PROGRESS }));

        try {
            dispatch(updateModel({ modelType: 'XpertSettings', model: { id: 'xpert-unit-summary', enabled: state.enabled } }));
            dispatch(updateSavingStatus({ status: RequestStatus.SUCCESSFUL }));
            return true;
        } catch (error) {
            dispatch(updateSavingStatus({ status: RequestStatus.FAILED }));
            return false;
        }
    };
}

export function fetchXpertSettings(courseId) {
    return async (dispatch) => {
        let enabled = false;
        dispatch(updateLoadingStatus({ status: RequestStatus.PENDING }));

        try {
            const { response } = await getXpertSettings(courseId);
            enabled = response?.enabled;
        } catch (e) {
            enabled = false;
        }

        dispatch(addModel({
            modelType: 'XpertSettings',
            model: {
                id: 'xpert-unit-summary',
                enabled,
            },
        }));

        dispatch(updateLoadingStatus({ status: RequestStatus.SUCCESSFUL }));
    };
}
