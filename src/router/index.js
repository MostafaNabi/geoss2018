import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import LocalPointsOfInterest from '@/components/LocalPointsOfInterest'

Vue.use(Router)

// Define Router paths, here we set what component to display for each URL
const router = new Router({
    routes: [
        {
            path:'/',
            redirect: '/dashboard'
        },

        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path:'/',
                    component: LocalPointsOfInterest
                },
                {
                    path:'/location/:id',
                    name: 'LocationDetails',
                    component: LocationDetails,
                    props: (route) => ({locationid: parseInt(route.params.locationid)})
                }
            ]
        }
    ]
});

export default router;