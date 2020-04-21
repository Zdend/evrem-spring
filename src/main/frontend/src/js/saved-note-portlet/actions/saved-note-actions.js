import AppDispatcher from '../../core/dispatcher';
import SavedNoteConstants from '../constants/saved-note-constants';
import NoteService from '../../services/note-service';
import StorageService from '../../services/storage-service';
import SavedNoteStore from '../stores/saved-note-store';
import NewNoteStore from '../../new-note-portlet/stores/new-note-store';

var SavedNoteActions = {

    registerNotes: function () {
        AppDispatcher.dispatch({
            actionType: SavedNoteConstants.REGISTER_NOTES,
            filter: NewNoteStore.getFilter()
        });
    },
    editNote: function (noteId) {
        AppDispatcher.dispatch({
            actionType: SavedNoteConstants.EDIT_NOTE,
            noteId: noteId
        });
    },
    coordinatesChange: function (coordinates) {
        let filter = NewNoteStore.getFilter();
        if(filter.isActive){
            return;
        }
        AppDispatcher.dispatch({
            actionType: SavedNoteConstants.COORDINATES_CHANGE,
            coordinates: coordinates
        });
    },
    saveCoordinates: function () {
        let filter = NewNoteStore.getFilter();
        if(filter.isActive){
            return;
        }
        let coordinates = SavedNoteStore.getUnsavedCoordinates();
        if (coordinates.length < 1) {
            return;
        }
        let fixedCoordinates = [];
        for (let i = 0; i < coordinates.length; i++) {
            let c = coordinates[i];
            fixedCoordinates.push({
                x: c.x,
                y: c.y,
                w: c.w,
                h: c.h,
                gridItemId: parseInt(c.i, 10)
            });
        }

        let promise = NoteService.saveCoordinates(fixedCoordinates);


        promise.then((result)=> {
            console.log('Coordinates has been saved.');
            let notes = StorageService.getNotDeletedWallNotes();
            let persistedCoordinates = result.payload;
            for (let i = 0; i < persistedCoordinates.length; i++) {
                for (let j = 0; j < notes.length; j++) {
                    if (persistedCoordinates[i].gridItemId === notes[j].gridItem.gridItemId) {
                        notes[j].gridItem = persistedCoordinates[i];
                    }
                }
            }
            StorageService.saveMultipleNotes(notes);

            AppDispatcher.dispatch({
                actionType: SavedNoteConstants.SAVE_COORDINATES
            });
            //AppDispatcher.dispatch({
            //    actionType: SavedNoteConstants.REGISTER_NOTES
            //});
        }, ()=> {
            console.log('Error during saving coordinates of note, check your internet connection.');
        });

    },
    checkNote: function (noteId) {
        let promise = NoteService.checkNote(noteId);

        promise.then((result)=> {
            console.log('Note has been checked.');
            StorageService.saveNote(result.payload);

            dispatchChangeToOtherStores();
        }, ()=> {
            console.log('Error during checking note, check your internet connection.');
        });
    },
    checkTodoNote: function (todoNoteId) {
        let promise = NoteService.checkTodoNote(todoNoteId);

        promise.then((result)=> {
            StorageService.saveNote(result.payload);

            dispatchChangeToOtherStores();

        }, ()=> {
            console.log('Error during checking todo note. Check your internet connection.');
        });
    }

};

function dispatchChangeToOtherStores() {
    AppDispatcher.dispatch({
        actionType: SavedNoteConstants.REGISTER_NOTES
    });
}
module.exports = SavedNoteActions;