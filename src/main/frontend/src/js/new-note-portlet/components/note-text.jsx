import React from 'react';
import cx from 'classnames';
import NewNoteActions from '../actions/new-note-actions';
import ValidationService from'../../services/validation-service';
import AutoTextarea from '../../shared-components/react-textarea-autosize';

export default class NoteText extends React.Component{
	 constructor(props){
		 super(props);
		 this.state = {
			 value: props.value,
			 keys: {}
		 };
	 }

	componentWillReceiveProps(nextProps){
		let self = this;
		this.setState({
			  value: nextProps.value
		},self.refs.autoTextArea.recalculateSize);
		
	}
	
	render(){
		let classes = cx({
			'col-sm-4': true,
            'form-control': true
		});
        let wrapperClasses = cx({
            'form-group': true,
            'has-error': ValidationService.hasFieldError('noteText')
        });
		let placeholder = this.props.filter ? 'Filter saved notes..' : 'New note..';
		return (
            <div className={wrapperClasses}>
                <AutoTextarea
                    ref="autoTextArea"
                    id="new-note-input"
                    placeholder={placeholder}
                    onBlur={this.updateText}
                    onChange={this.onChange.bind(this)}
					onKeyDown={this.keyDown.bind(this)} onKeyUp={this.keyUp.bind(this)}
                    value={this.state.value}
                    className={classes}
                    rows={1}></AutoTextarea>
            </div>
		);
	}
	
	updateText(e){
		let text = e.target.value;
		NewNoteActions.changeNoteValue({text:text});
	}
	
	onChange(e) {
        let value = e.target.value;
	    this.setState({
	      value: value
	    },()=>{
            if(this.props.filter){
                NewNoteActions.changeNoteValue({text:value});
            }
        });
	 }

	keyDown(e){
		let keys = this.state.keys;
		keys[e.keyCode]= true;
		this.setState(keys, this.checkCallbacks.bind(this));
	}
	keyUp(e){
		let keys = this.state.keys;
		delete keys[e.keyCode];
		this.setState(keys);
	}

	checkCallbacks(){
		let keys = this.state.keys;
		if((keys[10] || keys[13]) && keys[17]){
			NewNoteActions.changeNoteValue({text:this.state.value});
			NewNoteActions.saveNote();
		}
	}
	
	
}