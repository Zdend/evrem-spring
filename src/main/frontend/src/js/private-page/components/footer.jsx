class Footer extends React.Component{
    render() {
        return (
            <div id="footer">
                <hr />
                <div id="left-footer-container">
                    <p className="powered-by">
                        <a href="/contact">Contact</a>
                        <a href="/about">About</a>
                        <a href="/help">Help</a>
                    </p>

                    <div>Made by ZV | Copyright 2014 | All rights reserved</div>
                </div>
                <div id="right-footer-container">
                    <FontAwesome name="facebook" />
                    <FontAwesome name="twitter" />
                    <FontAwesome name="google-plus" />
                </div>
            </div>
        );
    }
}

module.exports = Footer;