import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { STATUS } from 'constants/index';
import { MarksActionTypes } from '../constants/action-types/marks';

export const marksState = {
  collection: [],
  status: STATUS.IDLE,
  message: '',
};

export default {
  marks: handleActions(
    {
      [MarksActionTypes.MARKS_GET_BY_STUDENT_ID]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [MarksActionTypes.MARKS_GET_BY_STUDENT_ID_SUCCESS]: (draft, { payload }) => {
        draft.collection = payload.data || [];
        draft.status = STATUS.SUCCESS;
      },
      [MarksActionTypes.MARKS_GET_BY_STUDENT_ID_FAILURE]: (draft, { payload }) => {
        draft.message = parseError(payload.message);
        draft.status = STATUS.ERROR;
      },
      [MarksActionTypes.ADD_MARK_FOR_STUDENT_BY_ID_SUCCESS]: (draft, { payload }) => {
        draft.collection = [...draft.collection, payload];
      },
    },
    marksState,
  ),
};
