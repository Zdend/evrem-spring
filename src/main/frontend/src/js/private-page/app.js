import App from './app.jsx';
import HomePage from './pages/home.jsx';
import WallPage from './pages/wall.jsx';
import FilterPage from './pages/filter.jsx';
import AppDispatcher from '../core/dispatcher';
import Router from 'react-router';
import {Route, HashLocation, DefaultRoute, Redirect} from 'react-router';

function run() {
    let routes = (
        <Route path="private" handler={App}>
            <Redirect from="/" to="/home" />
            <Route path="/home" handler={HomePage} name="home"/>
            <Route path="/wall" handler={WallPage}/>
            <Route path="/filter" handler={FilterPage}/>
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