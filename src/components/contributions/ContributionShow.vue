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
                <v-btn @click.native="addANewComment()">
                    add comment
                </v-btn>
                <br><td></td><br>
                <template v-for="c in comments">
                    <tree-menu :key="c.id" :label="c.text" :replies="c.respostes" :depth="0"></tree-menu>
                </template>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {HTTP} from '@/components/http-common'
    import moment from 'moment'
    import TreeMenu from "./Tree";

    export default {
        name: "ContributionShow",
        components: {TreeMenu},
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data() {
            return {
                msg: "Hey",
                contribution: {},
                errors_contributions: [],
                comments: [],
                errors_commets: [],

            }
        },
        created() {
            HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.contribution = response.data;
            }).catch(e => {
                this.errors_contributions.push(e);
            });

            HTTP.get('/posts/' + this.$route.params.id + '/comments' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.comments = response.data;
                this.$forceUpdate();
            }).catch(e => {
                this.errors_comments.push(e);
            });
        },
        methods :{
            addANewComment : async function (){

            },
        }
    }
</script>

<style scoped>

</style>