import {locations_view_many_url} from '../../api_config'
const namespaced = true;

const state = {
    location_list: []
}

const getters = {
    getLocationById: (state) => (id) => {
        return state.location_list.find( (item) => item.id === id);
    }
}

const mutations ={
    addLocations(state, new_locations) {
        if(new_locations !== undefined && new_locations !== null)
            state.location_list = new_locations;
    }
}

const actions = {
    async viewMany(context) {
        var url = locations_view_many_url;
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        // handle response
        switch(result.status) {
            case 200: {
                const locations = await result.json();
                context.commit('addLocations', locations);
                return locations;
            }

            case 204: {
                return [];
            }
            default: throw Error(result.status + ': ' + result.statusText);
        } 
    }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}
