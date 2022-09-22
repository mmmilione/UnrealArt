<template>
  <Nav :isWhite="isWhite" />
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <Footer :isWhite="isWhite" />
</template>

<script>

import { onMounted, provide, ref, watch } from 'vue'
import Nav from './components/Nav/Nav.vue'
import Footer from './components/UI/Footer.vue'
import useBoilerplate from './hooks/useBoilerplate'
import store from './store/state'

export default {
  
  components: { Footer, Nav },
  
  setup(){
    provide('store', store);
    const { route } = useBoilerplate();
    const isWhite = ref(false);
    watch(() => route.path, () => {
      if(route.path == "/") return isWhite.value = false;
      isWhite.value = true;
    })
    return { isWhite }
  }

}
</script>

<style scoped>
  .route-enter-from{
    opacity: 0;
    transform: translateY(100px);
  }

  .route-enter-active{
    transition: all 0.3s ease-out;
  }

  .route-leave-to{
    opacity: 0;
    transform: translateY(-100px);
  }

  .route-leave-active{
    transition: all 0.3s ease-in;
  }
  
</style>

