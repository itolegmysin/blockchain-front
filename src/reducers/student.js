import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { ActionTypes, STATUS } from 'constants/index';

export const studentState = {
  data: {},
  status: STATUS.IDLE,
  message: '',
};

export default {
  students: handleActions(
    {
      [ActionTypes.STUDENTS_GET]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.STUDENTS_GET_SUCCESS]: (draft, { payload }) => {
        debugger;
        draft.data = payload.data || [];
        draft.status = STATUS.SUCCESS;
      },
      [ActionTypes.STUDENTS_GET_FAILURE]: (draft, { payload }) => {
        draft.message = parseError(payload.message);
        draft.status = STATUS.ERROR;
      },
    },
    studentState,
  ),
};
