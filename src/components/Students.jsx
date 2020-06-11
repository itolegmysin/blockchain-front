import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { appColor } from 'modules/theme';

import { getRepos, getStudents, showAlert, switchMenu } from 'actions';
import { STATUS } from 'constants/index';

import {
  ButtonGroup,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Paragraph,
  theme,
  utils,
} from 'styled-minimal';
import Loader from 'components/Loader';

const { responsive, spacer } = utils;
const { grays } = theme;

const StudentsGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${spacer(2)};
  grid-template-columns: 100%;
  list-style: none;
  margin: ${spacer(4)} auto 0;
  padding: 0;
  /* stylelint-disable */
  ${/* istanbul ignore next */ p =>
    responsive({
      ix: `
        grid-gap: ${spacer(3)(p)};
        width: 90%;
      `,
      md: `
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      `,
      lg: `
        grid-template-columns: repeat(3, 1fr);
      `,
      xl: `
        grid-gap: ${spacer(4)(p)};
        grid-template-columns: repeat(4, 1fr);
      `,
    })};
  /* stylelint-enable */

  > li {
    display: flex;
    flex-direction: column;
  }
`;

const Item = styled.div`
  display: flex;
  p {
    margin-left: 10px;
  }
`;

export class Students extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    students: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getStudents());
  }

  render() {
    const { students } = this.props;
    const data = students.data || [];
    let output;

    if (students.status === STATUS.SUCCESS) {
      if (data.length) {
        output = (
          <StudentsGrid data-testid="StudentsGrid">
            {data.map(({ _id, name, course, speciality }) => (
              <li key={_id}>
                <Item>
                  Name:
                  <Paragraph>{name}</Paragraph>
                </Item>
                <Item>
                  Course:
                  <Paragraph>{course}</Paragraph>
                </Item>
                <Item>
                  Speciality:
                  <Paragraph>{speciality}</Paragraph>
                </Item>
              </li>
            ))}
          </StudentsGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }

    return (
      <div key="Students" data-testid="StudentsWrapper">
        {output}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps({ students }) {
  return { students };
}

export default connect(mapStateToProps)(Students);
