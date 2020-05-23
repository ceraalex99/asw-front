<template>
    <v-simple-table style="background-color: #f6f6ef;">
        <tbody>
            <tr>
                <td class="greytext">user:</td><td><router-link :to=$route.path class="bluetext">{{this.user.name}}</router-link></td>
            </tr>
            <tr>
                <td class="greytext">created:</td><td>{{this.user.created_at | humanReadableTime}}</td>
            </tr>
            <tr>
                <td class="greytext">karma:</td><td>{{this.user.karma}}</td>
            </tr>
            <tr>
                <td class="greytext">about:</td>
                <td>
                    <v-textarea
                            v-model="about"
                            background-color="#e6e6df"
                            auto-grow
                            clearable
                    ></v-textarea>
                </td>
            </tr>
            <tr>
                <td>

                </td>
                <td>
                    <v-btn outlined @click="send()">UPDATE</v-btn>
                </td>

            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    import {HTTP} from "@/components/http-common";
    import moment from "moment";

    export default {
        name: "UserEdit",
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data(){
            return{
                errors: [],
                user: [],
                id:0,
                about: ''
            }
        },
        created() {
            this.id=this.$route.params.id;
            HTTP.get('/users/'+this.id, {headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.user = response.data
                this.about = this.user.about
            }).catch(e => {
                this.errors.push(e);
            });
        },
        methods: {
            send: function () {
                let formData;
                formData = {
                    about: this.about
                }
                HTTP.put('/users/'+this.id, formData, {headers: {'Authorization': localStorage['googleId']}}).catch(e => {
                    this.errors.push(e);
                });
                this.$router.push('/users/'+this.id+'/edit');
            }
        }
    }

</script>

<style scoped>
    .greytext{
        color: grey;
    }
    .bluetext{
        color: #1976d2 !important;
    }

</style>