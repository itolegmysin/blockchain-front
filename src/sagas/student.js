/**
 * @module Sagas/Student
 * @desc Student
 */

import { all, delay, put, takeLatest, call } from 'redux-saga/effects';

import { StudentsActionTypes } from 'constants/action-types/students';
import { request } from '../modules/client';

/**
 * Get Students
 *
 * @param {Object} action
 *
 */
export function* getStudents() {
  try {
    const response = yield call(request, 'http://localhost:4000/api/students');
    yield delay(500);
    yield put({
      type: StudentsActionTypes.STUDENTS_GET_SUCCESS,
      payload: {
        data: response,
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
 * Add Student
 *
 * @param {Object} action
 *
 */
export function* addStudent(action) {
  const { data } = action.payload;
  try {
    // const response = yield call(request, 'http://localhost:4000/api/students');
    yield delay(500);
    yield put({
      type: StudentsActionTypes.ADD_STUDENT_SUCCESS,
      payload: {
        data: {
          _id: Math.random() * 10,
          ...data,
        },
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: StudentsActionTypes.ADD_STUDENT_FAILURE,
      payload: err,
    });
  }
}

/**
 * Students Sagas
 */
export default function* root() {
  yield all([takeLatest(StudentsActionTypes.STUDENTS_GET, getStudents)]);
  yield all([takeLatest(StudentsActionTypes.ADD_STUDENT, addStudent)]);
}
