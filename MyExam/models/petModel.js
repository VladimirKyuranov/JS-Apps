const petModel = (function () {
    let petUrl = `appdata/${storage.appKey}/pets`;
    
    const create = function (params) {
        let petsCount = 0;
        let pet = {
            name: params.name,
            description: params.description,
            imageUrl: params.imageURL,
            category: params.category,
            creator: params.creator,
            petsCount: petsCount
        };
        console.log(pet);
        return requester.post(petUrl, pet);
    };
    
    const getAllPets = function () {
        return requester.get(petUrl);
    };
    
    const getPetById = function (id) {
        return requester.get(petUrl + '/' + id);
    };
    
    const remove = function (id) {
        return requester.del(petUrl + '/' + id);
    };
    
    const edit = async function (id, params) {
        let pet;
        await getPetById(id).then(function (response) {
            pet = response;
            pet.description = params.description;
            return requester.put(petUrl + '/' + id, pet);
        });
    };
    
    const postPet = async function (id, params) {
        let pet;
        await getPetById(id).then(function (response) {
            pet = response;
            pet.petsCount++;
            return requester.put(petUrl + '/' + id, pet);
        });
    };
    
    return {
        create,
        getAllPets,
        remove,
        getPetById,
        edit,
        postPet
    }
}());