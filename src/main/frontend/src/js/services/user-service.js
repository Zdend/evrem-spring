import StorageService from '../services/storage-service';


function createJSONAjax(url, data, type) {
    let restPath = StorageService.getContextPath() + '/rest';
    let csrf = StorageService.getCSRF();
    let ajaxType = type || 'POST';
    let ajaxObject = {
        type: ajaxType,
        url: restPath + url
    };
    ajaxObject.headers = ajaxObject.headers || {};
    ajaxObject.headers[csrf.header] = csrf.token;
    if (data) {
        ajaxObject.data = JSON.stringify(data);
    }
    if (ajaxType.toUpperCase() === 'POST') {
        ajaxObject.contentType = 'application/json; charset=utf-8';
        ajaxObject.dataType = 'json';
    }
    return Q(jQuery.ajax(ajaxObject));
}

export default{
    //login(userName, password){
    //    console.log("Logging..");
    //    return createJSONAjax('/login',{ username: userName , password: password });
    //},
    //logout(){
    //    console.log("Logout..");
    //    return createJSONAjax('/logout');
    //},
    signup(user){
        console.log("Creating user account..");
        return createJSONAjax('/user/save', user);
    },
    loadTimeZones(){
        console.log("Getting timezones..");
        return createJSONAjax('/resource/timezones', undefined, 'GET');
    }
}