<template>
  <main class="pt-6">
    <AppLayout>
      <router-view/>
    </AppLayout>
  </main>
</template>

<script>
import AppLayout from "./layouts/AppLayout";

export default {
  name: 'App',
  components: {
    AppLayout
  }
}
</script>
