<template>
    <div class="tree-menu">

        <div :style="indent(depth)">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title >
                        {{label}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: user_id }}">{{author}} </router-link><router-link class="clink" :to="{name: 'contributionShow', params: { id: id }}">{{created_at | humanReadableTime}}</router-link>
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
                    :like = "like"
                    :unlike="unlike"
            ></tree-menu>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        props: ['id', 'label', 'author', 'user_id','created_at', 'points', 'replies', 'type', 'liked', 'depth', 'like', 'unlike'],
        name: 'tree-menu',
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        methods: {
            owned(user_id) {
                return (user_id == localStorage['userId'])
            },
            indent(depth) {
                return "margin-left: "+depth*50+"px;"
            }
        },
        like(id, type) {
            this.like(id, type)
        },
        unlike(id, type) {
            this.unlike(id, type)
        }
    }
</script>