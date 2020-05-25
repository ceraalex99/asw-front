
<template class="viewport">
    <v-app :style="{background: $vuetify.theme.themes['light'].background}">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
        <v-simple-table class="appheaders">
            <tr>
                <td id="routes">
                    <v-btn to="/contributions" exact text color="white">HOME</v-btn>
                    <v-btn to="/contributions/newest" text color="white">NEWEST</v-btn>
                    <v-btn to="/contributions/ask" text color="white">ASK</v-btn>
                    <v-btn to="/contributions/threads" text color="white">THREADS</v-btn>
                    <v-btn to="/contributions/new" text color="white">SUBMIT</v-btn>
                </td>
                <td class="login">
                    <v-btn v-if="checkLogged()" :to="{name: 'userEdit', params: { id: current_user_id() }}" text color="white">PROFILE</v-btn>

                    <template v-if="checkLogged()">
                        <v-btn @click="logout" text color="white">LOGOUT</v-btn>
                    </template>
                    <template v-else>
                        <v-btn text color="white">
                            <g-signin-button
                                    :params="googleSignInParams"
                                    @success="onSignInSuccess"
                                    @error="onSignInError" class="auth">
                                LOGIN
                            </g-signin-button>
                        </v-btn>
                    </template>

                </td>
            </tr>
        </v-simple-table>
        <div :key="componentKey">
            <router-view :key="$route.fullPath"></router-view>
        </div>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'App',
        data: () => ({
            componentKey: 0,
            googleSignInParams: {
                client_id: '749235916788-tehnfrvlnukhrgdg3fpp2nuiskm4nri3.apps.googleusercontent.com'
            }
        }),
        methods: {
            onSignInSuccess (googleUser) {
                const profile = googleUser.getBasicProfile()
                localStorage.setItem('googleId', profile.getId())
                axios.post('https://asw-practica.herokuapp.com/api/login', {google_id: profile.getId(), name: profile.getName()}).then(response => {
                    localStorage.setItem('userId', response.data.id)
                    this.$forceUpdate()
                    this.componentKey += 1
                })
            },
            onSignInError (error) {
                console.log(error)
            },
            logout() {
                localStorage.removeItem('userId')
                localStorage.removeItem('userName')
                localStorage.removeItem('googleId')
                this.$forceUpdate()
                this.componentKey += 1
                this.$router.push("/contributions")
            },
            checkLogged() {
                return 'userId' in localStorage
            },
            current_user_id() {
                return localStorage['userId']
            },
            current_user_name() {
                return localStorage['userName']
            }
        }
    }

</script>

<style>
    html{
        overflow-y: auto !important;
        overflow-x: hidden !important;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        text-align: center;
        margin-top: 0;
    }
    .appheaders{
        background-color: #1976d2 !important;
        width: 100% !important;
        overflow-x: hidden !important;
        border-radius: unset !important;
    }
    #routes{
        text-align: left;
    }
    a{
        text-decoration: none;
        color: black !important;
    }
    #list{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        background-color: #f6f6ef;
    }
    .clink:hover{
        text-decoration: underline;
    }
    .login{
        text-align: right;
    }
    .clink{
        color: gray !important;
    }
    .white{
        color: white;
    }

    #container{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        background-color: #f6f6ef;
    }
    .cuttext{
        text-overflow: ellipsis;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;

    }
    .viewport{
        width: 100vw;
        position: absolute;
    }
</style>