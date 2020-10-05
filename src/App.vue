<template>
  <div id="app">
    <perfect-scrollbar>
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
  }
}
</script>

<style lang="scss">

</style>
