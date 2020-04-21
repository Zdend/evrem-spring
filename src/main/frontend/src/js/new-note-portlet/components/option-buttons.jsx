import React from 'react';
import cx from 'classnames';
import OptionButton from './option-button.jsx';
import NewNoteConstants from '../constants/new-note-constants';
import NewNoteActions from '../actions/new-note-actions';
import ActionButton from './action-button.jsx';

export default class OptionButtons extends React.Component {
    render() {

        return (
            <ul className="note-buttons">
                {this.renderNoteButtons()}

                <li key={15}><OptionButton icon="filter" btnType={NewNoteConstants.BUTTON_FILTER}
                                                             isToggle={this.props.filter.isActive}
                                           afterToggleAction={NewNoteActions.filterToggle}
                                                             msg="When filter is active, note settings are used to refine results."/>
                </li>
            </ul>
        );
    }

    renderNoteButtons() {
        if(this.props.filter.isActive){
            return this.renderOptionButtons();
        }

        let restoreClasses = cx({
            'hide': !this.props.hasDeletedNote,
            'visible': this.props.hasDeletedNote
        });
        let restoreCurrentClasses = cx({
            'hide': !this.props.note.isDeleted || !this.props.note.noteId,
            'visible': this.props.note.isDeleted && this.props.note.noteId
        });
        let deleteClasses = cx({
            'hide': !this.props.note.noteId || this.props.note.isDeleted,
            'visible': this.props.note.noteId && !this.props.note.isDeleted
        });
        let saveBtnClasses = {
            'flash-highlight': this.props.pendingChanges
        };


        return (
            [
                <li key={10}><ActionButton icon="save" style="save" action={NewNoteActions.saveNote} msg="Save note"
                                           anotherClasses={saveBtnClasses}/></li>,
                this.renderOptionButtons(),
                <li key={11} className={deleteClasses}><ActionButton icon="close" style="delete"
                                                                     action={NewNoteActions.deleteNote}
                                                                     msg="Remove note"/></li>,
                <li key={12} className={restoreCurrentClasses}><ActionButton icon="undo" style="restore"
                                                                             action={NewNoteActions.restoreCurrentNote}
                                                                             msg="Restore this specific note"/></li>,
                <li key={13} className={restoreClasses}><ActionButton icon="history" style="restore"
                                                                      action={NewNoteActions.restoreNote}
                                                                      msg="Restore previously deleted note"/></li>
            ]
        );
    }

    renderOptionButtons() {
        if (!this.props.noteOptions) {
            return (
                <li key={14}><OptionButton icon="cog" btnType={NewNoteConstants.BUTTON_OPTIONS} isToggle={this.props.noteOptions}
                                  msg="Note options"/></li>
            );
        }
        let classesFirstOption = cx({'sn-first-option':!this.props.filter.isActive});
        return (
            [
                <li key={1} className={classesFirstOption}><OptionButton icon="check"
                                                                      btnType={NewNoteConstants.BUTTON_CHECK}
                                                                      isToggle={this.props.note.hasCheck}
                                                                      msg="Set this note as a check task"/>
                </li>,
                <li key={2}><OptionButton icon="clock-o" btnType={NewNoteConstants.BUTTON_TIME}
                                          isToggle={this.props.note.hasTime} msg="Event time"/></li>,
                <li key={3}><OptionButton icon="bell-o" btnType={NewNoteConstants.BUTTON_REMINDER}
                                          isToggle={this.props.note.hasReminder} msg="Email reminder"/></li>,
                <li key={4}><OptionButton icon="paint-brush" btnType={NewNoteConstants.BUTTON_COLOR}
                                          isToggle={this.props.note.hasColor} msg="Color switch"/></li>,
                <li key={5}><OptionButton icon="repeat" btnType={NewNoteConstants.BUTTON_REPEAT}
                                          isToggle={this.props.note.hasRepeat} msg="Periodically repeating"/></li>,
                <li key={6}><OptionButton icon="check-square-o" btnType={NewNoteConstants.BUTTON_TODO}
                                          isToggle={this.props.note.hasTodo}
                                          msg="Every ENTER in note text creates one task"/></li>,
                <li key={7}><OptionButton icon="th" btnType={NewNoteConstants.BUTTON_WALL}
                                          isToggle={this.props.note.hasWall}
                                          msg="Show on the wall"/></li>,
                <li key={8}><OptionButton icon="smile-o" btnType={NewNoteConstants.BUTTON_ICON}
                                          isToggle={this.props.note.hasIcon} msg="Icon for your note"/></li>,

                <li key={9}><ActionButton icon="eraser" style="clear" action={NewNoteActions.clearNote}
                                          msg="New blank note"/></li>
            ]
        );
    }

}
