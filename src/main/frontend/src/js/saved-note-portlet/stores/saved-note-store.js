import AppDispatcher from '../../core/dispatcher';
import SavedNoteConstants from '../constants/saved-note-constants';
import StorageService from '../../services/storage-service';
import NewNoteStore from '../../new-note-portlet/stores/new-note-store';

var _notes = {};
var _unsavedCoordinates = [];

//FUNCTIONS
var SavedNoteStore = assign({}, EventEmitter.prototype, {
    getNotes: function () {
        return _notes;
    },
    getUnsavedCoordinates: function(){
      return _unsavedCoordinates;
    },
    emitChange: function () {
        this.emit(GlobalConstants.CHANGE_EVENT);
    },
    addChangeListener: function (callback, context) {
        this.on(GlobalConstants.CHANGE_EVENT, callback, context);
    },
    removeChangeListener: function (callback, context) {
        this.removeListener(GlobalConstants.CHANGE_EVENT, callback, context);
    },
    dispatchToken: AppDispatcher.register(function (payload) {

        switch (payload.actionType) {
            case SavedNoteConstants.REGISTER_NOTES:
                AppDispatcher.waitFor([NewNoteStore.dispatchToken]);
                _notes = StorageService.getNotDeletedWallNotes(payload.filter);
                break;
            case SavedNoteConstants.SAVE_COORDINATES:
                _unsavedCoordinates = [];
                return true;
            case SavedNoteConstants.COORDINATES_CHANGE:
                _unsavedCoordinates = payload.coordinates;
                return true;

            default:
                return true;
        }

        SavedNoteStore.emitChange();

        return true;
    })
});

module.exports = SavedNoteStore;