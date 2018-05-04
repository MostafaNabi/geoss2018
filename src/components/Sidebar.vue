<template>
    <div>
        <div id='sidebar' class='bg-dark' :class="{'sidebar-hidden': sidebar_hidden}">
            <div class='sidebar-menu'>
                <div class='sidebar-title'> <h4> SERA </h4> </div>
                <div class='sidebar-content'>

                    <div class='sidebar-submenu'>
                        <div class='sidebar-submenu-title'> <h6> Search </h6> </div>
                        <div class='sidebar-submenu-content'>
                            <div class="sidebar-submenu-content-item btn-group btn-group-toggle pb-2" data-toggle="buttons">
                                <label class="btn btn-secondary btn-sm active"  v-on:click="search_function = 'location'">
                                    <input type="radio"  name='search-options' checked> Use Location
                                </label>
                                <label class="btn btn-secondary btn-sm"  v-on:click="search_function = 'manual'">
                                    <input type="radio" name='search-options'> Search Manually
                                </label>
                            </div>
                            
                            <div class='form-row' v-if="search_function === 'manual'">
                                <div class='col-sm-3 mr-2'>
                                    <label> Postcode </label>
                                </div>
                                <div class='col-sm-3'>
                                    <input class='form-control-sm' type='text' placeholder='postcode'/>
                                </div>
                            </div>
                            <div class='form-row'>
                                <div class='col-sm-3 mr-2'>
                                    <label> Radius(km) </label>
                                </div>
                                <div class='col-sm-3'>
                                    <input class='form-control-sm' type='text' v-model="radius" placeholder='radius(km)'/>
                                </div>
                            </div>
                        </div>
                    </div> <!-- Close submenu -->

                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data() {
      return {
          sidebar_hidden: true,
          search_function: 'location',
          radius: parseFloat(10)
      }
  },

  methods: {
      toggleSidebar() {
          this.sidebar_hidden = !this.sidebar_hidden;
      }
  }

}
</script>

<style lang="scss" scoped>
    #sidebar {
        position: static;
        display: block;
        height: 100vh;
        min-height: 100vh;
        width: 300px;
        transition: all 0.3s;
        color: white;

        .sidebar-title {
            color: white;
        }

        .sidebar-submenu-title {
            color: lightgrey;
        }
    }

    #sidebar.sidebar-hidden {
        width: 80px;

        .sidebar-submenu-content {
            display: none;
        }
    }
</style>

