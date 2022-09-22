<template>
    <div class="modal-background" v-if="isActive">
        <div class="modal-content">
            <h5 class="modal-title center"><b>{{title}}</b></h5>
            <i class="fas fa-window-close close-modal-icon" @click="close"></i>
            <section>
                <p>
                    You can navigate this room using the arrows on your keyboard as simple controls:
                </p>
                <p>
                    <ul>
                        <li>
                            Press <i class="fas fa-arrow-left"></i> and <i class="fas fa-arrow-right"></i> to look around
                        </li>
                        <br>
                        <li>
                            Press <i class="fas fa-arrow-up"></i> to walk forward
                        </li>
                        <br>
                        <li>
                            Press <i class="fas fa-arrow-down"></i> to walk backwards
                        </li>
                    </ul>
                </p>
                <p>
                    You can also <b class="red">click on the paintings on the wall</b> to interact with them.
                </p>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'isActive'],
        emits: ['close'],
        setup(props, context){
            const close = () => context.emit('close');
            return { close };
        }
    }
</script>

<style scoped>

.modal-content{
    color: white;
    position: relative;
    width: 40%;
    min-height: 400px;
    margin: 150px auto;
    background-color: black;
    padding: 40px;
    border-radius: 10px;
}

</style>