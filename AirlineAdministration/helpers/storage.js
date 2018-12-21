const storage = function () {
    const appKey = 'kid_HkihZuT1N';
    const appSecret = '655b9b3f859648c5aced840c9add8647';
    const masterSecret = '3eb7ac5764fc4c149db8017ab58f1ffe';

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
        });

        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = function(){
        deleteData('authToken');
        deleteData('userInfo');
    };

    return {
        saveData,
        getData,
        deleteData,
        appKey,
        appSecret,
        masterSecret,
        saveUser,
        deleteUser
    };
}();