var SavedNoteStore = require('../stores/saved-note-store');
var SavedNoteActions = require('../actions/saved-note-actions');
var NoteContainer = require('./note-container.jsx');
//var ResponsiveReactGridLayout = ReactGridLayout.Responsive;
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

function getState(props){
    return {
        notes: props.notes
    };
}

var WallGrid = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return getState(this.props);
    },

    componentWillReceiveProps: function(props){
      this.setState(getState(props));
    },

    render() {
        let gridConfig = {
            className: 'layout',
            items: 50,
            rowHeight: 60,
            cols: 8,
            useCSSTransforms: true,
            isDraggable: true,
            autoSize: true,
            onDrag:this.fixDragWithFocus,
            onResize:this.fixDragWithFocus

        };
        return (
            <ReactGridLayout onLayoutChange={this.onLayoutChange} {...gridConfig}>
                {this.state.notes.map(function (note) {
                    let item = note.gridItem;

                    return (
                        <div key={item.gridItemId} _grid={{x: item.x, y: item.y, w: item.w, h: item.h, i:item.gridItemId}} className="sn-grid-wrapper">
                            <NoteContainer note={note} />
                        </div>
                    );
                })}
            </ReactGridLayout>

        );
    },



    onLayoutChange: function(coordinates){
        SavedNoteActions.coordinatesChange(coordinates);
        SavedNoteActions.saveCoordinates();
    },

    fixDragWithFocus: function(){
        //jQuery('#fix-for-lagging').focus(); On Mac there is no need for this fix, maybe mac has much better performance
    }
});

module.exports = WallGrid;
