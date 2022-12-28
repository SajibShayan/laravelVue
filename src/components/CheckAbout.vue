<template>
<div>

    <h3>Hello from CheckAbout ({{ UserId }})</h3>

</div>
</template>

    
      
      
    
<script>
export default {
    name: 'CheckAbout',
    data() {
        return {
            msg: '',

            UserId: this.$route.params.user_id,

        }

    },
    methods:{
        updateId(){
            this.UserId = this.$route.params.user_id
        }
    },

    watch:{
        $route : 'updateId'
    }
}
</script>
    
    
<style scoped>
 

</style>
