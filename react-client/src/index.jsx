import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import AppRoute from './components/AppRoute.js';
import rootReducer from './Reducers/index'

const  store = createStore(rootReducer)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <AppRoute />
        </div>
      </Provider >
      
      );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));