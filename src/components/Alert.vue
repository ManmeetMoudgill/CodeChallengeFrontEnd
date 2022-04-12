<template>
    <div class="alert alert-danger mb-0" role="alert">
        <strong>{{message && message.message}}</strong>
        
</div>
</template>


<script>
export default {
    name:"Alert",
    props:{
        message:{
            type:Object,
            required:true
        }
    }
}
</script>