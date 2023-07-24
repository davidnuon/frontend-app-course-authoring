import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { updateSavingStatus } from '../../data/slice';
import { RequestStatus } from '../../../data/constants';

import { addModel, updateModel } from '../../../generic/model-store';

export function getXpertSettingsUrl(courseId) {
    return `${getConfig().LMS_BASE_URL}/ai_aside/v1/${courseId}`;
}

async function getXpertSettings(courseId) {
    const { data } = await getAuthenticatedHttpClient()
        .get(getXpertSettingsUrl(courseId));

    return data;
}

async function updateXpertSettingsStore(courseId, state) {
    const { data } = await getAuthenticatedHttpClient()
        .post(getXpertSettingsUrl(courseId), {
            enabled: state.enabled ? 'True' : 'False',
        });

    return data;
}

export function updateXpertSettings(courseId, state) {
    return async (dispatch) => {
        await updateXpertSettingsStore(courseId, state);
        dispatch(updateSavingStatus({ status: RequestStatus.IN_PROGRESS }));

        try {
            dispatch(updateModel({ modelType: 'XpertSettings', model: { id: 'xpert-unit-summary', enabled: state.enabled.state } }));
            dispatch(updateSavingStatus({ status: RequestStatus.SUCCESSFUL }));
            return true;
        } catch (error) {
            console.log('I am the error', error);
            dispatch(updateSavingStatus({ status: RequestStatus.FAILED }));
            return false;
        }
    };
}

export function fetchXpertSettings(courseId) {
    return async (dispatch) => {
        let enabled = false;
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
    };
}
