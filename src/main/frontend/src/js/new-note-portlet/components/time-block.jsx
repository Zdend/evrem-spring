import React from 'react';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import NewNoteActions from '../actions/new-note-actions';
import ValidationService from '../../services/validation-service';

export default class TimeBlock extends React.Component {

    componentDidMount() {
        let eventDateTimePicker = jQuery('#eventDateTimePicker');
        eventDateTimePicker.datetimepicker();
        eventDateTimePicker.on("dp.show", ()=> {
            jQuery("#eventDateTimeInput").focus();
        });
    }

    render() {
        let classes = cx({
            'col-sm-2': true,
            'invisible': !this.props.note.hasTime,
            'visible': this.props.note.hasTime,
            'has-error': ValidationService.hasFieldError('eventTime')
        });

        return (
            <div className={classes}>
                <label htmlFor="eventDateTimeInput">Event date</label>

                <div className="form-group">
                    <div className="input-group date" id="eventDateTimePicker">
                        <input type="text" className="form-control" id="eventDateTimeInput"
                               data-date-format={GlobalConstants.DATETIME_FORMAT}
                               onBlur={this.eventTimeChange}
                               defaultValue={this.props.note.eventTime}
                            />
                              <span className="input-group-btn">
                                  <button className="btn btn-primary" type="button"><FontAwesome name="clock-o"/>
                                  </button>
                              </span>
                    </div>
                </div>
            </div>

        );
    }

    eventTimeChange(e) {
        let time = e.target.value;
        NewNoteActions.changeNoteValue({eventTime: time});
    }
}
