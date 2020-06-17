// @flow
/**
 * @module Actions/Students
 * @desc Students Actions
 */
import { createActions } from 'redux-actions';

import { StudentsActionTypes } from 'constants/action-types/students';

export const { studentsGet: getStudents } = createActions({
  [StudentsActionTypes.STUDENTS_GET]: () => ({}),
});

export const { addStudent } = createActions({
  [StudentsActionTypes.ADD_STUDENT]: data => ({ data }),
});
