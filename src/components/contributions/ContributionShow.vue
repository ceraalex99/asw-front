<template>
    <v-container fluid id="container">
        <v-row>
            <td></td>
            <v-col md="4" cols="6">
                <td> {{ contribution.title }} </td>
                <h6><td>{{contribution.points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: contribution.user_id }}">{{contribution.author}} </router-link><router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}">{{contribution.created_at | humanReadableTime}}</router-link></td></h6><br>
                <td> {{contribution.text}} </td><br>
                <v-textarea
                        solo
                        name="inputComment"
                ></v-textarea>
                <v-btn>
                    add comment
                </v-btn><br>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {HTTP} from '@/components/http-common'
    import moment from 'moment'

    export default {
        name: "ContributionShow",
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data() {
            return {
                msg: "Hey",
                contribution: {},
                comments: [],
                errors: [],
            }
        },
        created() {
            HTTP.get('/posts/' + this.$route.params.id).then(response => {
                this.contribution = response.data;
            }).catch(e => {
                this.errors.push(e);
            });
        }
    }
</script>

<style scoped>

</style>