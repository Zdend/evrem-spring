import {Link} from 'react-router';
import headerLogo from '../../../images/evrem_header_logo.png';
let DropdownButton = ReactBootstrap.DropdownButton;
let MenuItem = ReactBootstrap.MenuItem;
import StorageService from '../../services/storage-service';
import UserService from '../../services/user-service';

var Header = React.createClass({
    render: function () {

        let contextPath = StorageService.getContextPath();
        let csrf = StorageService.getCSRF();
        return (
            <div id="heading">
                <h1 className="site-title">
                    <Link to="/home" title="Evrem home">
                        <img alt="evrem" height="47" width="131" src={headerLogo}/>
                    </Link>
                </h1>


                <div className="profile-link-container">
                    <div id="profile-link-inner">
                        <FontAwesome name="user"/>
                    </div>

                    <ul className="profile-dropdown">
                        <Link to="/profile"><li>Profile</li></Link>
                        <a onClick={this.logout}><li>Log out</li></a>
                    </ul>
                </div>

                <nav id="navigation">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/wall">Wall</Link></li>
                        <li><Link to="/filter">Filter</Link></li>
                    </ul>
                </nav>
                <hr />
                <form action={contextPath+'/logout'} method="post" className="hide">
                    <input type="hidden" name={csrf.name} value={csrf.token} />
                    <button type="submit" ref="logoutBtn" />
                </form>
            </div>

        );
    },

    logout: function(){
      jQuery(this.refs.logoutBtn.getDOMNode()).click();
    }
});
module.exports = Header;