<template>
    <v-list id="list" three-line>
        <template v-for="(contribution, index) in contributions">
            <v-list-item :key="contribution.id" class="item">
                <v-list-item-content>
                    <v-list-item-title><a :href="contribution.url">{{contribution.title}}</a></v-list-item-title>
                    <v-list-item-subtitle>{{contribution.points}} points by {{contribution.author}} <router-link class="clink" :to="{name: 'contributionShow', params: { id: contribution.id }}">{{contribution.created_at | humanReadableTime}}</router-link></v-list-item-subtitle>
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
    import {HTTP} from '@/components/http-common'
    import moment from 'moment'


    export default {
        name: "ContributionList",
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
            HTTP.get('/posts').then(response => {
                this.contributions = response.data
            }).catch(e => {
                this.errors.push(e);
            });
        }
    }
</script>

<style scoped>

</style>