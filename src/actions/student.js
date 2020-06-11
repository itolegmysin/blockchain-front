// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { studentsGet: getStudents } = createActions({
  [ActionTypes.STUDENTS_GET]: () => ({}),
});
