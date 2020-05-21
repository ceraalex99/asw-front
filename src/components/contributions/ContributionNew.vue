<template>
    <v-list id="list" three-line>
        <v-form ref="form" v-model="valid">
            <v-container>
                <v-row>

                    <select v-model="selected">
                        <option disabled value="">Seleccione un tipo de contribucion</option>
                        <option>ASK</option>
                        <option>URL</option>
                    </select>

                    <v-col
                            cols="12"
                            md="4"
                    >
                        <v-text-field
                                v-model="title"
                                :rules="textRules"
                                label="title"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col
                            cols="12"
                            md="4" v-if = "selected === 'ASK'"
                    >
                        <v-text-field
                                v-model="text"
                                :rules="textRules"
                                label="text"
                                required
                        ></v-text-field>

                    </v-col>
                    <v-col
                            cols="12"
                            md="4"  v-else-if = "selected === 'URL'"
                    >
                        <v-text-field
                                v-model="url"
                                :rules="urlRules"
                                label="url"
                                required
                        ></v-text-field>
                    </v-col>
                    <a href="#" class="btn btn-primary" v-on:click="send">Create</a>
                </v-row>
            </v-container>
        </v-form>
    </v-list>
</template>

<script>
    import {HTTP} from '@/components/http-common'
    export default {
        data: () => ({
            valid: false,
            selected: '',
            title: '',
            text: '',
            textRules: [
                v => !!v || 'Text is required',
            ],
            url: '',
            urlRules: [
                v => !!v || 'URL is required',
                v => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(v) || 'URL must be valid',
            ],
        }),
        methods:    {
            send:   function () {
                if(this.$refs.form.validate()) {
                    var data;
                    if (this.selected === 'ASK') {
                        data = {
                            title: this.title,
                            text: this.text
                        }
                    } else {
                        data = {
                            title: this.title,
                            url: this.url
                        }
                    }

                    HTTP.post('/posts', data, {headers: {'Authorization': localStorage['googleId']}}).catch(e => {
                        this.errors.push(e);
                    });
                    this.$router.push("/contributions/newest");
                }
            }
        }
    }
</script>


<style scoped>

</style>