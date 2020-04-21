import AppDispatcher from '../../core/dispatcher';
import UpcomingConstants from '../constants/upcoming-constants';
import SortService from '../services/sort-service';
import StorageService from '../../services/storage-service';
import NewNoteStore from '../../new-note-portlet/stores/new-note-store';

var _todayNotes = {};
var _futureNotes = {};
var _pastNotes = {};
var _allNotes = {};

var _eventsCount = 10;

var _urls = {};


function registerNotes(notes) {
    _allNotes = notes;

    var todayNotesUnsorted = SortService.getNotesBetween(notes, moment().startOf('day'), moment().endOf('day'));
    _todayNotes = SortService.sortNotesByDate(todayNotesUnsorted, true);

    var futureNotesUnsorted = SortService.getNotesBetween(notes, moment().startOf('day').add(1, 'd'), null);
    _futureNotes = SortService.sortNotesByDate(futureNotesUnsorted, true);

    var pastNotesUnsorted = SortService.getNotesBetween(notes, null, moment().endOf('day').subtract(1, 'd'));
    _pastNotes = SortService.sortNotesByDate(pastNotesUnsorted, false);
}


function moreEvents() {
    var mostNotes = SortService.getMaximumEventsCount(_todayNotes, _futureNotes, _pastNotes);
    if (_eventsCount + 10 > mostNotes) {
        _eventsCount = mostNotes;
    } else {
        _eventsCount += 10;
    }
}

var UpcomingStore = assign({}, EventEmitter.prototype, {

    getTodayNotes(){
        return SortService.getEventsSlicedByCount(_todayNotes, _eventsCount);
    },
    getFutureNotes(){
        return SortService.getEventsSlicedByCount(_futureNotes, _eventsCount);
    },
    getPastNotes(){
        return SortService.getEventsSlicedByCount(_pastNotes, _eventsCount);
    },
    getAreAllNotesVisible(){
        return _eventsCount >= SortService.getMaximumEventsCount(_todayNotes, _futureNotes, _pastNotes);
    },
    emitChange(){
        return this.emit(GlobalConstants.CHANGE_EVENT);
    },
    addChangeListener(callback, context){
        this.on(GlobalConstants.CHANGE_EVENT, callback, context);
    },
    removeChangeListener(callback, context){
        this.removeListener(GlobalConstants.CHANGE_EVENT, callback, context);
    }
});

UpcomingStore.dispatchToken = AppDispatcher.register((payload) => {

    switch (payload.actionType) {
        case UpcomingConstants.REGISTER_NOTES:
            let allNotes = StorageService.getNotDeletedNotes(payload.filter);
            registerNotes(allNotes);
            break;
        case UpcomingConstants.MORE_EVENTS:
            moreEvents();
            break;

        default:
            return true;

    }

    UpcomingStore.emitChange();
    return true;
});

module.exports = UpcomingStore;