import { keyMirror } from 'modules/helpers';

/**
 * @namespace Constants
 * @desc Marks constants
 */

/**
 * @constant {Object} MarksActionTypes
 * @memberof Constants
 */
export const MarksActionTypes = keyMirror({
  MARKS_GET_BY_STUDENT_ID: undefined,
  MARKS_GET_BY_STUDENT_ID_SUCCESS: undefined,
  MARKS_GET_BY_STUDENT_ID_FAILURE: undefined,

  ADD_MARK_FOR_STUDENT_BY_ID: undefined,
  ADD_MARK_FOR_STUDENT_BY_ID_SUCCESS: undefined,
  ADD_MARK_FOR_STUDENT_BY_ID_FAILURE: undefined,
});
