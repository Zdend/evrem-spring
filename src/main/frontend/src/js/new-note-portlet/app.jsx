import React from 'react';
import styles from '../../css/new-note.css';
import NewNoteActions from './actions/new-note-actions';
import NoteContainer from './components/note-container.jsx';

export default class App extends React.Component{
    constructor(){
        super();
        NewNoteActions.registerCodelists();
    }

    render(){
        return <NoteContainer />;
    }
}


