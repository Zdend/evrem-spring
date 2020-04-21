var AppDispatcher = require('../../core/dispatcher');
var FilterConstants = require('../constants/filter-constants');
var UtilService = require('../services/util-service');
import StorageService from '../../services/storage-service';

var _notes = {};
var _notesCount = 10;
var _urls = {};

function moreNotes(){
	if(_notesCount + 10 > _notes.length){
		_notesCount = _notes.length;
	}else{
		_notesCount += 10;
	}
}

//FUNCTIONS
var FilterStore = assign({}, EventEmitter.prototype, {
	getNotes: function(){
		return _notes.slice(0, _notesCount);
	},
	getAreAllNotesVisible: function(){
		return _notesCount >= _notes.length;
	},
	emitChange: function() {
		this.emit(GlobalConstants.CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(GlobalConstants.CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(GlobalConstants.CHANGE_EVENT, callback);
	},
    dispatchToken: AppDispatcher.register(function (payload) {

        switch (payload.actionType) {
            case FilterConstants.REGISTER_NOTES:
                _notes = StorageService.getNotesByFilter(payload.filter);
                break;
            case FilterConstants.EXPORT_ALL:
                exportAll();
                return true;
            case FilterConstants.MORE_NOTES:
                moreNotes();
                break;
            default:
                return true;
        }

        FilterStore.emitChange();

        return true;
    })
});

module.exports = FilterStore;