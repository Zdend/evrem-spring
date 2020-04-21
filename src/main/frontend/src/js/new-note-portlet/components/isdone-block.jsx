import React from 'react';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';

import NewNoteActions from '../actions/new-note-actions';
import ValidationService from '../../services/validation-service';

export default class IsdoneBlock extends React.Component{

    render() {
        let classes = cx({
            'col-sm-2': true,
            'invisible': !this.props.note.hasCheck,
            'visible': this.props.note.hasCheck
        });
        let classesInput = cx({
            'form-control': true,
            'isdone-checked': this.props.note.isDone,
            'isdone-unchecked': !this.props.note.isDone
        });

        return (
            <div className={classes}>
                <label htmlFor="isdone-input">Is task finished</label>

                <div className="input-group">
                    <input type='text' className={classesInput} id="isdone-input"
                           value={this.props.note.isDone?'Task is finished! :-)':'Not done yet :-('}
                           onClick={this.onClick}
                           readOnly="true"/>
                  <span className="input-group-btn" onClick={this.onClick}>
                      <button className="btn btn-primary" type="button"><FontAwesome name="check"/></button>
                  </span>
                </div>

            </div>
        );
    }

    onClick() {
        NewNoteActions.checkNote();
    }

}

