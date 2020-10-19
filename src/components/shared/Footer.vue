<template>
  <nav class="navbar fixed-bottom  navbar-light" style="background-color: #d5daf2;">
    <span class="navbar-text mr-auto">
        <strong>cennetboran22@gmail.com</strong> | cennetboran
    </span>
  </nav>
</template>
<script>
  import { mapGetters } from "vuex";
  export default {
    computed : mapGetters(["getTradeResult"])
  }
</script>
