var AppDispatcher = require('../../core/dispatcher');
var LoginConstants = require('../constants/login-constants');
import LoginStore from '../stores/login-store';
import UserService from '../../services/user-service';
import StorageService from '../../services/storage-service';

var LoginActions = {

    registerInitialData: function (initialData) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.REGISTER_INITIAL_DATA,
            initialData: initialData
        });
    },
    registerCsrfToken: function (csrf) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.REGISTER_CSRF_TOKEN,
            csrf: csrf
        });
    },
    userEmailChange: function (email) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.USER_EMAIL_CHANGE,
            email: email
        });
    },
    userPasswordChange: function (password) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.USER_PASSWORD_CHANGE,
            password: password
        });
    },
    userRememberMeChange: function (rememberMe) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.USER_REMEMBERME_CHANGE,
            rememberMe: rememberMe
        });
    },
    newUserEmailChange: function (email) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.NEWUSER_EMAIL_CHANGE,
            email: email
        });
    },
    newUserPassword1Change: function (password1) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.NEWUSER_PASSWORD1_CHANGE,
            password1: password1
        });
    },
    newUserPassword2Change: function (password2) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.NEWUSER_PASSWORD2_CHANGE,
            password2: password2
        });
    },
    evremLogIn: function () {
        let user = LoginStore.getUser();
        let promise = UserService.login(user.email, user.password);

        promise.then((result)=> {
            console.log('User has been logged in.');

            //dispatchChangeToOtherStores();
        }, ()=> {
            console.log('Error during logging in disposal, check your internet connection.');
        });

    },
    signUp: function () {
        let user = LoginStore.getNewUser();
        let promise = UserService.signup(user);

        promise.then((result)=> {
            if(result.payload){
                console.log('User has been created.');
            }

            //AppDispatcher.dispatch({
            //    actionType: LoginConstants.EVREM_SIGN_UP
            //});
        }, ()=> {
            console.log('Error during creating user, check your internet connection.');
        });


    },
    setCaptchaToken: function (token) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.SET_CAPTCHA_TOKEN,
            token: token
        });
    },
    loadTimeZones: function () {
        let timezones = StorageService.getTimezones();
        if(timezones && timezones.length > 10){
            AppDispatcher.dispatch({
                actionType: LoginConstants.LOAD_TIME_ZONES
            });
            return;
        }
        let promise = UserService.loadTimeZones();

        promise.then((result)=> {
            console.log('Timezones has been fetched.');
            StorageService.saveTimezones(result.payload);
            AppDispatcher.dispatch({
                actionType: LoginConstants.LOAD_TIME_ZONES
            });
        }, ()=> {
            console.log('Error during retrieving timezones, check your internet connection.');
        });



    },
    timeZoneChange: function (timeZoneId) {
        AppDispatcher.dispatch({
            actionType: LoginConstants.TIME_ZONE_CHANGE,
            timeZoneId: timeZoneId
        });
    },


};

module.exports = LoginActions;