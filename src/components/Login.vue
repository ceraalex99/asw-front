<template>
    <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>

<script>
    export default {
        data: () => ({
            clientId: 'cliend-id'
        }),
        methods: {
            OnGoogleAuthSuccess (idToken) {
                console.log(idToken)
                // Receive the idToken and make your magic with the backend
            },
            OnGoogleAuthFail (error) {
                console.log(error)
            }
        }
    }
</script>

<style>
    .google-signin-button {
        color: white;
        background-color: red;
        height: 50px;
        font-size: 16px;
        border-radius: 10px;
        padding: 10px 20px 25px 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>