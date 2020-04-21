import AppDispatcher from '../../core/dispatcher';
import FilterConstants from '../constants/filter-constants';
import NoteService from '../../services/note-service';
import StorageService from '../../services/storage-service';
import NewNoteStore from '../../new-note-portlet/stores/new-note-store';

var FilterActions = {

    registerNotes: function () {
        AppDispatcher.dispatch({
            actionType: FilterConstants.REGISTER_NOTES,
            filter: NewNoteStore.getFilter()
        });
    },
    exportAll: function () {
        let promise = NoteService.exportAll();

        promise.then((result)=>{
            console.log('Export has been performed..');
            let contextPath = StorageService.getContextPath();
            window.location.href = contextPath+'/rest/file/get/'+result.payload;
        },()=>{
            console.log('Error during exporting notes, check your internet connection.');
        });
    },
    editNote: function (noteId) {
        AppDispatcher.dispatch({
            actionType: FilterConstants.EDIT_NOTE,
            noteId: noteId
        });
    },
    emptyTrash: function () {
        let promise = NoteService.emptyTrash();

        promise.then((result)=>{
            console.log('Trash has been disposed..');
            StorageService.removeNotesPermanently(result.payload);

            dispatchChangeToOtherStores();
        },()=>{
            console.log('Error during trashing disposal, check your internet connection.');
        });
    },
//  reloadNotes: function() {
//	  AppDispatcher.dispatch({
//		  actionType: FilterConstants.RELOAD_NOTES
//	  });
//  },
    moreNotes: function () {
        AppDispatcher.dispatch({
            actionType: FilterConstants.MORE_NOTES
        });
    }

};
function dispatchChangeToOtherStores(){
    AppDispatcher.dispatch({
        actionType: FilterConstants.REGISTER_NOTES
    });
}
module.exports = FilterActions;