<template>
    <div class="add-smoothie container z-depth-1">
        <h2 class="center-align deep-purple-text">Create Some Magic</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie name:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient (press TAB):</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <!-- <div v-for="(ing, index) in ingredients" class="field ingredient" :key="index">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" >
            </div> -->
            <ul class="ingredients">
                <li v-for="(ing, index) in ingredients" :key="index">
                    <span class="chip deep-purple lighten-5">{{ ing }}
                        <i class="close material-icons" @click="deleteIngredient(ing)">close</i>
                    </span>
                </li>
            </ul>
            <div class="field center-align">
                <p v-if="feedback" class="pink-text text-darken-3">{{ feedback }}</p>
                <button class="btn pink darken-2">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/config'
import slugify from 'slugify'

export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addSmoothie() {
            if (this.title) {
                this.feedback = null
                // Create a slug from the title
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true,
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a smoothie title'
            }
        },
        addIngredient() {
            if (this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient.'
            }
        },
        deleteIngredient(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
}

.add-smoothie .ingredients {
  margin: 30px auto;
}
.add-smoothie .ingredients li {
  display: inline-block;
}
.add-smoothie .chip {
  background-color: aqua;
}
</style>