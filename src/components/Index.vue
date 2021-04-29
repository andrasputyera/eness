<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete_outline</i>
                <h2 class="deep-purple-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                        <span class="chip deep-purple lighten-5">{{ ing }}</span>
                    </li>
                </ul>
            </div>
            <span class="btn-floating btn-small halfway-fab red lighten-2">
                <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
                    <i class="material-icons edit">edit</i>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/config.js'

export default {
    name: 'Index',
    data() {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            // Delete document from Firestore
            db.collection('smoothies').doc(id).delete()
            .then(() => {
                this.smoothies = this.smoothies.filter(smoothie => {
                    return smoothie.id != id
                })
            })
        }
    },
    created() {
        // Retreive data from Firestore
        db.collection('smoothies').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let smoothie = doc.data()
                smoothie.id = doc.id
                this.smoothies.push(smoothie)
            })
        })
    } 
}
</script>

<style>
 .index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
 .index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
 .index .ingredients {
  margin: 30px auto;
}
 .index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  color: #b39ddb;
  font-size: 1.4em;
}
</style>