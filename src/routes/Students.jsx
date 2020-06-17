import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Screen, Table, Button } from 'styled-minimal';
import Modal from 'react-modal';

import { getStudents, addStudent } from 'actions';
import { STATUS } from 'constants/index';

import Loader from 'components/Loader';
import AddStudentForm from 'components/AddStudentForm';
import { selectStudentsState } from '../store-selectors/students';
import { HeaderWrapper } from '../components/HeaderWrapper';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Students = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const studentsState = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible, setIsModalVisible]);

  const handleAddStudent = useCallback(
    values => {
      dispatch(addStudent(values));
      toggleModal();
    },
    [dispatch, toggleModal],
  );

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
        <HeaderWrapper>
          <h1>Students</h1>
          <Button onClick={toggleModal}>Add student</Button>
        </HeaderWrapper>
        {output}
        <Modal
          isOpen={isModalVisible}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel="Add Student"
        >
          <AddStudentForm onSubmit={handleAddStudent} />
        </Modal>
      </Container>
    </Screen>
  );
};

export default Students;
