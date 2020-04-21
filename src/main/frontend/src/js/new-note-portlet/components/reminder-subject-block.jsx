import React from 'react';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import NewNoteActions from '../actions/new-note-actions';
import ValidationService from '../../services/validation-service';
export default class ReminderSubjectBlock extends React.Component{

    render() {
        let classes = cx({
            'col-sm-2': true,
            'invisible': !this.props.note.hasReminder,
            'visible': this.props.note.hasReminder
        });

        return (
            <div className={classes}>
                <label htmlFor="reminderSubjectInput">Email subject</label>

                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" id="reminderSubjectInput"
                               onBlur={this.remindSubjectChange}
                               onChange={this._onSubjectChange}
                               value={this.props.remindSubject}/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.clickSubjectButton}>
                                <FontAwesome name="pencil"/></button>
                        </span>
                    </div>
                </div>

            </div>
        );
    }

    remindSubjectChange (e) {
        var subject = e.target.value;
        NewNoteActions.changeNoteValue({remindSubject:subject}, 'remindInfo');
    }

    clickSubjectButton () {
        jQuery("#reminderSubjectInput").focus();
    }
}
ReminderSubjectBlock.defaultProps = {remindInfo: {}};

