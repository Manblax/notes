<template>
    <component :is="layout">
      <slot/>
    </component>
</template>

<script>
import AppLayoutDefault from './AppLayoutDefault';
import {markRaw} from 'vue';

export default {
  name: "AppLayout",
  data() {
    return {
      layout: 'div'
    }
  },
  watch: {
    $route: {
      async handler(route) {
        try {

          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          console.log('try', component)
          this.layout = markRaw(component?.default || AppLayoutDefault);
        } catch (e) {
          console.log('e', e)
          this.layout = markRaw(AppLayoutDefault);
        }
      }
    }
  }
}
</script>
