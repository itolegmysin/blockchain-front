import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled, { css, ThemeProvider } from 'styled-components';
import treeChanges from 'tree-changes';
import Modal from 'react-modal';

import history from 'modules/history';
import theme, { headerHeight } from 'modules/theme';
import { utils } from 'styled-minimal';

import config from 'config';
import { showAlert } from 'actions';

import Home from 'routes/Home';
import Students from 'routes/Students';
import StudentDetails from 'routes/StudentDetails';
import NotFound from 'routes/NotFound';

import Header from 'components/Header';
import SystemAlerts from 'components/SystemAlerts';

import GlobalStyles from 'components/GlobalStyles';
import RoutePublic from 'components/RoutePublic';
import RoutePrivate from 'components/RoutePrivate';

Modal.setAppElement('#root');

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const MainPrivate = ({ isAuthenticated }) =>
  isAuthenticated &&
  css`
    padding: ${utils.px(headerHeight)} 0 0;
  `;

const Main = styled.main`
  min-height: 100vh;

  ${MainPrivate};
`;

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(prevProps, this.props);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', { variant: 'success', icon: 'bell' }));
    }
  }

  render() {
    const { dispatch, user } = this.props;

    return (
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppWrapper logged={user.isAuthenticated}>
            <Helmet
              defer={false}
              htmlAttributes={{ lang: 'pt-br' }}
              encodeSpecialCharacters={true}
              defaultTitle={config.name}
              titleTemplate={`%s | ${config.name}`}
              titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            />
            {user.isAuthenticated && <Header dispatch={dispatch} user={user} />}
            <Main isAuthenticated={user.isAuthenticated}>
              <Switch>
                <RoutePublic
                  isAuthenticated={user.isAuthenticated}
                  path="/"
                  exact
                  component={Home}
                />
                <RoutePrivate
                  isAuthenticated={user.isAuthenticated}
                  path="/students"
                  component={Students}
                />
                <RoutePrivate
                  isAuthenticated={user.isAuthenticated}
                  path="/marks/:id"
                  component={StudentDetails}
                />
                <Route component={NotFound} />
              </Switch>
            </Main>
            <SystemAlerts />
            <GlobalStyles />
          </AppWrapper>
        </ThemeProvider>
      </Router>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default hot(connect(mapStateToProps)(App));
