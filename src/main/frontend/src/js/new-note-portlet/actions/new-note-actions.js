import AppDispatcher from '../../core/dispatcher';
import NewNoteConstants from '../constants/new-note-constants';
import UpcomingConstants from '../../upcoming-portlet/constants/upcoming-constants';
import NewNoteStore from '../stores/new-note-store';
import NoteService from '../../services/note-service';
import StorageService from '../../services/storage-service';
import ValidationService from '../../services/validation-service';
import SavedNotedActions from '../../saved-note-portlet/actions/saved-note-actions';

export default class NewNoteActions {
    static toggleOption(btnType) {
        AppDispatcher.dispatch({
            actionType: NewNoteConstants.TOGGLE_OPTION,
            btnType: btnType
        });
        let filter = NewNoteStore.getFilter();
        if(filter.isActive){
            dispatchChangeToOtherStores(filter);
        }
    }
    static filterToggle(){
        let filter = NewNoteStore.getFilter();
        dispatchChangeToOtherStores(filter);
    }
    static registerCodelists () {
        AppDispatcher.dispatch({
            actionType: NewNoteConstants.REGISTER_CODELISTS
        });
    }

    static saveNote() {
        let filter = NewNoteStore.getFilter();
        if(filter.isActive){
            return;
        }
        let note = NewNoteStore.getNote();

        ValidationService.validateNote(note);

        if (ValidationService.hasError()) {
            console.log('Cannot save this note, it contains errors: ' + ValidationService.getMessages());
            AppDispatcher.dispatch({
                actionType: NewNoteConstants.SET_VALIDATION_ERRORS
            });
            return;
        }

        SavedNotedActions.saveCoordinates();
        let promise = NoteService.saveNote(note);

        promise.then((result)=> {
            console.log('Note has been saved.');
            StorageService.saveNote(result.payload);

            AppDispatcher.dispatch({
                actionType: NewNoteConstants.SAVE_NOTE
            });

            dispatchChangeToOtherStores();

        }, ()=> {
            console.log('Error during saving note, check your internet connection.');
        });
    }
    static changeNoteValue (notePart, nestedObject) {
        let filter = NewNoteStore.getFilter();
        AppDispatcher.dispatch({
            actionType: NewNoteConstants.CHANGE_NOTE_VALUE,
            notePart: notePart,
            nestedObject: nestedObject
        });

        if(filter.isActive){
            dispatchChangeToOtherStores(filter);
        }
    }
    static editNote (noteId) {
        AppDispatcher.dispatch({
            actionType: NewNoteConstants.EDIT_NOTE,
            note: noteId
        });
    }
    static deleteNote () {
        let note = NewNoteStore.getNote();
        if (!note.noteId) {
            return;
        }
        let promise = NoteService.deleteNote(note.noteId);

        promise.then((result)=> {
            console.log('Note has been deleted.');
            StorageService.saveNote(result.payload);

            AppDispatcher.dispatch({
                actionType: NewNoteConstants.DELETE_NOTE
            });
            dispatchChangeToOtherStores();
        }, ()=> {
            console.log('Error during deleting note, check your internet connection.');
        });
    }
    static clearNote () {
        AppDispatcher.dispatch({
            actionType: NewNoteConstants.CLEAR_NOTE
        });
    }
    static checkNote () {
        let note = NewNoteStore.getNote();
        let filter = NewNoteStore.getFilter();
        if(!note.noteId || filter.isActive){
            note = filter.isActive ? filter.note : note;
            AppDispatcher.dispatch({
                actionType: NewNoteConstants.CHANGE_NOTE_VALUE,
                notePart: {isDone: !note.isDone}
            });
            dispatchChangeToOtherStores(filter);
            return;
        }
        let promise = NoteService.checkNote(note.noteId);

        promise.then((result)=> {
            console.log('Note has been checked.');
            StorageService.saveNote(result.payload);

            AppDispatcher.dispatch({
                actionType: NewNoteConstants.CHECK_NOTE
            });
            dispatchChangeToOtherStores();
        }, ()=> {
            console.log('Error during checking note, check your internet connection.');
        });
    }
    static restoreNote () {
        let deletedNote = NewNoteStore.getDeletedNote();
        let promise = NoteService.saveNote(deletedNote);

        promise.then((result)=> {
            console.log('Note has been restored.');
            StorageService.saveNote(result.payload);

            AppDispatcher.dispatch({
                actionType: NewNoteConstants.RESTORE_NOTE,
                note: result.payload
            });
            dispatchChangeToOtherStores();
        }, ()=> {
            console.log('Error during restoring note, check your internet connection.');
        });

    }
    static restoreCurrentNote () {//TODO is it really neccessary to use both restoreCurrentNote and restoreNote
        let deletedNote = NewNoteStore.getNote();
        let promise = NoteService.saveNote(deletedNote);

        promise.then((result)=> {
            console.log('Note has been restored.');
            StorageService.saveNote(result.payload);

            AppDispatcher.dispatch({
                actionType: NewNoteConstants.RESTORE_CURRENT_NOTE,
                note: result.payload
            });
            dispatchChangeToOtherStores();
        }, ()=> {
            console.log('Error during restoring note, check your internet connection.');
        });

    }
    static clearInfoMessage () {
        AppDispatcher.dispatch({
            actionType: NewNoteConstants.CLEAR_INFO_MSG
        });
    }

}

function dispatchChangeToOtherStores(filter) {
    AppDispatcher.dispatch({
        actionType: NewNoteConstants.REGISTER_NOTES,
        filter: filter
    });
}
