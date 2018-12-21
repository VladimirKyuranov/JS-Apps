const storage = (function () {
    const appKey = "kid_HyTkc3rkE";
    const appSecret = "949e09335ea04627a6edf573db8ff521";
    
    const saveData = function (key, value) {
        localStorage.setItem(appKey + key, JSON.stringify(value));
    };
    
    const getData = function (key) {
      return JSON.parse(localStorage.getItem(appKey + key));
    };
    
    const deleteData = function (key) {
        localStorage.removeItem(appKey + key);
    };
    
    const saveUser = function (data) {
        saveData("userInfo", {
            id: data._id,
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name
        });
    
        saveData("authToken", data._kmd.authtoken);
    };
    
    const deleteUser = function () {
        deleteData("userInfo");
        deleteData("authToken");
    };
    
    return {
        appKey,
        appSecret,
        saveData,
        getData,
        deleteData,
        saveUser,
        deleteUser
    };
})();