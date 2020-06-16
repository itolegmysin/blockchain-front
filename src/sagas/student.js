/**
 * @module Sagas/Student
 * @desc Student
 */

import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { StudentsActionTypes } from 'constants/action-types/students';

/**
 * Get Students
 *
 * @param {Object} action
 *
 */
export function* getStudents() {
  try {
    // const response = yield call(request, 'http://localhost:4000/api/students');
    yield delay(500);
    yield put({
      type: StudentsActionTypes.STUDENTS_GET_SUCCESS,
      payload: {
        data: [
          { _id: 1, name: 'Oleg Mysin', course: '4', speciality: 'New speciality' },
          { _id: 2, name: 'Yan Koshelev', course: '2', speciality: 'Second speciality' },
          { _id: 3, name: 'Maxim Logurev', course: '2', speciality: 'Second speciality' },
        ],
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: StudentsActionTypes.STUDENTS_GET_FAILURE,
      payload: err,
    });
  }
}

/**
 * Students Sagas
 */
export default function* root() {
  yield all([takeLatest(StudentsActionTypes.STUDENTS_GET, getStudents)]);
}
