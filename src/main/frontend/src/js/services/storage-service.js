const NOTES_KEY = 'notes';
const COLORS_KEY = 'colors';
const PERIODS_KEY = 'periods';
const ICONS_KEY = 'icons';
const CONTEXT_PATH_KEY = 'contextPath';
const CSRF_KEY = 'csrf';
const TIMEZONES_KEY = 'timezones';

export default class StorageService{
    static getNoteFromStorageById(noteId){
        var notes = Amplify(NOTES_KEY);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].noteId === noteId) {
                return notes[i];
            }
        }
    }
    static getAllNotes(){
        return Amplify(NOTES_KEY);
    }
    static getNotesByFilter(filter){
        let notes = Amplify(NOTES_KEY);
        if(!filter || !filter.isActive){
            return notes;
        }
        let checkIfInvalid = function(filterToggle, noteToggle, filterValue, noteValue){
            if(filterToggle && (!noteToggle || (filterValue !== noteValue && filterValue))){
                return true;
            }
            return false;
        };
        let checkIfInvalidDate = function(filterToggle, noteToggle, filterValue, noteValue){
            let filterDate, noteDate;
            if(filterToggle && filterValue){
                filterDate = moment(filterValue, GlobalConstants.DATETIME_FORMAT, true).format('YYYYMMDD');
                noteDate = moment(noteValue, GlobalConstants.DATETIME_FORMAT, true).format('YYYYMMDD');
            }
            if(filterToggle && (!noteToggle || (filterDate !== noteDate && filterValue))){
                return true;
            }
            return false;
        };
        let checkIfUnequal = function(filterValue, noteValue){
            if(filterValue && (filterValue !== noteValue)){
                return true;
            }
            return false;
        };

        let filterNote = filter.note;
        let filteredNotes = [];
        for (let i = 0; i < notes.length; i++) {
            let note = notes[i];


            if(filterNote.hasColor && note.color !== filterNote.color){
                continue;
            }
            if(filterNote.text && note.text.toLowerCase().indexOf(filterNote.text.toLowerCase()) === -1){
                continue;
            }
            if(checkIfInvalid(filterNote.hasIcon, note.hasIcon,filterNote.icon, note.icon)){
                continue;
            }
            if(filterNote.hasCheck && (!note.hasCheck || (filterNote.isDone !== note.isDone))){
                continue;
            }
            if(checkIfInvalidDate(filterNote.hasTime, note.hasTime,filterNote.eventTime, note.eventTime)){
                continue;
            }
            let remindDateFilter = filterNote.remindInfo?filterNote.remindInfo.remindDate:undefined;
            let remindDateNote = note.remindInfo?note.remindInfo.remindDate:undefined;
            if(checkIfInvalidDate(filterNote.hasReminder, note.hasReminder,remindDateFilter, remindDateNote)){
                continue;
            }

            let remindSubjectFilter = filterNote.remindInfo?filterNote.remindInfo.remindSubject:undefined;
            let remindSubjectNote = note.remindInfo?note.remindInfo.remindSubject:undefined;
            if(checkIfInvalid(filterNote.hasReminder, note.hasReminder,remindSubjectFilter, remindSubjectNote)){
                continue;
            }
            if(checkIfUnequal(filterNote.hasTodo, note.hasTodo)){
                continue;
            }
            if(checkIfUnequal(filterNote.hasWall, note.hasWall)){
                continue;
            }
            if(checkIfInvalid(filterNote.hasRepeat, note.hasRepeat,filterNote.period, note.period)){
                continue;
            }

            filteredNotes.push(notes[i]);
        }
        return filteredNotes;

    }
    static getPeriods(){
        return Amplify(PERIODS_KEY);
    }
    static getIcons(){
        return Amplify(ICONS_KEY);
    }
    static getColors(){
        return Amplify(COLORS_KEY);
    }
    static getContextPath(){
        return Amplify(CONTEXT_PATH_KEY);
    }
    static getCSRF(){
        return Amplify(CSRF_KEY);
    }
    static getTimezones(){
        return Amplify(TIMEZONES_KEY);
    }
    static getNotDeletedNotes(filter){
        let notes = this.getNotesByFilter(filter);
        let notDeletedNotes = [];
        for (let i = 0; i < notes.length; i++) {
            if (!notes[i].isDeleted) {
                notDeletedNotes.push(notes[i]);
            }
        }
        return notDeletedNotes;
    }
    static getNotDeletedWallNotes(filter){
        let notes = this.getNotesByFilter(filter);
        let notDeletedWallNotes = [];
        for (let i = 0; i < notes.length; i++) {
            if (!notes[i].isDeleted && notes[i].hasWall) {
                notDeletedWallNotes.push(notes[i]);
            }
        }
        return notDeletedWallNotes;
    }
    static saveNote(note){
        let notes = Amplify(NOTES_KEY);
        var isStored = false;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].noteId === note.noteId) {
                notes[i] = note;
                isStored = true;
            }
        }
        if(!isStored){
            notes.push(note);
        }
        this.saveNotes(notes);
    }
    static saveNotes(notes){
        Amplify(NOTES_KEY, notes);
    }
    static saveMultipleNotes(notes){
        for (let i = 0; i < notes.length; i++) {
            this.saveNote(notes[i]);
        }
    }
    static removeNotesPermanently(noteIds){
        let notes = this.getAllNotes();
        for(let i = 0; i < noteIds.length; i++){
            for(let j = 0; j < notes.length; j++){
                if(noteIds[i] === notes[j].noteId){
                    notes.splice(j,1);
                }
            }
        }
        this.saveNotes(notes);
    }

    static saveColors(colors){
        Amplify(COLORS_KEY, colors);
    }
    static savePeriods(periods){
        Amplify(PERIODS_KEY, periods);
    }
    static saveIcons(icons){
        Amplify(ICONS_KEY, icons);
    }
    static saveContextPath(contextPath){
        Amplify(CONTEXT_PATH_KEY, contextPath);
    }
    static saveCSRF(csrf){
        Amplify(CSRF_KEY, csrf);
    }
    static saveTimezones(timezones){
        Amplify(TIMEZONES_KEY, timezones);
    }
    static getColorByName(name){
        let colors = Amplify(COLORS_KEY);
        for(let i = 0; i < colors.length; i++){
            if(colors[i].name === name){
                return colors[i].colorWithHash;
            }
        }
    }
    static getIconByName(name){
        let icons = Amplify(ICONS_KEY);
        for(let i = 0; i < icons.length; i++){
            if(icons[i].name === name){
                return icons[i];
            }
        }
    }
    static getPeriodByName(name){
        let periods = Amplify(PERIODS_KEY);
        for(let i = 0; i < periods.length; i++){
            if(periods[i].name === name){
                return periods[i];
            }
        }
    }
}