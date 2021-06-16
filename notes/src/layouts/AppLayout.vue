<template>
  <component :is="layout">
    <slot/>
  </component>
</template>

<script>
import {markRaw} from 'vue';

export default {
  name: "AppLayout",
  data() {
    return {
      layout: null
    }
  },
  methods: {
    async getLayout(layout) {
      const component = await import(`@/layouts/${layout}.vue`);
      return component.default;
    }
  },
  watch: {
    $route: {
      async handler(route) {
        try {
          this.layout = markRaw(await this.getLayout(route.meta.layout));
        } catch (e) {
          this.layout = markRaw(await this.getLayout('AppLayoutDefault'));
        }
      }
    }
  },

}
</script>
