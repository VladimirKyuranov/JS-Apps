const storage = function () {
    const appKey = 'kid_HkVdltQeE';
    const appSecret = 'ba318a87432744bcba9445bd5df9fe55';
    const masterSecret = '5f03b2f9424f49f0a05eea5cfa65ad49';

    const saveData = function (key, value) {
        localStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function (key) {
        return JSON.parse(localStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        localStorage.removeItem(appKey + key);
    };

    const saveUser = function(data){
        saveData('userInfo', {
            id: data._id,
            username: data.username,
            name: data.name
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        getData,
        appKey,
        appSecret,
        masterSecret,
        saveUser,
        deleteUser
    };
}();