<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete_outline</i>
                <h2 class="deep-purple-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ing }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            smoothies: [
                { title: 'Morning Brew', slug: 'morning-brew', ingredients: ['bananas', 'coffee', 'milk'], id: '1' },
                { title: 'Kickstarter', slug: 'kick-starter', ingredients: ['mango', 'lime', 'orange juice'], id: '2' }
            ]
        }
    },
    methods: {
        deleteSmoothie(id) {
            this.smoothies = this.smoothies.filter(smoothie => {
                return smoothie.id != id
            })
        }
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