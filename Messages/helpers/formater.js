const formater = (function () {
    const formatDate = function (date) {
        date = new Date(date);
        if (Number.isNaN(date.getDate()))
            return '';
        return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
            "." + date.getFullYear() + ' ' + date.getHours() + ':' +
            padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());
    
        function padZeros(num) {
            return ('0' + num).slice(-2);
        }
    
    };
    
    const formatName = function (username, name) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    
    };
    
    return {
        formatDate,
        formatName
    }
}());