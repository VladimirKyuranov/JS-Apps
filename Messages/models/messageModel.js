const messageModel = (function () {
    let messageUrl = `appdata/${storage.appKey}/messages`;
    
    const send = function (params) {
        let name = storage.getData("userInfo").name;
        let username = storage.getData("userInfo").username;
        
        let date = formater.formatDate(Date());
        
        let message = {
            sender_username: username,
            sender_name: name,
            recipient_username: params.recipient,
            text: params.text,
            date: date
        };
    
        return requester.post(messageUrl, message);
    };
    
    const getAllMessages = function () {
        return requester.get(messageUrl);
    };
    
    const remove = function (id) {
        return requester.del(messageUrl + '/' + id);
    };
    
    return {
        send,
        getAllMessages,
        remove
    }
}());