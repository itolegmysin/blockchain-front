import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { StudentsActionTypes } from 'constants/action-types/students';
import { STATUS } from 'constants/index';

export const studentsState = {
  collection: [],
  status: STATUS.IDLE,
  message: '',
};

export default {
  students: handleActions(
    {
      [StudentsActionTypes.STUDENTS_GET]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [StudentsActionTypes.STUDENTS_GET_SUCCESS]: (draft, { payload }) => {
        draft.collection = payload.data || [];
        draft.status = STATUS.SUCCESS;
      },
      [StudentsActionTypes.STUDENTS_GET_FAILURE]: (draft, { payload }) => {
        draft.message = parseError(payload.message);
        draft.status = STATUS.ERROR;
      },
      [StudentsActionTypes.ADD_STUDENT_SUCCESS]: (draft, { payload }) => {
        draft.collection = [...draft.collection, payload.data];
      },
    },
    studentsState,
  ),
};
