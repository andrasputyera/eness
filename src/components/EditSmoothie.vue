<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2>Edit {{ smoothie.title }} Smoothie</h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie name:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient (press TAB):</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <ul class="ingredients">
                <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                    <span class="chip deep-purple lighten-5">{{ ing }}
                        <i class="close material-icons" @click="deleteIngredient(ing)">close</i>
                    </span>
                </li>
            </ul>
            <div class="field center-align">
                <p v-if="feedback" class="pink-text text-darken-3">{{ feedback }}</p>
                <button class="btn pink darken-2">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/config'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            // Storage for data record that we retrieve from database
            smoothie: null,
            another: null,
            feedback: null
    }
    },
    methods: {
        editSmoothie() {
            if (this.smoothie.title) {
                this.feedback = null
                // Create a slug from the title
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true,
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
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
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient.'
            }
        },
        deleteIngredient(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
}

.edit-smoothie .ingredients {
  margin: 30px auto;
}
.edit-smoothie .ingredients li {
  display: inline-block;
}
.edit-smoothie .chip {
  background-color: aqua;
}
</style>