// @flow
/**
 * @module Actions/Marks
 * @desc Marks Actions
 */
import { createActions } from 'redux-actions';

import { MarksActionTypes } from 'constants/action-types/marks';

export const { marksGetByStudentId: getMarksByStudentId } = createActions({
  [MarksActionTypes.MARKS_GET_BY_STUDENT_ID]: id => ({ id }),
});

export const { addMarkForStudentById } = createActions({
  [MarksActionTypes.ADD_MARK_FOR_STUDENT_BY_ID]: (id, mark, subject) => ({ id, mark, subject }),
});
