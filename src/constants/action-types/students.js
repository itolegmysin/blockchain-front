import { keyMirror } from 'modules/helpers';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} StudentsActionTypes
 * @memberof Constants
 */
export const StudentsActionTypes = keyMirror({
  STUDENTS_GET: undefined,
  STUDENTS_GET_SUCCESS: undefined,
  STUDENTS_GET_FAILURE: undefined,

  ADD_STUDENT: undefined,
  ADD_STUDENT_SUCCESS: undefined,
  ADD_STUDENT_FAILURE: undefined,
});
