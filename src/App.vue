
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
                    <v-btn to="/login" text>LOGIN</v-btn>
                </td>
            </tr>
        </table>
        <router-view></router-view>
    </div>
</template>

<script>


    export default {
        name: 'App',
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
    #login{
        text-align: right;
    }
</style>