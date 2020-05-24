<template>
    <v-list id="list" three-line>
        <template v-for="(contribution, index) in contributions">
            <v-list-item :key="contribution.id" class="item">
                <v-list-item-content>
                    <v-list-item-title>{{contribution.text}}</v-list-item-title>
                    <v-list-item-subtitle>
                        {{contribution.points}} points by
                        <router-link class="clink" :to="{name: 'userEdit', params: { id: contribution.user_id }}" v-if="owned(contribution)">{{contribution.author}}</router-link>
                        <router-link class="clink" :to="{name: 'userShow', params: { id: contribution.user_id }}" v-else>{{contribution.author}}</router-link>
                        <router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}"> {{contribution.created_at | humanReadableTime}}</router-link> | <router-link v-if="contribution.type==='Comment'" class="clink" :to="{name: 'contributionShow', params: { id: contribution.post_id }}">parent</router-link><router-link v-else class="clink" :to="{name: 'commentShow', params: { id: contribution.contribution_id }}">parent</router-link> | <router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.post_id }}">original post</router-link>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon v-if="!owned(contribution)">
                    <v-icon v-if="contribution.liked" @click="unlike(contribution)" color="red">mdi-heart</v-icon>
                    <v-icon v-else @click="like(contribution)" @selected=false>mdi-heart-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-icon v-else>
                    <v-icon @click="remove(contribution)">mdi-trash-can-outline</v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-divider
                    v-if="index + 1 < contributions.length"
                    :key="index"
            ></v-divider>
        </template>
    </v-list>
</template>

<script>
    import {HTTP} from "@/components/http-common";
    import moment from "moment";

    export default {
        name: "UpvotedComments",
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data() {
            return {
                errors: [],
                contributions: [],
                id: 0
            }
        },
        created() {
            this.id=this.$route.params.id;
            HTTP.get('/users/'+this.id+'/upvoted_comments',{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.contributions = response.data
            }).catch(e => {
                this.errors.push(e);
            });
        },
        methods: {
            like(contribution) {
                if(contribution.type === 'Reply'){
                    HTTP.post('/replies/' + contribution.id + '/like', null, {headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/users/' + this.id + '/upvoted_comments', {headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contributions = response.data
                        }).catch(e => {
                            this.errors.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
                else if(contribution.type === 'Comment') {
                    HTTP.post('/comments/' + contribution.id + '/like', null, {headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/users/' + this.id + '/upvoted_comments', {headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contributions = response.data
                        }).catch(e => {
                            this.errors.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
            },
            unlike(contribution) {
                if(contribution.type === 'Reply'){
                    HTTP.delete('/replies/'+contribution.id+'/like',{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/users/'+this.id+'/upvoted_comments',{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contributions = response.data
                        }).catch(e => {
                            this.errors.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
                else if(contribution.type === 'Comment') {
                    HTTP.delete('/comments/' + contribution.id + '/like', {headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/users/' + this.id + '/upvoted_comments', {headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contributions = response.data
                        }).catch(e => {
                            this.errors.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
            },
            owned(contribution) {
                return (contribution.user_id == localStorage['userId'])
            },
            remove(contribution) {
                if(contribution.type === 'Reply'){
                    HTTP.delete('/replies/'+contribution.id,{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/users/'+localStorage['userId']+'/upvoted_comments',{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contributions = response.data
                        }).catch(e => {
                            this.errors.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
                else if(contribution.type === 'Comment'){
                    HTTP.delete('/comments/'+contribution.id,{headers: {'Authorization': localStorage['googleId']}}).then(() => {
                        HTTP.get('/users/'+localStorage['userId']+'/upvoted_comments',{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                            this.contributions = response.data
                        }).catch(e => {
                            this.errors.push(e);
                        });
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>