import React from 'react';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import NewNoteActions from '../actions/new-note-actions';
import ValidationService from '../../services/validation-service';

export default class ValidationMessage extends React.Component {

    render() {
        var classes = cx({
            'nn-message-container': true,
            'nn-validation-container': true,
            'hover-transition': true,
            'invisible': !ValidationService.hasError(),
            'visible': ValidationService.hasError()
        });

        var messages = ValidationService.getMessages();

        return (
            <div className={classes}>
                <div className="nn-message-dismiss" onClick={this.dismissMessage.bind(this)}><FontAwesome name="close"/></div>
                <div>
                    <ul>
                        {
                            messages.map(function (msg, i) {
                                return (<li key={i}>{msg}</li>);
                            })}
                    </ul>
                </div>
            </div>
        );
    }

    dismissMessage() {
        ValidationService.clearResult();
        this.forceUpdate();
    }
}
