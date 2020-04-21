import SavedNotePortlet from '../../saved-note-portlet/app.jsx';
import NewNotePortlet from '../../new-note-portlet/app.jsx';
export default class Wall extends React.Component{
    render() {
        return (
            <div>
                <NewNotePortlet />
                <SavedNotePortlet />
            </div>
        );
    }

}