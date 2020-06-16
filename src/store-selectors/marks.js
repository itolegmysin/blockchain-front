import { createSelector } from 'reselect';

export const selectMarksState = state => state.marks;
export const selectMarksStatus = createSelector(
  selectMarksState,
  state => state.status,
);
export const selectMarksByStudentId = id =>
  createSelector(
    selectMarksState,
    state => state.collection.filter(mark => mark.studentId === id),
  );
