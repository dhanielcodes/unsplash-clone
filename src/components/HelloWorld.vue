<template>
  <div class="hello">
    <div v-for="(item, index) in gns" :key="index">
      <img :src="item.urls.thumb" alt="">
       <p>{{item.user.name}}</p>
      <p>{{item.user.location}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const gns = ref(null)

    fetch('https://api.unsplash.com/photos?client_id=mUO78luHuOYnznV4o1Hca1nuAcawJ1Z-P4X1AZVVFWE')
  .then(response => { return response.json()})
  .then(json =>{
     gns.value = json
     console.log(json)
     })

   

    return{gns}
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
