<template>
    <v-list id="list" three-line>
        <v-container
                style="margin-left: 30px"
        >
            <v-row>
                <v-col
                        cols="8"
                        md="1"
                        style="color: grey"
                >
                    user:
                </v-col>
                <v-col
                        cols="8"
                        md="4"
                        style="color: green"
                >
                    {{this.user.name}}
                </v-col>

            </v-row>
            <v-row>
                <v-col
                        cols="8"
                        md="1"
                        style="color: grey"
                >
                    created:
                </v-col>
                <v-col
                        cols="8"
                        md="4"
                >
                    {{this.user.created_at | humanReadableTime}}
                </v-col>

            </v-row>
            <v-row>
                <v-col
                        cols="8"
                        md="1"
                        style="color: grey"
                >
                    karma:
                </v-col>
                <v-col
                        cols="8"
                        md="4"
                >
                    {{this.user.karma}}
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="8"
                        md="1"
                        style="color: grey"
                >
                    about:
                </v-col>
                <v-col
                        cols="8"
                        md="4"
                >
                    {{this.user.about}}
                </v-col>

            </v-row>
        </v-container>
    </v-list>
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

</style>