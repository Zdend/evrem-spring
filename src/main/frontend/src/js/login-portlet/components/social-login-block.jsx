
var Icon = FontAwesome.Icon;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;

var SocialLoginBlock = React.createClass({
	
	render: function(){
		var btnClass = this.props.style + '-btn';
		var classesObject = {
				'hover-transition': true,
				'pointer-cursor': true
		};
		classesObject[btnClass] = true;
		
		
		
		var classes = cx(classesObject);
		return (
			<div className="lg-social-login-block">
				<FontAwesome name="facebook" />
				<FontAwesome name="twitter" />
				<FontAwesome name="google-plus" />
			</div>
		);		
	}

	
});

module.exports = SocialLoginBlock;