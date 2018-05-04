<template>
    <div>
        <router-view id='content'></router-view>
    </div>
</template>

<style lang="scss">
    @import '../main.sass';

</style>


<style>
    /* Rules for sizing the icon. */
    .material-icons.md-18 { font-size: 18px; }
    .material-icons.md-24 { font-size: 24px; }
    .material-icons.md-36 { font-size: 36px; }
    .material-icons.md-48 { font-size: 48px; }

    /* Rules for using icons as black on a light background. */
    .material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
    .material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

    /* Rules for using icons as white on a dark background. */
    .material-icons.md-light { color: rgba(255, 255, 255, 1); }
    .material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }
</style>

<style scoped>
    html, body {
        height: 100%;
        padding: 0px;
        margin: 0px;
    }

     #app {
        position: static;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        min-height: 100%;
    }

    /* 
        Flex-grow will make the content fit the page if it is smaller.
    */
    #content {
        flex-grow: 1;
    }

    /*
        By default flex-shrink is set to 1, which will make items shrink if there is not enough space.
        This will prevent that. 
    */
    #header, #content, #footer {
        flex-shrink: 0;
    }
</style>
