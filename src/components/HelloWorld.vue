<template>
<div>
  <div class="search">
    <form v-if="searched" @submit.prevent="search">
      <div class="input">
        <img src="../assets/loupe.svg" alt="">
        <input v-model="inputed" type="text" placeholder="Search for photo">        
      </div>
    </form>
    <div v-else>
      <button @click="searched = true">Search</button>
      <h1 class="searched" v-if="searching">Searching for <span> "{{inputed}}"</span></h1>
      <h1 class="searched" v-else>Search Results for <span> "{{inputed}}"</span></h1>
    </div>

  </div>
  <div v-if="loading" class="load">
    <div class="card" v-for="(index) in 7" :key="index">
      <div class="context">
        <div></div>
        <div></div>
      </div>
    </div>
     
  </div>
  <div v-else class="hello">
    <div @click="openModal(item.urls.regular, item.user.name, item.user.location)" class="card" v-for="(item, index) in gns" :key="index">
      <img :src="item.urls.regular" :alt="item.alt_description">
      <div class="ctx">
        <p class="pp">{{item.user.name}}</p>
        <p class="p">{{item.user.location}}</p>
      </div>
    </div>
  </div>
  <div class="modal" v-if="modal">
    <svg @click="modal = false" class="close" height="329pt" fill="#FFFFFF" viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
    <div class="modal_main">
      <img :src="modalSrc" alt="">
      <div class="cont">
        <p>{{modalName}}</p>
        <p>{{modalLoc}}</p>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {

    const loading = ref(true)

    const modal = ref(false)

    const gns = ref(null)

    fetch('https://api.unsplash.com/search/photos?page=1&query=nigeria&client_id=mUO78luHuOYnznV4o1Hca1nuAcawJ1Z-P4X1AZVVFWE')
    .then(response => { return response.json()})
    .then(json =>{
      gns.value = json.results
      console.log(json)
      loading.value = false
    })
    .catch((err) => {
      console.log(err)
      alert("Couldn't retrieve")
    })

     //SEARCH
     const searched = ref(true)
     const searching = ref(true)
      const inputed = ref(null)
            const item = ref(null)

            const search = () => {
                item.value = inputed.value
                loading.value = true
                searched.value = false

                fetch(`https://api.unsplash.com/search/photos?page=1&query=${item.value}&client_id=mUO78luHuOYnznV4o1Hca1nuAcawJ1Z-P4X1AZVVFWE`)
                .then(res => res.json())
                .then(data => {
                    console.log(data.results)
                    gns.value = data.results 
                      loading.value = false
                      searching.value = false

                })
            }

            //MODAL
            const modalSrc = ref(null)
            const modalName = ref(null)
            const modalLoc = ref(null)

            const openModal = (src, name, loc) => {
              modal.value = true
              modalSrc.value = src
              modalName.value = name
              modalLoc.value = loc
            }

   

    return{gns, inputed, search, searched, searching, loading, modal, openModal, modalSrc, modalLoc, modalName}
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  color: white
}
.form{
  width: 100%;
  max-width: 1400px;
}
.search{
  background: #dde2e9;
  padding: 100px 0;
  width: 100%;
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
  width: 95%;
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




.searched{
  width: 90%;
  margin: auto;
  color: #2a3c5c;
}
.searched span{
  color: #88898c;
}
.search button{
  width: 150px;
  margin-left: 5%;
  margin-bottom: 20px;
  padding: 15px 15px;
  border: none;
  background: grey;
  color: white;
  outline: none;
  cursor: pointer  
}

.hello, .load{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  max-width: 1400px;
  margin: auto;
  transform: translateY(-2%);
  grid-gap: 40px;
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
.card .pp{
  font-size: 13px;
  font-weight: 600
}
.card .p{
  font-size: 13px;
  font-weight: 200
}
.load .card{
  background: grey;
}
.load .card .context{
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 70%;
}
.load .card .context div{
  width: 100%;
  height: 20px;
  background: #b7b8ba;
  margin: 5px 0;
  border-radius: 5px
}
.load .card .context div:nth-child(2){
  width: 80%;
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
    transform: translateY(1000%)
  }
  to{
    transform: translateY(-1000%)
  }
}
.card .ctx{
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1;


}
.load .card{
  height: 380px;
}
@media(max-width: 957px){
  .hello, .load{
    grid-template-columns: repeat(2, 1fr);
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
}
.modal_main{
  width: 80%;
  height: 80%;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
}
.modal_main img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.modal_main .cont{
  position: absolute;
  bottom: 0;
  left: 0;
  background: white;
  padding: 10px 30px;
  width: 100%;
}
.cont p{
  color: black;
}
.cont p:nth-child(2){
  font-weight: 200;
  font-size: 15px
}
.close{
  position: fixed;
  top: -180px;
  right: 30px;
  width: 30px;
  cursor: pointer;
}
</style>
