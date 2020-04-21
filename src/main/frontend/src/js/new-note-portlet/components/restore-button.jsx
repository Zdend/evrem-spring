import React from 'react';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import NewNoteActions from '../actions/new-note-actions';

export default class RestoreButton extends React.Component {
    render() {
        let classes = cx({
            'restore-btn': true,
            'hover-transition': true,
            'pointer-cursor': true
        });

        return (
            <FontAwesome name="undo" className={classes} onClick={this.restoreNote}/>
        );
    }

    restoreNote() {
        NewNoteActions.restoreNote();
    }
}