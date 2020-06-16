import { all, fork } from 'redux-saga/effects';

import app from './app';
import user from './user';
import student from './student';
import mark from './mark';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(app), fork(user), fork(mark), fork(student)]);
}
