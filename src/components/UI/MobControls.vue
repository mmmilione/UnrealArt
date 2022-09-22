<template>
    <div class="mobController">
        <div class="center row">
            <ControlBTN id="forwardBTN" arrow="fas fa-arrow-circle-up" />
        </div>
        <div class="lateral row">
            <div class="center">
                <ControlBTN id="leftBTN" arrow="fas fa-arrow-circle-left" />
            </div>
            <div class="center">
                <ControlBTN id="rightBTN" arrow="fas fa-arrow-circle-right" />
            </div>
        </div>
        <div class="center row">
            <ControlBTN id="backwardsBTN" arrow="fas fa-arrow-circle-down" />
        </div>
    </div>
</template>

<script>
import ControlBTN from '../BTNs/ControlBTN.vue';
    export default {
    components: { ControlBTN }
}
</script>

<style scoped>

    .mobController{
        display: none;
    }

    @media screen and (max-width: 800px){
        .mobController {
            display: block !important;
            position: absolute;
            bottom: 35px;
            right: 10px;
            z-index: 10;
            width: 150px;
        }

        .lateral{
            display: grid;
            grid-template-columns: 1fr 1fr;
        }

        .row{
            height: 50px;
        }

    }
</style>