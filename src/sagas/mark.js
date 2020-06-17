/**
 * @module Sagas/Student
 * @desc Student
 */

import { all, delay, put, takeLatest, call } from 'redux-saga/effects';

import { MarksActionTypes } from 'constants/action-types/marks';
import { showAlert } from 'actions';
import { request } from '../modules/client';

/**
 * Get Marks By Student id
 *
 * @param {Object} action
 *
 */
export function* getMarksByStudentId(action) {
  try {
    const studentId = action.payload.id;
    // const response = yield call(request, 'http://localhost:4000/api/students');
    yield delay(500);
    yield put({
      type: MarksActionTypes.MARKS_GET_BY_STUDENT_ID_SUCCESS,
      payload: {
        studentId,
        data: [
          {
            _id: `${1}${studentId}`,
            studentId,
            subjectId: 2,
            subjectName: 'First subject',
            mark: 9,
            createdAt: new Date().toISOString(),
          },
          {
            _id: `${2}${studentId}`,
            studentId,
            subjectId: 2,
            subjectName: 'First subject',
            mark: 9,
            createdAt: new Date().toISOString(),
          },
          {
            _id: `${3}${studentId}`,
            studentId,
            subjectId: 2,
            subjectName: 'First subject',
            mark: 9,
            createdAt: new Date().toISOString(),
          },
        ],
      },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: MarksActionTypes.MARKS_GET_BY_STUDENT_ID_FAILURE,
      payload: err,
    });
  }
}

/**
 * Add Mark for Student By Id
 *
 * @param {Object} action
 *
 */
export function* addMarkForStudentById(action) {
  try {
    const { mark, subject, id: studentId } = action.payload;
    yield call(request, 'http://localhost:4000/api/marks', {
      method: 'POST',
      payload: {
        mark,
        subject,
        studentId,
      },
    });
    yield delay(500);
    // yield put({
    //   type: MarksActionTypes.ADD_MARK_FOR_STUDENT_BY_ID_SUCCESS,
    //   payload: {
    //     _id: `${4}${studentId}`,
    //     studentId,
    //     subjectId: 3,
    //     subjectName: 'Third subject',
    //     mark,
    //     createdAt: new Date().toISOString(),
    //   },
    // });
    // yield put({
    //   type: MarksActionTypes.ADD_MARK_FOR_STUDENT_BY_ID_SUCCESS,
    //   payload: {
    //     _id: `${4}${studentId}`,
    //     studentId,
    //     subjectId: 3,
    //     subjectName: 'Third subject',
    //     mark,
    //     createdAt: new Date().toISOString(),
    //   },
    // });
    yield put(showAlert('New mark successfully added', { variant: 'success', icon: 'bell' }));
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: MarksActionTypes.ADD_MARK_FOR_STUDENT_BY_ID_FAILURE,
      payload: err,
    });
  }
}

/**
 * Marks Sagas
 */
export default function* root() {
  yield all([
    takeLatest(MarksActionTypes.MARKS_GET_BY_STUDENT_ID, getMarksByStudentId),
    takeLatest(MarksActionTypes.ADD_MARK_FOR_STUDENT_BY_ID, addMarkForStudentById),
  ]);
}
