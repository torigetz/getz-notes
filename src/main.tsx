
import './reset.css';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from './containers/AppContainer';

const ROOT = '#root';

render(<AppContainer />, document.querySelector(ROOT));
