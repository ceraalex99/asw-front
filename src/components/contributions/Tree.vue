<template>
    <div class="tree-menu">

        <div :style="indent(depth)">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title >
                        {{label}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: user_id }}">{{author}} </router-link><router-link v-if="type==='Comment'" class="clink" :to="{name: 'commentShow', params: { id: id }}">{{created_at | humanReadableTime}}</router-link><router-link v-else-if="type==='Reply'" class="clink" :to="{name: 'replyShow', params: { id: id }}">{{created_at | humanReadableTime}}</router-link>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon v-if="!owned(user_id)">
                    <v-icon v-if="liked" @click="unlike(id, type)" color="red">mdi-heart</v-icon>
                    <v-icon v-else @click="like(id, type)" @selected=false>mdi-heart-outline</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </div>
            <tree-menu
                    v-bind:key="reply.id"
                    v-for="reply in replies"
                    :id="reply.id"
                    :label="reply.text"
                    :author="reply.author"
                    :user_id="reply.user_id"
                    :created_at="reply.created_at"
                    :points="reply.points"
                    :replies="reply.respostes"
                    :type="reply.type"
                    :liked="reply.liked"
                    :depth="depth +1"
            ></tree-menu>
    </div>
</template>

<script>
    import moment from "moment";
    import {HTTP} from '@/components/http-common'

    export default {
        props: ['id', 'label', 'author', 'user_id','created_at', 'points', 'replies', 'type', 'liked', 'depth'],
        name: 'tree-menu',
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        methods: {
            like(id, type) {
                if(type === 'comment'){
                    HTTP.post('/comments/'+ id +'/like', null,{headers: {'Authorization': localStorage['googleId']}});
                }
                else { //type = reply
                    HTTP.post('/replies/'+ id +'/like', null,{headers: {'Authorization': localStorage['googleId']}});
                }
                location.reload();
            },
            unlike(id, type) {
                if(type === 'comment'){
                    HTTP.delete('/comments/'+ id +'/like',{headers: {'Authorization': localStorage['googleId']}});
                }
                else { //type = reply
                    HTTP.delete('/replies/'+ id +'/like',{headers: {'Authorization': localStorage['googleId']}});
                }
                location.reload();
            },

            owned(user_id) {
                return (user_id == localStorage['userId'])
            },
            indent(depth) {
                return "margin-left: "+depth*50+"px;"
            }
        }
    }
</script>