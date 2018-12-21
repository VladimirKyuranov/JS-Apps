const flightModel = (function () {
    let flightUrl = `appdata/${storage.appKey}/flights`;
    
    const create = function (params) {
        let flight = {
            destination: params.destination,
            origin: params.origin,
            departureDate: params.departureDate,
            departureTime: params.departureTime,
            seats: params.seats,
            cost: params.cost,
            image: params.img,
            isPublished: !!params.public
        };
        
        return requester.post(flightUrl, flight);
    };
    
    const flights = function (onlyPublic) {
        let url = flightUrl;
        
        if (onlyPublic){
            url += '?query={"isPublished":true}';
        }
        
        return requester.get(url);
    };
    
    const details = function (id) {
        let url = flightUrl + "/" + id;
        return requester.get(url);
    };
    
    return {
        create,
        flights,
        details
    }
}());