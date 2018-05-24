<template>
  <div>
    <mt-header :title="title" class="lcc-header"></mt-header>
    <router-view/>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="tab1" class="lcc-main-tab-item">
        <img slot="icon" src="../assets/like.png">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2" class="lcc-main-tab-item">
        <img slot="icon" src="../assets/like.png">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3" class="lcc-main-tab-item">
        <img slot="icon" src="../assets/like.png">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4" class="lcc-main-tab-item">
        <img slot="icon" src="../assets/like.png">
        tab4
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '首页',
      selected: 'tab1'
    }
  },
  methods: {

  },
  watch: {
    selected: function (val, oldVal) {
      if (val === 'tab2') {
        this.$router.push('/tab2')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
