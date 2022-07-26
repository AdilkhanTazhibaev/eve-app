<template>
  <div class="d-flex">
    <div class="logo"></div>
    <div class="search">
      <search-input />
    </div>
    <div class="user-info">
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import SearchInput from '@/common/SearchInput/SearchInput.vue';
import UserInfo from '@/common/UserInfo/UserInfo.vue';

export default {
  name: 'NavBar',
  components: { UserInfo, SearchInput }
};
</script>

<style scoped>
.logo {
  grid-area: logo;
}

.search {
  grid-area: search;
  flex: 1;
}

.user-info {
  grid-area: user-info;
  flex: 1;
}

.header-container {
  display: grid;
  width: 100%;
  grid-template-areas: 'logo search search user-info';
}
</style>
