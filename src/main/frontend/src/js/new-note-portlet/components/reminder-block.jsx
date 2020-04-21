import React from 'react';
import cx from 'classnames';
import NewNoteActions from '../actions/new-note-actions';
import ValidationService from '../../services/validation-service';

export default class ReminderBlock extends React.Component{

    componentDidMount() {
        let reminderDatePicker = jQuery('#reminderDateTimePicker');
        reminderDatePicker.datetimepicker();
        reminderDatePicker.on("dp.show", () => {
            jQuery("#reminderDateTimeInput").focus();
        });
    }

    render() {
        let classes = cx({
            'col-sm-2': true,
            'invisible': !this.props.note.hasReminder,
            'visible': this.props.note.hasReminder,
            'control-group': true,
            'has-error': ValidationService.hasFieldError('remindDate')
        });
        return (
            <div className={classes}>
                <label htmlFor="reminderDateTimeInput">Remind date</label>

                <div className="form-group">
                    <div className="input-group date" id="reminderDateTimePicker">
                        <input type="text" className="form-control" id="reminderDateTimeInput"
                               data-date-format={GlobalConstants.DATETIME_FORMAT}
                               onBlur={this.remindTimeChange}
                               defaultValue={this.props.remindInfo.remindDate}
                            />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button"><FontAwesome name="bell-o"/></button>
                        </span>
                    </div>
                </div>

            </div>
        );
    }

    remindTimeChange(e) {
        let time = e.target.value;
        NewNoteActions.changeNoteValue({remindDate:time},'remindInfo');
    }
}
ReminderBlock.defaultProps = {remindInfo: {}};