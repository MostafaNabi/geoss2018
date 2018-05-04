<template>
    <div id='dashboard-container' class='container-fluid d-flex p-0'>
        <sidebar ref="sidebar"> </sidebar>
        <div id='dashboard-body' class='container-fluid pl-0'>
            <the-nav-bar id='dashboard-navbar' class='container-fluid pb-2' @toggleSidebar="$refs.sidebar.toggleSidebar()"></the-nav-bar>
            <router-view id='dashboard-content' class='container-fluid' ></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import TheNavBar from '@/components/TheNavBar';
import LocalPointsOfInterest from '@/components/LocalPointsOfInterest'
export default {
    name: 'Dashboard',
    components: {
        TheNavBar,
        Sidebar,
        LocalPointsOfInterest
    }
}

</script>

<style lang="scss" scoped>
    #dashboard-body {
        width: 100%;
        height: 100vh;
    }

</style>

