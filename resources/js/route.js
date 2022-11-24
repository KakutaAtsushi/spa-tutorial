import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import Example from './components/pages/Example';

function App() {
    return (
        <div>
            <Switch>
                <Route path='/example' exact component={Example} />
            </Switch>
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'))
