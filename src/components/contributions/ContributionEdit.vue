<template class="vapp">
    <v-form ref="form" v-model="valid" class="vapp">
        <br><br><br><br><br>
        <v-container fluid id="container">
            <v-row>
                <div class="spacer"></div>
                <v-text-field
                        v-model="title"
                        :rules="titleRules"
                        label="Title"
                        required
                        autofocus
                        clearable
                ></v-text-field>
                <div class="spacer"></div>
            </v-row>
            <v-row>
                <div class="radios">
                    <v-radio-group v-model="select" disabled>
                        <v-radio label="ASK" value="ask" ></v-radio>
                        <v-radio label="URL" value="url"></v-radio>
                    </v-radio-group>
                </div>
            </v-row>
            <v-row>
                <div class="spacer"></div>
                <v-textarea
                        v-if = "tipo === 'ask'"
                        v-model="text"
                        :rules="textRules"
                        label="Text"
                        background-color="#e6e6df"
                        filled
                        required
                        clearable
                        auto-grow
                ></v-textarea>
                <v-text-field
                        v-else-if = "tipo === 'url'"
                        v-model="url"
                        :rules="urlRules"
                        label="URL"
                        required
                ></v-text-field>
                <div class="spacer"></div>
            </v-row>
            <v-row>
                <div class="spacer"></div>
                <v-btn outlined @click="send()">UPDATE</v-btn>
                <div class="spacer"></div>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import {HTTP} from '@/components/http-common'

    export default {
        name: "ContributionEdit",
        data: () => ({
            valid: false,
            select: '',
            tipo: '',
            title: '',
            text: '',
            titleRules: [
                v => !!v || 'Title is required',
            ],
            textRules: [
                v => !!v || 'Text is required',
            ],
            url: '',
            urlRules: [
                v => !!v || 'URL is required',
                v => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v) || 'URL must be valid',
            ],
        }),
        created() {
            HTTP.get('/posts/' + this.$route.params.id ,{headers: {'Authorization': localStorage['googleId']}}).then(response => {
                this.title = response.data.title;
                this.tipo = response.data.tipo;
                this.select = response.data.tipo;
                if(response.data.tipo === 'ask'){
                    this.text = response.data.text;
                }
                else this.url = response.data.url;
            }).catch(e => {
                this.errors_contributions.push(e);
            });
        },
        methods :{
            send:   function () {
                if(this.$refs.form.validate()) {
                    let formData;
                    if (this.tipo === 'ask') {
                        formData = {
                            title: this.title,
                            text: this.text
                        }
                    } else if (this.tipo === 'url') {
                        formData = {
                            title: this.title,
                            url: this.url
                        }
                    }

                    HTTP.put('/posts/'+ this.$route.params.id, formData, {headers: {'Authorization': localStorage['googleId']}}).catch(e => {
                        this.errors.push(e);
                    });
                    this.$router.push("/contributions/newest");
                }
            }
        }
    }
</script>

<style scoped>
    .radios{
        margin:auto;
    }
</style>