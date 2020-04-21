import styles from '../../css/shared-components.css';
var Icon = FontAwesome.Icon;

var InfoMessage = React.createClass({

    render: function () {

        var classes = cx({
            'evrem-message': true,
            'hover-transition': true,
            'visible': this.props.message,
            'invisible': !this.props.message
        });

        var messageText = this.props.message || '';

        return (
            <div className={classes}>
                <div className="message-container info-container">
                    <div className="message-dismiss" onClick={this.dismissMessage}>
                        <FontAwesome name="close" />
                    </div>
					{messageText}
                </div>
            </div>
        );
    },

    dismissMessage: function () {
        this.props.clearMessageHandler();
    }


});

module.exports = InfoMessage;