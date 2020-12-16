<template>
<div>
  <div class="search">
    <form @submit.prevent="search">
      <div class="input">
        <img src="../assets/loupe.svg" alt="">
        <input v-model="inputed" type="text" placeholder="Search for photo">        
      </div>
    </form>
  </div>
  <div v-if="loading" class="load">
    <div class="card">
      
    </div>
     <div class="card">
      
    </div>
     <div class="card">
      
    </div>
     <div class="card">
      
    </div>
     <div class="card">
      
    </div>
     <div class="card">
      
    </div>
     <div class="card">
      
    </div>
  </div>
  <div v-else class="hello">
    <div class="card" v-for="(item, index) in gns" :key="index">
      <img :src="item.urls.regular" alt="">
      <div class="ctx">
        <p>{{item.user.name}}</p>
        <p>{{item.user.location}}</p>
      </div>
    </div>
  </div>
  <div class="modal">
    <img src="../assets/ricl.png" alt="">
  </div>
</div>
  
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {

    const loading = ref(true)

    const gns = ref(null)

    fetch('https://api.unsplash.com/search/photos?page=1&query=nigeria&client_id=mUO78luHuOYnznV4o1Hca1nuAcawJ1Z-P4X1AZVVFWE')
    .then(response => { return response.json()})
    .then(json =>{
      gns.value = json.results
      console.log(json)
      loading.value = false
    })

     //SEARCH
      const inputed = ref(null)
            const item = ref(null)

            const search = () => {
                item.value = inputed.value
                loading.value = true

                    fetch(`https://api.unsplash.com/search/photos?page=1&query=${item.value}&client_id=mUO78luHuOYnznV4o1Hca1nuAcawJ1Z-P4X1AZVVFWE`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.results)
                        gns.value = data.results 
                          loading.value = false

                    })
            }

   

    return{gns, inputed, search, loading}
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  color: white
}
.search{
  background: #dde2e9;
  padding: 100px 0;
}
.search img{
  width: 20px;
  margin-right: 10px
}
h1{
  color: black
}
.input{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 50px;
  background: white;
  padding: 10px;
  margin:  auto;
  border-radius: 10px
}
.input input{
  color: black;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background: none;
}
@media(max-width: 642px){
  .input{
    width: 90%;
  }
}





.hello, .load{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 800px;
  margin: auto;
  transform: translateY(-2%);
  grid-gap: 20px;
  animation: enter .4s 1 linear forwards;
  opacity: 0;
  transform: translateY(-5%)
}
@keyframes enter {
  from{
    transform: translateY(-5%);
    opacity: 0;
  }
  to{
    transform: translateY(-2%);
    opacity: 1;
  }
}
.hello img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card{
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}
.load .card{
  background: grey;
}

.card::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: black;
  filter: blur(30px)
}
.load .card::after{
  animation: load 1s infinite linear forwards;
  background: #9b9b9b
}
@keyframes load {
  from{
    transform: translateY(0%)
  }
  to{
    transform: translateY(-400%)
  }
}
.card .ctx{
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1;


}
.card:nth-child(1){
  height: 300px;
}
.card:nth-child(2){
  height: 400px;
}
.card:nth-child(3){
  height: 350px;
}
.card:nth-child(4){
  height: 300px;
  transform: translateY(-10%);
}
.card:nth-child(5){
  height: 400px;
}
.card:nth-child(6){
  height: 350px;
  transform: translateY(-10%);
}
.card:nth-child(7){
  height: 300px;
  transform: translateY(-10%);
}
.card:nth-child(8){
  height: 400px;
}
.card:nth-child(9){
  height: 350px;
  transform: translateY(-10%);
}
@media(max-width: 957px){
  .hello, .load{
    grid-template-columns: repeat(2, 1fr);
    width: 600px
  }
  .card:nth-child(4), .card:nth-child(7){
    transform: translateY(0%);
  }
}
@media(max-width: 717px){
  .hello, .load{
    grid-template-columns: repeat(2, 1fr);
    width: 90%
  }
}
@media(max-width: 445px){
  .hello, .load{
    grid-template-columns: repeat(1, 1fr);
    transform: translateY(-1%);
  }
}



.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.542);
  display: grid;
  place-items: center;
  display: none;
}
.modal img{
  border-radius: 30px;
}
</style>
