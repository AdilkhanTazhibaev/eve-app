<template>
  <div class="pa2">
    <div class="logo">EVE</div>
    <div class="p-0 mt-5 d-flex flex-column">
      <router-link
        v-for="(item, index) in items"
        :key="index"
        class="sidebar-item"
        :to="item.path"
      >
        <div>
          {{ item.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface RouteRecord {
  path: string;
  name: string;
  image?: string | null;
}

export default {
  name: 'SideBar',
  components: {},
  setup() {
    const items = ref<RouteRecord[]>([
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'Feed',
        path: '/feeds'
      },
      {
        name: 'About',
        path: '/about'
      }
    ]);
    const router = useRouter();
    const onNavigate = (path: string) => {
      router.push(path);
    };
    return {
      items,
      onNavigate
    };
  }
};
</script>

<style scoped lang="scss">
.sidebar-item {
  padding: 10px 0;
  margin-bottom: 20px;
  width: 100%;
  list-style: none;
  color: #5d6a83;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background: #4e5d78;
    border-radius: 10px;
    color: #fff;
  }
}
</style>
