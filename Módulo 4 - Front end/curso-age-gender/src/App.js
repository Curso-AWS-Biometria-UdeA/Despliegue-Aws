import React from 'react';
import {BrowserRouter,Switch, Route} from "react-router-dom"

import Login from './Login';
import Register from './Register';
import Recording from './Recording';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ModalSwitch />
      </BrowserRouter>
    );
  }
}

function ModalSwitch() {
	return (
		<div>
			<Switch>
				<Route exact path="/" children={<Login />} />
				<Route exact path="/register" children={<Register />} />
				<Route exact path="/recording" children={<Recording />} />

			</Switch>
		</div>
	);
}

export default App;