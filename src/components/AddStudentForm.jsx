import React, { useCallback, useReducer } from 'react';
import { Input, Label, Form, Button } from 'styled-minimal';

const initialState = {
  name: '',
  course: 0,
  speciality: '',
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'name':
      return {
        ...state,
        name: payload,
      };

    case 'course':
      return {
        ...state,
        course: payload,
      };

    case 'speciality':
      return {
        ...state,
        speciality: payload,
      };

    default:
      throw new Error();
  }
};

const AddStudentForm = ({ onSubmit }) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { course, name: studentName, speciality } = formState;

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target;
      dispatch({ type: name, payload: value });
    },
    [formState, dispatch],
  );

  const handleSubmit = useCallback(() => {
    onSubmit(formState);
  }, [onSubmit, formState]);

  return (
    <>
      <h1>Add student</h1>
      <Form>
        <Label htmlFor="name">Name</Label>
        <Input name="name" value={studentName} onChange={handleChange} />
        <Label htmlFor="course">Course</Label>
        <Input name="course" value={course} type="number" min={1} max={6} onChange={handleChange} />
        <Label htmlFor="speciality">Speciality</Label>
        <Input name="speciality" value={speciality} onChange={handleChange} />
        <Button onClick={handleSubmit}>Add student</Button>
      </Form>
    </>
  );
};

export default AddStudentForm;
