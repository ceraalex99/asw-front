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
                        <router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}"> {{contribution.created_at | humanReadableTime}}</router-link> | <router-link v-if="contribution.type==='Comment'" class="clink" :to="{name: 'contributionShow', params: { id: contribution.contribution_id }}">parent</router-link><router-link v-else class="clink" :to="{name: 'commentShow', params: { id: contribution.contribution_id }}">parent</router-link> | <router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.post_id }}">original post</router-link>
                    </v-list-item-subtitle>
                </v-list-item-content>
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
        name: "ContributionThreads",
        filters: {
            humanReadableTime: function(value) {
                return moment(value).fromNow();
            }
        },
        data() {
            return {
                errors: [],
                contributions: []
            }
        },
        created() {
            HTTP.get('/users/'+localStorage['userId']+'/comments',{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.contributions = response.data
            }).catch(e => {
                this.errors.push(e);
            });
        },
        methods: {
            owned(contribution) {
                return (contribution.user_id == localStorage['userId'])
            }
        }
    }
</script>

<style scoped>

</style>