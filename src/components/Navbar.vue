<template>
    <nav>
        <div class="nav-wrapper deep-purple darken-3">
            <router-link :to="{ name: '' }">
             <span class="nav-title">Vitalize Your Day</span>
            </router-link>
            <a href="" class="btn-floating btn-large halfway-fab amber">
                <router-link :to="{ name: '' }">
                    <i class="material-icons">add</i>
                </router-link>
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {

        }
    } 
}
</script>

<style scoped>
.nav-title {
    padding: 0 20px;
}
</style>