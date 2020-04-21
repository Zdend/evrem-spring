var SavedNoteStore = require('../stores/saved-note-store');
var SavedNoteActions = require('../actions/saved-note-actions');
var WallGrid = require('./wall-grid.jsx');

function getNotesState() {
    return {
        notes: SavedNoteStore.getNotes()
    };
}

var WallContainer = React.createClass({
    getInitialState: function () {
        return getNotesState();
    },
    componentDidMount: function () {
        SavedNoteStore.addChangeListener(this._onChange, this);
    },
    componentWillUnmount: function () {
        SavedNoteStore.removeChangeListener(this._onChange, this);
    },
    render: function () {
        return (
            <div id="savednote-container">
                <input type="text" id="fix-for-lagging" style={{opacity: 0, position: 'absolute'}} />
                <WallGrid notes={this.state.notes} />
            </div>
        );
    },

    _onChange: function () {
        this.setState(getNotesState());
    }
});

module.exports = WallContainer;