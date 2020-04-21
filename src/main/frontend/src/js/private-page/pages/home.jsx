import UpcomingPortlet from '../../upcoming-portlet/app.jsx';
import NewNotePortlet from '../../new-note-portlet/app.jsx';
export default class Home extends React.Component{
    render() {
        return (
            <div>
                <UpcomingPortlet />
                <hr />
                <NewNotePortlet />
            </div>
        );
    }

}