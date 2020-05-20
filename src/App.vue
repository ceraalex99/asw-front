
<template>
    <div id="app">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
        <table>
            <tr>
                <td id="routes">
                    <v-btn to="/contributions" text>HOME</v-btn>
                    <v-btn to="/newest" text>NEWEST</v-btn>
                    <v-btn to="/ask" text>ASK</v-btn>
                    <v-btn to="/threads" text>THREADS</v-btn>
                    <v-btn to="/submit" text>SUBMIT</v-btn>
                </td>
                <td id="login">
                    <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>

                </td>
            </tr>
        </table>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        data: () => ({
            clientId: '749235916788-tehnfrvlnukhrgdg3fpp2nuiskm4nri3.apps.googleusercontent.com'
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
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    router-link{
        color: white;
    }
    table{
        background-color: #ff6600;
        width: 85%;
        margin-left: auto;
        margin-right: auto;
    }
    #routes{
        text-align: left;
    }
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