<template>
    <div>
        <div id='location-details-header' class='bg-dark'>
            <h3> {{ location.name }} in {{ location.address.city }} </h3>
            <h4> Comments: </h4>
        </div>
        <table id='search-results-table' class='table table-bordered table-light' v-if="location !== undefined">
            <thead>
                 <tr>
                    <th scope='col'>  Accessible? </th>
                    <th scope='col'> Comment </th>
                    <th scope='col'>  User  </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="comment in location.comments" :key="comment.id">
                    <td> {{ (comment.accessible) ? 'Yes' : 'No' }} </td>
                    <td> {{ comment.text }} </td>
                    <td> {{ comment.username }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        locationid: {
            type: String,
            required: true
        }
    },
    created() {
        console.log(this.locationid)
    },

    computed: {
        location() {
            return this.$store.getters['locations/getLocationById'](this.locationid);
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

<style lang="scss" scoped>
    #location-details-header {
        color: white;
    }

</style>