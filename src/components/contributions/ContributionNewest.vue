<template>
    <v-list id="list" three-line>
        <template v-for="(contribution, index) in contributions">
            <v-list-item :key="contribution.id">
                <v-list-item-content>
                    <router-link v-if="contribution.tipo==='ask'" :to="{name: 'contributionShow', params: { id: contribution.id }}"><v-list-item-title>{{contribution.title}}</v-list-item-title></router-link>
                    <v-list-item-title v-else><a :href="contribution.url">{{contribution.title}}</a></v-list-item-title>
                    <v-list-item-subtitle>{{contribution.points}} points by <router-link class="clink" :to="{name: 'userShow', params: { id: contribution.user_id }}">{{contribution.author}} </router-link><router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}">{{contribution.created_at | humanReadableTime}}</router-link></v-list-item-subtitle>
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
    import moment from "moment";
    import {HTTP} from "@/components/http-common";

    export default {
        name: "ContributionNewest",
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
            HTTP.get('/posts/newest',{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.contributions = response.data
            }).catch(e => {
                this.errors.push(e);
            });
        }
    }
</script>

<style scoped>

</style>