import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Screen, Table, Button } from 'styled-minimal';
import styled from 'styled-components';
import Modal from 'react-modal';

import { STATUS } from 'constants/index';

import Loader from 'components/Loader';
import { getMarksByStudentId } from 'actions';
import { addMarkForStudentById } from 'actions/mark';
import { selectMarksByStudentId, selectMarksStatus } from '../store-selectors/marks';
import { HeaderWrapper } from '../components/HeaderWrapper';

const MarkInput = styled.input`
  min-width: 50px;
  height: 35px;
  margin-right: 10px;
`;

const SubjectInput = styled.input`
  min-width: 100px;
  height: 35px;
  margin-top: 10px;
  margin-right: 10px;
`;

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

const StudentDetails = () => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMark, setNewMark] = useState(1);
  const [newSubject, setSubject] = useState('');
  const data = useSelector(selectMarksByStudentId(id));
  const marksStatus = useSelector(selectMarksStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarksByStudentId(id));
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
    setNewMark(1);
    setSubject('');
  }, [isModalVisible, setIsModalVisible]);

  const handleMarkValueChange = useCallback(
    event => {
      setNewMark(event.target.value);
    },
    [setNewMark],
  );

  const handleSubjectValueChange = useCallback(
    event => {
      setSubject(event.target.value);
    },
    [setSubject],
  );

  const handleAddMark = useCallback(() => {
    dispatch(addMarkForStudentById(id, newMark, newSubject));
    toggleModal();
  }, [toggleModal, addMarkForStudentById, dispatch, newMark, id, newSubject]);

  let output;

  if (marksStatus === STATUS.SUCCESS) {
    if (data.length) {
      output = (
        <Table data-testid="StudentDetails">
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Subject</td>
              <td>Date</td>
            </tr>
            {data.map(({ _id, mark, subjectName, createdAt }) => (
              <tr key={_id}>
                <td>{mark}</td>
                <td>{subjectName}</td>
                <td>{createdAt}</td>
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
          <h1>Marks for student {id}</h1>
          <Button onClick={toggleModal}>Add Mark</Button>
        </HeaderWrapper>
        {output}
        <Modal
          isOpen={isModalVisible}
          onRequestClose={toggleModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Add new mark</h2>
          <form>
            <MarkInput
              type="number"
              value={newMark}
              onChange={handleMarkValueChange}
              min={1}
              max={9}
            />
            <SubjectInput value={newSubject} onChange={handleSubjectValueChange} />
            <Button onClick={handleAddMark}>Add</Button>
          </form>
        </Modal>
      </Container>
    </Screen>
  );
};

export default StudentDetails;
