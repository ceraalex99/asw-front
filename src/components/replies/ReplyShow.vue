<template>
    <v-container fluid id="container">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-subtitle>
                    {{reply.points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: reply.user_id }}">{{reply.author}} </router-link> | <router-link v-if= "reply.parent_type ==='Comment'" class="clink" :to="{name: 'commentShow', params: { id: reply.contribution_id }}">parent</router-link><router-link v-else-if= "reply.parent_type ==='Reply'" class="clink" :to="{name: 'replyShow', params: { id: reply.contribution_id }}">parent</router-link> | on: <router-link class="clink" :to="{name: 'contributionShow', params: { id: reply.post_id }}">original post</router-link>
                </v-list-item-subtitle>
            </v-list-item-content>

        </v-list-item>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>
                    {{reply.text}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <br><br><br>
        <v-form ref="form" v-model="valid">
            <v-row>
                <div class="spacer"></div>
                <v-textarea
                        v-model="newreply"
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
                newreply: '',
                reply: {},
                errors_reply: [],
                replies: [],
                errors_replies: [],
                replyRules: [
                    v => !!v || '',
                ],
            }
        },
        created() {
            HTTP.get('/replies/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.reply = response.data;
            }).catch(e => {
                this.errors_comments.push(e);
            });

            HTTP.get('/replies/' + this.$route.params.id + '/replies' ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
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
                        text: this.newreply,
                        contribution_id: this.reply.id,
                    }

                    HTTP.post('/replies', formData, {headers: {'Authorization': localStorage['googleId']}}).catch(e => {
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