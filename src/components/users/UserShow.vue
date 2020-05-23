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
                    <td class="greytext">about:</td><td>{{this.user.about}}</td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <router-link class="ulink" :to="{name: 'userSubmissions', params: { id: this.id }}">submissions</router-link>
                    </td>

                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <router-link class="ulink" :to="{name: 'userComments', params: { id: this.id }}">comments</router-link>
                    </td>

                </tr>
            </tbody>
        </v-simple-table>

</template>

<script>

    import {HTTP} from "@/components/http-common";
    import moment from "moment";

    export default {
        name: "UserShow",
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data(){
            return{
                errors: [],
                user: [],
                id:0
            }
        },
        created() {
            this.id=this.$route.params.id;
            HTTP.get('/users/'+this.id, {headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.user = response.data
            }).catch(e => {
                this.errors.push(e);
            });
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
    .ulink{
        color: black !important;
        font-size: large;
    }

    .ulink:hover{
        text-decoration: underline;
    }
</style>