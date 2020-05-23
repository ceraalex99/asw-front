<template>
    <v-container fluid id="container">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>
                    {{contribution.title}}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{contribution.points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: contribution.user_id }}">{{contribution.author}} </router-link><router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}">{{contribution.created_at | humanReadableTime}}</router-link>
                </v-list-item-subtitle>

            </v-list-item-content>

        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    {{contribution.text}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <br><br><br>
        <v-form ref="form" v-model="valid">
            <v-row>
                <div class="spacer"></div>
                <v-textarea
                        v-model="comment"
                        :rules="commentRules"
                        name="inputComment"
                        label="Comment"
                        auto-grow
                        filled
                        clearable
                ></v-textarea>
                <div class="spacer"></div>
            </v-row>
        </v-form>
        <div style="text-align: center">
        <v-btn @click="send()" outlined >ADD COMMENT</v-btn>
        </div>
        <br><br><br>
        <v-list three-line :key="c.id" v-for="(c, index) in comments" style="background-color: #f6f6ef !important;">
            <tree-menu :key="c.id" :id=c.id :label="c.text" :like="like" :unlike="unlike" :author="c.author" :user_id="c.user_id" :created_at="c.created_at" :points="c.points" :replies="c.respostes" :type="c.type" :liked="c.liked" :depth="0"></tree-menu>
            <v-divider v-if="index + 1 < comments.length"
                       :key="index"></v-divider>
        </v-list>
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
                errors_comments: [],
                commentRules: [
                    v => !!v || ''
                ]
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
                    HTTP.post('/comments', formData, {headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        this.comment = ''
                        HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contribution = response.data;
                        }).catch(e => {
                            this.errors_contributions.push(e);
                        });
                        HTTP.get('/posts/' + this.$route.params.id + '/comments' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.comments = response.data;
                        }).catch(e => {
                            this.errors_comments.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
            },
            like(id, type) {
                if(type === 'Comment'){
                    HTTP.post('/comments/'+ id +'/like', null,{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contribution = response.data;
                        }).catch(e => {
                            this.errors_contributions.push(e);
                        });
                        HTTP.get('/posts/' + this.$route.params.id + '/comments' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.comments = response.data;
                        }).catch(e => {
                            this.errors_comments.push(e);
                        });
                    });
                }
                else { //type = reply
                    HTTP.post('/replies/'+ id +'/like', null,{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contribution = response.data;
                        }).catch(e => {
                            this.errors_contributions.push(e);
                        });
                        HTTP.get('/posts/' + this.$route.params.id + '/comments' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.comments = response.data;
                        }).catch(e => {
                            this.errors_comments.push(e);
                        });
                    });
                }
            },
            unlike(id, type) {
                if(type === 'Comment'){
                    HTTP.delete('/comments/'+ id +'/like',{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contribution = response.data;
                        }).catch(e => {
                            this.errors_contributions.push(e);
                        });
                        HTTP.get('/posts/' + this.$route.params.id + '/comments' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.comments = response.data;
                        }).catch(e => {
                            this.errors_comments.push(e);
                        });
                    });
                }
                else { //type = reply
                    HTTP.delete('/replies/'+ id +'/like',{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contribution = response.data;
                        }).catch(e => {
                            this.errors_contributions.push(e);
                        });
                        HTTP.get('/posts/' + this.$route.params.id + '/comments' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.comments = response.data;
                        }).catch(e => {
                            this.errors_comments.push(e);
                        });
                    });
                }
            }
        }
    }
</script>

<style scoped>
</style>