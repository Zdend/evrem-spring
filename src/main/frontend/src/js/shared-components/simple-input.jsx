
var Icon = FontAwesome.Icon;

var InfoMessage = React.createClass({
	
	render: function(){
		
		var classesWrapperObj = {
				'control-group': true
				}
		classesWrapperObj[this.props.bsStyle] = true;
		var classesWrapper = cx(classesWrapperObj);
		
		return(
			<div className={classesWrapper}>
				<label className="control-label" htmlFor="inputError">Input with error</label>
				<div className="controls">
				  <input type="text" id="inputError" />
				  <span className="help-inline">Please correct the error</span>
				</div>
			</div>
		
		);		
	}
	
});

module.exports = InfoMessage;