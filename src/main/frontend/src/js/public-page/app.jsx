import vendorStyles from '../../css/vendor-modification.css';
import styles from '../../css/public-page.css';
import StorageService from '../services/storage-service';
import {RouteHandler} from 'react-router';

class App extends React.Component {

    render() {
        let initialData = JSON.parse(jQuery('#data-container').text());
        StorageService.saveContextPath(initialData.contextPath);
        StorageService.saveCSRF(initialData.csrf);

        return (
            <div id="wrapper">
                <div className="spinner">
                    <div className="spinner-square"></div>
                </div>

                <RouteHandler/>

            </div>
        );
    }
}
export default App;