import ValidationService from './validation-service';
import StorageService from '../services/storage-service';

function createJSONAjax(url, data){
    let restPath = StorageService.getContextPath() + '/rest';
    let csrf = StorageService.getCSRF();

    let ajaxObject = {
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        url: restPath + url
    };
    ajaxObject.headers = ajaxObject.headers || {};
    ajaxObject.headers[csrf.header] = csrf.token;
    if(data){
        ajaxObject.data = JSON.stringify(data);
    }
    return Q(jQuery.ajax(ajaxObject));
}

export default{
    saveNote(note){
        console.log("Starting saving note..");
        return createJSONAjax('/note/save', note);
    },
    checkNote(noteId){
        console.log("Starting checking note..");
        return createJSONAjax('/note/check', noteId);
    },
    checkTodoNote(todoNoteId){
        console.log("Starting checking todo note..");
        return createJSONAjax('/note/todonote/check', todoNoteId);
    },
    deleteNote(noteId){
        console.log('Starting deleting note..');
        return createJSONAjax('/note/delete', noteId);
    },
    saveCoordinates(coordinates){
        console.log('Starting saving coordinates..');
        return createJSONAjax('/note/griditem/save', coordinates);
    },
    emptyTrash(){
        console.log('Starting emptying trash..');
        return createJSONAjax('/note/all/deletepermanently');
    },
    exportAll(){
        console.log('Starting to export all notes..');
        return createJSONAjax('/note/all/export');
    }
}