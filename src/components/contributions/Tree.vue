<template>
    <div class="tree-menu">
        <div :style="indent">
            <v-row v-if="!owned(user_id)">
                {{label}}
                <v-icon v-if="liked" @click="unlike(id, type)">mdi-heart</v-icon>
                <v-icon v-else @click="like(id, type)" @selected=false>mdi-heart-outline</v-icon>
            </v-row>
            <v-row v-else>
                {{label}}
            </v-row>
        </div>
        <h6><td :style="indent">{{points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: user_id }}">{{author}} </router-link><router-link class="clink" :to="{name: 'contributionShow', params: { id: id }}">{{created_at | humanReadableTime}}</router-link></td></h6><br>
        <template>
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
        </template>
    </div>
</template>

<script>
    import moment from "moment";
    import {HTTP} from '@/components/http-common'

    export default {
        props: ['id', 'label', 'author', 'user_id','created_at', 'points', 'replies', 'type', 'liked', 'depth'],
        name: 'tree-menu',
        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)`}
            }
        },
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
            }
        }
    }
</script>