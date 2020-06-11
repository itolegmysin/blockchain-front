import app from './app';
import github from './github';
import student from './student';
import user from './user';

export default {
  ...app,
  ...github,
  ...user,
  ...student,
};
