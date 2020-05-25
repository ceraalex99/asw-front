<template>
    <v-container fluid id="container">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-subtitle>
                    {{comment.points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: comment.user_id }}">{{comment.author}} </router-link> | <router-link class="clink" :to="{name: 'contributionShow', params: { id: comment.post_id }}">parent</router-link> | on: <router-link class="clink" :to="{name: 'contributionShow', params: { id: comment.post_id }}">original post</router-link>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon v-if="!owned(reply)">
                <v-icon v-if="comment.liked" @click="unlikes(comment)" color="red">mdi-heart</v-icon>
                <v-icon v-else @click="likes(comment)" @selected=false>mdi-heart-outline</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    {{comment.text}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <br><br><br>
        <v-form ref="form" v-model="valid">
            <v-row>
                <div class="spacer"></div>
                <v-textarea
                        v-model="reply"
                        :rules="replyRules"
                        name="inputReply"
                        label="Reply"
                        auto-grow
                        filled
                        clearable
                        autofocus
                ></v-textarea>
                <div class="spacer"></div>
            </v-row>
        </v-form>
        <div style="text-align: center">
            <v-btn @click="send()" outlined>ADD REPLY</v-btn>
        </div>
        <br><br><br>
        <v-list three-line :key="r.id" v-for="(r, index) in replies" style="background-color: #f6f6ef !important;">
            <tree-menu :key="r.id" :id=r.id :label="r.text" :author="r.author" :user_id="r.user_id" :created_at="r.created_at" :points="r.points" :replies="r.respostes" :type="r.type" :liked="r.liked" :depth="0"></tree-menu>
            <v-divider v-if="index + 1 < replies.length"
                       :key="index"></v-divider>
        </v-list>
    </v-container>
</template>

<script>
    import {HTTP} from '@/components/http-common'
    import moment from 'moment'
    import TreeMenu from "@/components/contributions/Tree";

    export default {
        name: "CommentShow",
        components: {TreeMenu},
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data() {
            return {
                valid: false,
                reply: '',
                comment: {},
                errors_comments: [],
                replies: [],
                errors_replies: [],
                replyRules: [
                    v => !!v || '',
                ],

            }
        },
        created() {
            HTTP.get('/comments/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.comment = response.data;
            }).catch(e => {
                this.errors_comments.push(e);
            });

            HTTP.get('/comments/' + this.$route.params.id + '/replies' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.replies = response.data;
                this.$forceUpdate();
            }).catch(e => {
                this.errors_replies.push(e);
            });
        },
        methods :{
            send:   function () {
                if(this.$refs.form.validate()) {
                    let formData;
                    formData = {
                        text: this.reply,
                        contribution_id: this.comment.id,
                    }

                    HTTP.post('/replies', formData, {headers: {'Authorization': localStorage['googleId']}}).catch(e => {
                        this.errors.push(e);
                    });

                    location.reload();
                }
            },
            likes(comment) {
                HTTP.post('/comments/'+comment.id+'/like',null,{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                    HTTP.get('/comments/'+comment.id,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                        this.comment = response.data
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }).catch(e => {
                    this.errors.push(e);
                });
            },
            unlikes(comment) {
                HTTP.delete('/comments/'+comment.id+'/like',{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                    HTTP.get('/comments/'+comment.id,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                        this.comment = response.data
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }).catch(e => {
                    this.errors.push(e);
                });
            },
            owned(comment) {
                return (comment.user_id == localStorage['userId'])
            }
        }
    }

</script>
<style scoped>

</style>