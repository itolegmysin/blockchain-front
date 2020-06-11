import React from 'react';

import Students from 'components/Students';

import { Container, Screen } from 'styled-minimal';

const Private = () => (
  <Screen key="Private" data-testid="PrivateWrapper">
    <Container verticalPadding>
      <Students />
    </Container>
  </Screen>
);

export default Private;
