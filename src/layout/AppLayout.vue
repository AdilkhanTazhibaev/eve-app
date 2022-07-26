<template>
  <div class="grid-container">
    <div class="header border-1">
      <nav-bar />
    </div>
    <div class="sidebar border-1">
      <side-bar />
    </div>
    <div class="frame border-1">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar/Navbar.vue';
import SideBar from '@/components/Sidebar/SideBar.vue';

export default {
  name: 'AppLayout',
  components: { SideBar, NavBar },
  setup() {}
};
</script>

<style lang="scss" scoped>
$mt: 20px;
.header {
  grid-area: header;
}

.frame {
  grid-area: frame;
  background-color: #f6f7f8;
  border-radius: 5px;
}

.sidebar-right {
  grid-area: sidebar-right;
}

.sidebar {
  grid-area: sidebar;
}

.grid-container {
  display: grid;
  margin-top: $mt;
  grid-template-rows: 0fr 1fr;
  gap: $mt;
  height: 100vh;
  grid-template-areas:
    'sidebar sidebar sidebar header   header header header header   header header header header'
    'sidebar sidebar sidebar frame   frame frame frame frame   frame frame C C';
}
</style>
