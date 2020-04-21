import AppDispatcher from '../../core/dispatcher';
import UpcomingConstants from '../constants/upcoming-constants';
import NoteService from '../../services/note-service';
import StorageService from '../../services/storage-service';
import NewNoteStore from '../../new-note-portlet/stores/new-note-store';

var UpcomingActions = {

  registerNotes: function() {
      AppDispatcher.dispatch({
          actionType: UpcomingConstants.REGISTER_NOTES,
		  filter: NewNoteStore.getFilter()
      });
  },
  editNote: function(noteId) {
	  AppDispatcher.dispatch({
		  actionType: UpcomingConstants.EDIT_NOTE,
          noteId: noteId
	  });
  },
  checkNote: function(noteId) {
	  let promise = NoteService.checkNote(noteId);

	  promise.then((result)=>{
          StorageService.saveNote(result.payload);

		  dispatchChangeToOtherStores();

	  },()=>{
		  console.log('Error during checking note. Check your internet connection.');
	  });

  },
  checkTodoNote: function(todoNoteId) {
	  let promise = NoteService.checkTodoNote(todoNoteId);

	  promise.then((result)=>{
		  StorageService.saveNote(result.payload);

		  dispatchChangeToOtherStores();
	  },()=>{
		  console.log('Error during checking todo note. Check your internet connection.');
	  });


  },
  moreEvents: function() {
	  AppDispatcher.dispatch({
		  actionType: UpcomingConstants.MORE_EVENTS
	  });
  }


 

};
function dispatchChangeToOtherStores(){
	AppDispatcher.dispatch({
		actionType: UpcomingConstants.REGISTER_NOTES
	});
}
module.exports = UpcomingActions;