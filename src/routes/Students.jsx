import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Screen, Table } from 'styled-minimal';

import { getStudents } from 'actions';
import { STATUS } from 'constants/index';

import Loader from 'components/Loader';
import { selectStudentsState } from '../store-selectors/students';

const Students = () => {
  const studentsState = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const data = studentsState.collection || [];
  let output;

  if (studentsState.status === STATUS.SUCCESS) {
    if (data.length) {
      output = (
        <Table data-testid="StudentsTable">
          <tbody>
            <tr>
              <td>Name</td>
              <td>Course</td>
              <td>Speciality</td>
            </tr>
            {data.map(({ _id, name, course, speciality }) => (
              <tr key={_id}>
                <td>
                  <Link to={`/marks/${_id}`}>{name}</Link>
                </td>
                <td>{course}</td>
                <td>{speciality}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else {
      output = <h3>Nothing found</h3>;
    }
  } else {
    output = <Loader block />;
  }

  return (
    <Screen key="Students" data-testid="StudentsWrapper">
      <Container verticalPadding>
        <h1>Students</h1>
        {output}
      </Container>
    </Screen>
  );
};

export default Students;
