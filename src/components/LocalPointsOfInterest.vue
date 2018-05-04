<template>
    <div>
        <table id='search-results-table' class='table table-bordered table-light' v-if="locations.length !== 0">
            <thead>
                <tr>
                    <th scope='col'> Name </th>
                    <th scope='col'> Address </th>
                    <th scope='col'> Accessibility Votes </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in locations" :key="row.id">
                    <td> <router-link :to="{name: 'LocationDetails', params: {locationid: row.id}}"> {{ row.name }} </router-link> </td>
                    <td> 
                        {{ row.address.number }} <br />
                        {{ row.address.street }} <br />
                        {{ row.address.city }} <br />
                        {{ row.address.postcode }} <br />
                    </td>
                    <td> {{ row.comments | calculateVotes }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "TheLandingPage",
    props: {
     /*   location: {
            type: Object,
            required: true
        },
        distance: {
            type: Number,
            required: true
        }*/
    },
    
    data () {
        return {

        }
    },

    created () {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log('Current Position', pos);
        }, err => console.erro(err));

        this.$store.dispatch('locations/viewMany').then(locations => {
            console.log('locations returned', locations);
        }, err => {
            console.error('error fetching locations', err);
        })
    },

    computed: {
        locations () {
            //  return this.$store.state.locations.location_list;
            const testdata = [
                {
                    id: 'hash1',
                    name: 'Didcot Theatre',
                    address: {
                        number: 1,
                        street: 'Downs Avenue',
                        city: 'Didcot',
                        postcode: 'OX11 7KJ'
                    },
                    comments: [
                        {
                            fs_id: 'hash1',
                            id: 1,
                            text: 'What a great place, very accessible',
                            accessible: true,
                            username: 'chris934'
                        },
                        {
                            fs_id: 'hash1',
                            id: 2,
                            text: 'Lovelly staff, my son really enjoyed his time here.',
                            accessible: true,
                            username: 'mn829'
                        }
                    ]
                },
                {
                    id: 'hash2',
                    name: 'Harwell Coffee',
                    address: {
                        number: '10',
                        street: 'Fermi Avenue',
                        city: 'Harwell',
                        postcode: 'OX11 7kK'
                    },
                    comments: [
                        {
                            fs_id: 'hash2',
                            id: 3,
                            text: 'The disabled toilets was not spacious enough.',
                            accessible: false,
                            username: 'mt299'
                        },
                        {
                            fs_id: 'hash2',
                            id: 4,
                            text: 'Very friendly staff',
                            accessible: true,
                            username: 'mt129'
                        },
                        {
                            fs_id: 'hash2',
                            id: 5,
                            text: 'Found it difficult to navigate inside the shop',
                            accessible: false,
                            username: 'kn820'
                        }
                    ]

                }
            ]
            this.$store.commit('locations/addLocations', testdata);
            return testdata;
        }
    },

    filters: {
        calculateVotes: function(arr) {
            var total_votes = 0;
            arr.forEach( el => total_votes += (el.accessible ? 1 : -1));
            return total_votes;
        }
    }
}
</script>
<style scoped lang="scss">

</style>