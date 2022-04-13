<template>
    <div class=" flex  py-2 justify-center items-center bg-custom ">
        <div class="flex flex-col">
            <div class="flex items-center">
                <img class="w-6 h-6" src="../assets/coding.png" alt="">
                <h2 class="ml-2 text-white font-bold">Developed by Manmeet Moudgill</h2>
            </div>
            <div class="flex justify-center items-center mt-2">
                <a class="flex font-bold text-white " target="_blank" href="https://github.com/ManmeetMoudgill/CodeChallengeFrontEnd/tree/localbranch">
                <img src="../assets/github.png" alt="">Github repo</a>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:"Footer"
}
</script>

<style>
.bg-custom {
    background-color: rgb(212, 8, 80);
}
</style>