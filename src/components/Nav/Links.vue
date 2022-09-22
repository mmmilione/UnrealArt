<template>
    <div class="links desk">
        <p class="center"><a href="https://github.com/mmmilione/UnrealArt" target="_blank"><i class="fab fa-github"></i> GitHub</a></p>
        <p class="center"><router-link to="/contacts"><i class="fas fa-envelope"></i> Contacts</router-link></p>
        <p class="center"><router-link to="/FAQ"><i class="fas fa-question-circle"></i> FAQs</router-link></p>
    </div>
</template>

<style scoped>
    .links{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding-top: 10px;
    }

    @media screen and (max-width: 800px){
        .links{
            display: none !important;
        }
    }
</style>