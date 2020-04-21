import App from './app.jsx';
import LoginPage from './pages/login.jsx';

import Router from 'react-router';
import {Route, HashLocation, DefaultRoute} from 'react-router';

function run() {
    let routes = (
        <Route path="/" handler={App}>
            <DefaultRoute handler={LoginPage}/>
            <Route path="login" handler={LoginPage}/>
        </Route>


    );
    Router.run(routes, HashLocation, (Root) => {
        React.render(<Root/>, document.getElementById('app'));
    });
}
Promise.all([
    new Promise((resolve) => {
        if (window.addEventListener) {
            window.addEventListener('DOMContentLoaded', resolve);
        } else {
            window.attachEvent('onload', resolve);
        }
    }).then(() => FastClick.attach(document.body))
]).then(run);