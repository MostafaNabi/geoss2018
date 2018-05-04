<template>
    <div>
        <table id='search-results-table' class='table table-bordered table-light' v-if="locations.length !== 0">
            <thead>
                <tr>
                    <th scope='col'> Name </th>
                    <th scope='col'> Address </th>
                    <th scope='col'> Deaf Accessibility </th>
                    <th scope='col'> Blind Accessibility </th>
                    <th scope='col'> Mobility Accessibility </th>
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

                    <td> {{ row.deaf | calculateVotes }} </td>
                    <td> {{ row.blind | calculateVotes }} </td>
                    <td> {{ row.mobility | calculateVotes }} </td>

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
        this.$store.dispatch('locations/viewMany').then(locations => {
            console.log('locations returned', locations);
        }, err => {
            console.error('error fetching locations', err);
        })
    },

    computed: {
        locations () {
            return this.$store.state.locations.location_list;
        }
    },

    filters: {
        calculateVotes: function(arr) {
            var total_votes = 0;
            arr.forEach( el => total_votes += el.vote);
            return total_votes;
        }
    }
}
</script>
<style scoped lang="scss">

</style>