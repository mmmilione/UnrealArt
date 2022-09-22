<template>
    
    <MobNav />

    <nav :class="isWhite == true ? 'whiteCommons' : 'none'">

        <Logo />

        <MenuMob />
        
        <Links />
        
        <Connect styles="right desk" />
    
    </nav>

</template>

<script>
    
    import MenuMob from './MenuMob.vue';
    import Links from './Links.vue';
    import Logo from './Logo.vue';
    import MobNav from './MobNav.vue';
    import Connect from './Connect.vue';

    export default {
        components: { MenuMob, Links, Logo, MobNav, Connect },
        props: ['isWhite'],
    }
    
</script>

<style scoped>

    nav{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: rgba(250, 245, 236, 0.2);
        display: grid;
        grid-template-columns: 2fr 4fr 3fr;
        z-index: 20;
    }

    .whiteCommons{
        background-color: white !important;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
    }

    @media screen and (max-width: 800px){

        nav {
            display: grid;
            grid-template-columns: 15fr 1fr;
        }

    }
    
</style>