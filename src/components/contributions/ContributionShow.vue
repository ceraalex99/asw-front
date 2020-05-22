<template>
    <v-container fluid id="container">
        <v-row>
            <td></td>
            <v-col md="4" cols="6">
                <td> {{ contribution.title }} </td>
                <h6><td>{{contribution.points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: contribution.user_id }}">{{contribution.author}} </router-link><router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}">{{contribution.created_at | humanReadableTime}}</router-link></td></h6><br>
                <td> {{contribution.text}} </td><br>
                <v-form ref="form" v-model="valid" class="vapp">
                    <v-textarea
                            solo
                            v-model="comment"
                            :rules="commnetRules"
                            name="inputComment"
                            required
                            clearable
                            autofocus
                    ></v-textarea>
                </v-form>
                <v-btn @click="send()">ADD COMMENT</v-btn>
                <br><td></td><br>
                <template v-for="c in comments">
                    <tree-menu :key="c.id" :id="c.id" :author="c.author" :user_id="c.user_id" :created-at="c.created_at" :points="c.points" :label="c.text" :replies="c.respostes" :type="c.type" :liked="c.liked" :depth="0"></tree-menu>
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
                valid: false,
                comment: '',
                contribution: {},
                errors_contributions: [],
                comments: [],
                errors_commets: [],
                commnetRules: [
                    v => !!v || '',
                ],

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
            send:   function () {
                if(this.$refs.form.validate()) {
                    let formData;
                    formData = {
                        text: this.comment,
                        post_id: this.contribution.id,
                    }

                    HTTP.post('/comments', formData, {headers: {'Authorization': localStorage['googleId']}}).catch(e => {
                        this.errors.push(e);
                    });

                    location.reload();
                }
            }
        }
    }
</script>

<style scoped>

</style>