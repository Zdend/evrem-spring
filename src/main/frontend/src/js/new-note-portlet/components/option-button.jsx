import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import NewNoteActions from '../actions/new-note-actions';

export default class OptionButton extends React.Component {

    render() {
        let classes = cx({
            'active': this.props.isToggle,
            'hover-transition': true,
            'pointer-cursor': true
        });

        return (
            <OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>{this.props.msg}</Tooltip>}>
                <FontAwesome name={this.props.icon} className={classes} onClick={this.toggleOptionButton.bind(this)}/>
            </OverlayTrigger>
        );
    }

    toggleOptionButton() {
        NewNoteActions.toggleOption(this.props.btnType);
        if (this.props.afterToggleAction) {
            this.props.afterToggleAction();
        }
    }


}
