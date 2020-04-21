import React from 'react';
import FontAwesome from 'react-fontawesome';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import cx from 'classnames';

export default class ActionButton extends React.Component{
	
	render(){
		let btnClass = this.props.style + '-btn';
		let classesObject = {
				'hover-transition': true,
				'pointer-cursor': true
		};
		classesObject[btnClass] = true;
		
		let classes = cx(classesObject, this.props.anotherClasses);
		return (
			<OverlayTrigger placement="top" delayShow={300} overlay={<Tooltip>{this.props.msg}</Tooltip>}>
				<FontAwesome name={this.props.icon} className={classes} onClick={this.props.action} />
			</OverlayTrigger>
		);
	}

	
}
