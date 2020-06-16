import app from './app';
import students from './students';
import marks from './marks';
import user from './user';

export default {
  ...app,
  ...user,
  ...students,
  ...marks,
};
