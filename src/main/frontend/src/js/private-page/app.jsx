import vendorStyles from '../../css/vendor-modification.css';
import styles from '../../css/private-page.css';
import Footer from './components/footer.jsx';
import Header from './components/header.jsx';
import StorageService from '../services/storage-service';
import {RouteHandler} from 'react-router';

class App extends React.Component {

    componentWillMount(){
        let initialData = JSON.parse(jQuery('#data-container').text());
        StorageService.saveContextPath(initialData.contextPath);
        StorageService.saveNotes(initialData.notes);
        StorageService.saveColors(initialData.colors);
        StorageService.savePeriods(initialData.periods);
        StorageService.saveIcons(initialData.icons);
        StorageService.saveCSRF(initialData.csrf);
    }
    render() {

        return (
            <div id="wrapper">
                <div className="spinner">
                    <div className="spinner-square"></div>
                </div>

                <Header />
                <RouteHandler/>
                <Footer />

            </div>
        );
    }
}
export default App;