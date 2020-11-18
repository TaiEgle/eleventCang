<template>
    <div class="searchP">
        {{searchText}}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                searchText:''
            }
        },created(){
            this.searchText=this.$route.params.searchText;
        }
    }
</script>

<style scoped>

</style>