<template>
  <div id="app">
    <perfect-scrollbar ref="scroll">
    <Header/>
    <Main/>
    <Footer/>
    </perfect-scrollbar>
  </div>
</template>

<script>
  import Header from "./components/layouts/Header";
  import Main from "./components/layouts/Main";
  import Footer from "./components/layouts/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  },
  data() {
    return {
      isVisible: true,
    }
  },
  watch: {
    $route() {
      this.$refs.scroll.$el.scrollTop = 0;
    }
  }
}
</script>

