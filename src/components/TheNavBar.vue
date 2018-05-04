<template>
    <div>
        <nav class='navbar navbar-expand-sm bg-light'>
            <ul class='navbar-nav'>
                <li class='nav-item'> <i id='sidebar-menu' class="material-icons" v-on:click="$emit('toggleSidebar')">menu</i></li>
            </ul>
        </nav>
    </div>
</template>

<script>
</script>

<style lang='scss' scoped>
    #sidebar-menu {
        cursor: pointer;
    }
</style>
