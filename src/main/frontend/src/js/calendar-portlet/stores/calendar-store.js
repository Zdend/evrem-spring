import AppDispatcher from '../../core/dispatcher';
import CalendarConstants from '../constants/calendar-constants';
import NewNoteStore from '../../new-note-portlet/stores/new-note-store';
import StorageService from '../../services/storage-service';

var _notes = {};


//FUNCTIONS
let CalendarStore = assign({}, EventEmitter.prototype, {

    getNotes () {
        return _notes;
    },

    emitChange() {
        this.emit(GlobalConstants.CHANGE_EVENT);
    },
    addChangeListener(callback) {
        this.on(GlobalConstants.CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(GlobalConstants.CHANGE_EVENT, callback);
    },
    dispatchToken: AppDispatcher.register(function (payload) {
        switch (payload.actionType) {
            case CalendarConstants.REGISTER_NOTES:
                AppDispatcher.waitFor([NewNoteStore.dispatchToken]);
                _notes = StorageService.getNotDeletedWallNotes();
                break;

            default:
                return true;
        }

        CalendarStore.emitChange();

        return true;
    })
});

export default CalendarStore;