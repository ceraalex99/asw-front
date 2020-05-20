<template>
    <div id="app">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

        <table>
            <tr>
                <td id="routes">
                    <v-btn to="/contributions" exact text><span class="white">HOME</span></v-btn>
                    <v-btn to="/contributions/newest" text><span class="white">NEWEST</span></v-btn>
                    <v-btn to="/contributions/ask" text><span class="white">ASK</span></v-btn>
                    <v-btn to="/contributions/threads" text><span class="white">THREADS</span></v-btn>
                    <v-btn to="/contributions/new" text><span class="white">SUBMIT</span></v-btn>
                </td>
                <td v-if="checkLogged()" class="login">
                    <v-btn :to="{name: 'userShow', params: { id: current_user_id() }}" text><span class="white">{{current_user_name()}}</span></v-btn>
                </td>
                <td class="login">
                    <template v-if="checkLogged()">
                        <v-btn @click="logout" text><span class="white">LOGOUT</span></v-btn>
                    </template>
                    <template v-else>
                        <v-btn text>
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
        </table>
        <router-view :key="componentKey"></router-view>
    </div>
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
                localStorage.setItem('userName', profile.getName())
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
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0px;
    }
    table{
        background-color: #ff6600;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    #routes{
        text-align: left;
    }
    a{
        text-decoration: none;
        color: black;
    }
    .clink{
        color: gray;
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
        width: 1%;

    }
    .white{
        color: white;
    }

</style>