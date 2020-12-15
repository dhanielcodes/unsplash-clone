<template>
    <div>
        <form @submit.prevent="search">
            <input v-model="inputed" type="text">
            <button>sub</button>
        </form>
        <div v-for="(item, index) in datas" :key="index">
           <div>
               <img :src="item.urls.thumb" alt="">
               <p>{{item.user.name}}</p>
               <p>{{item.user.location}}</p>
           </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
    export default {
        setup() {
            const inputed = ref(null)
            const item = ref(null)
            const datas = ref(null)

            const search = () => {
                item.value = inputed.value
                    fetch(`https://api.unsplash.com/search/photos?page=1&query=${item.value}&client_id=mUO78luHuOYnznV4o1Hca1nuAcawJ1Z-P4X1AZVVFWE`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.results)
                        datas.value = data.results 
                    })
            }
            
            
            return{inputed, search, datas}
        }
    }
</script>

<style scoped>

</style>