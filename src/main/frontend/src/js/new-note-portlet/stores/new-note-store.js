import AppDispatcher from '../../core/dispatcher';
import NewNoteConstants from '../constants/new-note-constants';
import UtilService from '../services/util-service';
import ValidationService from '../../services/validation-service';
import StorageService from '../../services/storage-service';
import GlobalUtilService from '../../global-util';
import {HashLocation} from 'react-router';

var _note = {};

var _colors = {};
var _periods = {};
var _icons = {};
var _deletedNote = {};
var _infoMessage = '';
let _pendingChanges = false;
let _noteOptions = false;
let _filter = {
    isActive: false,
    note: {}
};

function getEmptyNote() {
    return {
        text: '',

        hasCheck: false,
        hasTime: false,
        hasReminder: false,
        hasRepeat: false,
        hasTodo: false,
        hasColor: false,
        hasWall: HashLocation.getCurrentPath().indexOf('/wall') !== -1,
        hasIcon: false,
        icon: UtilService.getRandomIcon(_icons),
        isDeleted: false,
        isDone: false,
        period: 'YEARLY',
        eventTime: '',
        color: UtilService.getRandomColor(_colors),
        remindInfo: {
            remindDate: '',
            remindSubject: ''
        },
        gridItem: getEmptyGridItem()
    }
}

function getEmptyGridItem() {
    return {
        w: 2,
        h: 1,
        x: StorageService.getNotDeletedWallNotes().length * 2 % 12,
        y: 10000
    }
}

function toggleOption(btnType) {
    let note = _note;
    if(_filter.isActive){
        note = _filter.note;
    }

    switch (btnType) {
        case NewNoteConstants.BUTTON_CHECK:
            note.hasCheck = !note.hasCheck;
            break;
        case NewNoteConstants.BUTTON_TIME:
            note.hasTime = !note.hasTime;
            break;
        case NewNoteConstants.BUTTON_REMINDER:
            note.hasReminder = !note.hasReminder;
            break;
        case NewNoteConstants.BUTTON_REPEAT:
            note.hasRepeat = !note.hasRepeat;
            break;
        case NewNoteConstants.BUTTON_TODO:
            note.hasTodo = !note.hasTodo;
            break;
        case NewNoteConstants.BUTTON_COLOR:
            note.hasColor = !note.hasColor;
            break;
        case NewNoteConstants.BUTTON_WALL:
            note.hasWall = !note.hasWall;
            if (note.hasWall) {
                note.gridItem = getEmptyGridItem();
            }
            break;
        case NewNoteConstants.BUTTON_ICON:
            note.hasIcon = !note.hasIcon;
            break;
        case NewNoteConstants.BUTTON_OPTIONS:
            _noteOptions = !_noteOptions;
            break;
        case NewNoteConstants.BUTTON_FILTER:
            _filter.isActive = !_filter.isActive;
            break;
        default:
            return;
    }

    if(btnType !== NewNoteConstants.BUTTON_OPTIONS && btnType !== NewNoteConstants.BUTTON_FILTER && !_filter.isActive){
        _pendingChanges = true;
    }
}

function editNote(noteId) {
    let note = StorageService.getNoteFromStorageById(noteId);
    _note = note;
    ValidationService.clearResult();
    _note.period = note.period || 'YEARLY';
    _note.remindInfo = note.remindInfo || {};
    _note.eventTime = note.eventTime || '';
    _note.icon = note.icon || 'SMILE';
}


//FUNCTIONS
let NewNoteStore = assign({}, EventEmitter.prototype, {

    getPeriods(){
        return _periods;
    },
    getColors(){
        return _colors;
    },
    getIcons(){
        return _icons;
    },
    getNote() {
        return _note;
    },
    getDeletedNote(){
        return _deletedNote;
    },
    getPendingChanges(){
        return _pendingChanges;
    },
    getHasDeletedNote(){
        return !jQuery.isEmptyObject(_deletedNote);
    },
    getInfoMessage(){
        return _infoMessage;
    },
    getNoteOptions(){
        return _noteOptions;
    },
    getFilter(){
        return _filter;
    },
    emitChange() {
        return this.emit(GlobalConstants.CHANGE_EVENT);
    },
    addChangeListener(callback, context) {
        this.on(GlobalConstants.CHANGE_EVENT, callback, context);
    },
    removeChangeListener(callback, context) {
        this.removeListener(GlobalConstants.CHANGE_EVENT, callback, context);
    }
});


NewNoteStore.dispatchToken = AppDispatcher.register((payload) => {

    switch (payload.actionType) {
        case NewNoteConstants.TOGGLE_OPTION:
            toggleOption(payload.btnType);
            break;
        case NewNoteConstants.REGISTER_CODELISTS:
            _colors = StorageService.getColors();
            _periods = StorageService.getPeriods();
            _icons = StorageService.getIcons();
            if (!_note.noteId && !_note.text) {
                _note = getEmptyNote();
            }
            if(!_filter.isActive){
                _filter.note = getEmptyNote();
            }
            break;
        case NewNoteConstants.SAVE_NOTE:
            _note = getEmptyNote();
            _infoMessage = 'Note has been successfully saved.';
            //setTimeout(() => {//TODO this action should or could be managed by info message container - a thing to consider
            //    _infoMessage = '';
            //NewNoteStore.emitChange();
            //}, 3000);
            _pendingChanges = false;
            _noteOptions = false;
            break;
        case NewNoteConstants.CHANGE_NOTE_VALUE:
            let note = _note;
            if(_filter.isActive){
                note = _filter.note;
            }

            let oldModel = assign({}, note);
            if (payload.nestedObject) {
                assign(note[payload.nestedObject], payload.notePart);
            } else {
                assign(note, payload.notePart);
            }
            if (!GlobalUtilService.isEquivalent(oldModel, note) && !_filter.isActive) {
                _pendingChanges = true;
            }
            break;
        case NewNoteConstants.EDIT_NOTE:
            _pendingChanges = false;
            _filter.isActive = false;
            editNote(payload.noteId);
            var noteInput = jQuery('#new-note-input');
            GlobalUtilService.scrollIfNotInView(noteInput);
            noteInput.focus();
            break;
        case NewNoteConstants.DELETE_NOTE:
            _pendingChanges = false;
            _noteOptions = false;
            _deletedNote = jQuery.extend(true, {}, _note);
            _note = getEmptyNote();
            break;
        case NewNoteConstants.CLEAR_NOTE:
            _noteOptions = false;
            if(_filter.isActive){
                _filter.note =  getEmptyNote();
            }else {
                _pendingChanges = false;
                _note = getEmptyNote();
            }
            break;
        case NewNoteConstants.CHECK_NOTE:
            _note.isDone = !_note.isDone;
            break;
        case NewNoteConstants.RESTORE_NOTE:
            _pendingChanges = false;
            _note = payload.note;
            _deletedNote = {};
            break;
        case NewNoteConstants.RESTORE_CURRENT_NOTE:
            _pendingChanges = false;
            _note = payload.note;
            if (_deletedNote.noteId === _note.noteId) {
                _deletedNote = {};
            }
            break;
        case NewNoteConstants.CLEAR_INFO_MSG:
            _infoMessage = '';
            break;
        case NewNoteConstants.SET_VALIDATION_ERRORS:
            //Just because of emitting change
            break;

        default:
            return true;
    }
    NewNoteStore.emitChange();
    return true;
});
export default NewNoteStore;