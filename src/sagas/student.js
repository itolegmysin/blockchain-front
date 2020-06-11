/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getStudents() {
  try {
    const response = yield call(request, 'http://localhost:4000/api/students');
    yield put({
      type: ActionTypes.STUDENTS_GET_SUCCESS,
      payload: { data: response },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.STUDENTS_GET_FAILURE,
      payload: err,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.STUDENTS_GET, getStudents)]);
}
