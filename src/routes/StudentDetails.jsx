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

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AddButton = styled(Button)`
  margin-left: 20px;
`;
const MarkInput = styled.input`
  min-width: 50px;
  height: 35px;
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
  const data = useSelector(selectMarksByStudentId(id));
  const marksStatus = useSelector(selectMarksStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMarksByStudentId(id));
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
    setNewMark(1);
  }, [isModalVisible, setIsModalVisible]);

  const handleMarkValueChange = useCallback(
    event => {
      setNewMark(event.target.value);
    },
    [setNewMark],
  );

  const handleAddMark = useCallback(() => {
    dispatch(addMarkForStudentById(id, newMark));
    toggleModal();
  }, [toggleModal, addMarkForStudentById, dispatch, newMark, id]);

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
          <AddButton onClick={toggleModal}>Add Mark</AddButton>
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
            <Button onClick={handleAddMark}>Add</Button>
          </form>
        </Modal>
      </Container>
    </Screen>
  );
};

export default StudentDetails;
