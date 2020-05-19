<template>
    <table>
        <div v-for="contribution of contributions" :key="contribution.id">
            <tr>
                <td>*</td><td>{{contribution.url}}</td>
            </tr>
            <tr>
                <td></td><td>{{contribution.points}} points by {{contribution.author}} {{contribution.createdAt | humanReadableTime}}</td>
            </tr>
        </div>
    </table>
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
                   msg: "Holiwi",
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
    td {
        text-align: left;
    }
    table{
        width:85%;
        background-color: #f6f6ef;
        margin-left: auto;
        margin-right: auto;
    }
</style>