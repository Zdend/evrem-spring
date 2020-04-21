import React from 'react';
import NoteText from './note-text.jsx';
import OptionButtons from './option-buttons.jsx';
import NewNoteStore from '../stores/new-note-store';
import NewNoteActions from '../actions/new-note-actions';
import TimeBlock from './time-block.jsx';
import ReminderBlock from './reminder-block.jsx';
import ReminderSubjectBlock from './reminder-subject-block.jsx';
import RepeatBlock from './repeat-block.jsx';
import ColorBlock from './color-block.jsx';
import IsdoneBlock from './isdone-block.jsx';
import IconBlock from './icon-block.jsx';
import ValidationMessage from './validation-message.jsx';
import InfoMessage from '../../shared-components/info-message.jsx';

function getNoteState() {
    return {
        note: NewNoteStore.getFilter().isActive ? NewNoteStore.getFilter().note : NewNoteStore.getNote(),
        colors: NewNoteStore.getColors(),
        periods: NewNoteStore.getPeriods(),
        icons: NewNoteStore.getIcons(),
        hasDeletedNote: NewNoteStore.getHasDeletedNote(),
        infoMessage: NewNoteStore.getInfoMessage(),
        pendingChanges: NewNoteStore.getPendingChanges(),
        noteOptions: NewNoteStore.getNoteOptions(),
        filter: NewNoteStore.getFilter()
    };
}

export default class NoteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = getNoteState();
    }

    componentDidMount() {
        NewNoteStore.addChangeListener(this.onChange, this);
    }

    componentWillUnmount() {
        NewNoteStore.removeChangeListener(this.onChange, this);
    }

    render() {
        return (
            <div id="new-note-container" onKeyDown={this.saveNoteIfCtrlEnter}>
                <ValidationMessage validation={this.state.validation}/>
                <InfoMessage message={this.state.infoMessage} clearMessageHandler={NewNoteActions.clearInfoMessage}/>

                <div className="row">
                    <div className="col-sm-4"><NoteText value={this.state.note.text} filter={this.state.filter.isActive}/></div>
                    <div className="col-sm-8">
                        <OptionButtons note={this.state.note} hasDeletedNote={this.state.hasDeletedNote}
                                       pendingChanges={this.state.pendingChanges} noteOptions={this.state.noteOptions}
                                       filter={this.state.filter}/>
                    </div>
                </div>
                <div className="cleaner"></div>
                <hr />

                <div className="block-container row">
                    <IsdoneBlock note={this.state.note}/>
                    <TimeBlock note={this.state.note}/>
                    <ReminderBlock note={this.state.note}/>
                    <ReminderSubjectBlock note={this.state.note}/>
                    <ColorBlock note={this.state.note} colors={this.state.colors}/>
                    <RepeatBlock note={this.state.note} periods={this.state.periods}/>
                    <IconBlock hasIcon={this.state.note.hasIcon} icon={this.state.note.icon} icons={this.state.icons}/>
                </div>
                <div className="cleaner"></div>
            </div>
        );
    }

    onChange() {
        this.setState(getNoteState());
    }

}
