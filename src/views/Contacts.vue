<template>

    <div class="container">
        <div class="content">

            <h1>Contacts</h1>
            <p>Please use the form below to contact us.</p>

            <form @submit.prevent="return">

                <Label text="Email" color="black" icon="fas fa-envelope" />
                <EmailInput 
                    :isRequired="true" 
                    placeholder="youremail@gmail.com" 
                    @change="handleEmail"
                />
               
                <Label text="Message" color="black" icon="fas fa-edit" />
                <TextAreaInput 
                    :isRequired="true" 
                    placeholder="Type Your Message Here..." 
                    @change="handleMSG"
                />

                <Feedbacks 
                    :isLoading="isLoading"
                    :error="error"
                    :isSuccess="isSuccess"
                    successMSG = "Message Sent!"
                />

                <div class="btnBOX center">
                    <BTN 
                        v-if="isLoading==false && isSuccess==false"
                        text="Send" 
                        styles="darkBG" 
                        @click="sendMSG"  
                    />
                </div>
            </form>

        </div>

        <FloatGoBackBTN icon="fas fa-arrow-circle-left" @click="router.go(-1)" />

    </div>

</template>

<script>

    import Label from '../components/Form/Label.vue';
    import EmailInput from '../components/Form/EmailInput.vue';
    import TextAreaInput from '../components/Form/TextAreaInput.vue';
    import useBoilerplate from '../hooks/useBoilerplate.js';
    import Divider from '../components/UI/Divider.vue';
    import Feedbacks from '../components/Form/Feedbacks.vue';
    import BTN from '../components/BTNs/BTN.vue';
    import { post } from '../helpers/httpCalls.js';
    import FloatGoBackBTN from '../components/BTNs/FloatGoBackBTN.vue';

    export default {
        
        components: { Label, EmailInput, TextAreaInput, Divider, Feedbacks, BTN, FloatGoBackBTN },
        
        setup(){

            const { isLoading, error, isSuccess, router } = useBoilerplate(false);
            
            let email = '';
            let msg = '';

            const handleEmail = value => email = value;
            const handleMSG = value => msg = value;

            const sendMSG = async () => {

                error.value = null;
                isSuccess.value = false;

                if(email == '') return error.value = "Please Insert Your Email";
                if(msg == '') return error.value = "Please Insert Your Message";
                
                isLoading.value = true;

                try {

                    const url = "/api/contact"
                    const vars = { email, msg: `${msg} (Sent From UnrealArt)` };
                    const res = await post(url, vars);

                    if(res.status === 200){
                        isSuccess.value = true;
                        document.querySelector('form').reset();
                    }else{
                        const errorMSG = await res.text();
                        error.value = errorMSG ? errorMSG : `Error (${res.status})`;
                    }

                    isLoading.value = false;

                } catch (err) {
                    console.log(err);
                    error.value = `Error`;
                    isLoading.value = false;
                }

            }

            return { handleEmail, handleMSG, sendMSG, isLoading, error, isSuccess, router };

        }

    }

</script>

<style scoped>
    .btnBOX{
        padding: 20px;
        min-height: 40px;
    }
</style>