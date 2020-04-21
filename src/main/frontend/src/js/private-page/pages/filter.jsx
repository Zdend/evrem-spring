import FilterPortlet from '../../filter-portlet/app.jsx';
import NewNotePortlet from '../../new-note-portlet/app.jsx';
export default class Filter extends React.Component{
    render() {
        return (
            <div>
                <FilterPortlet />
                <hr />
                <NewNotePortlet />
            </div>
        );
    }

}