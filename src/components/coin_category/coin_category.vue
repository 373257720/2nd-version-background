<template>
<keep-alive include="coin_category_lists">
  <router-view></router-view>
</keep-alive>
</template>

<script>
  export default {
    data(){
      return{
          tableData:[],
      }
    },
    created() {

    },
    methods:{

    }
  };
</script>

<style>
</style>
