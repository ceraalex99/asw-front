<template class="vapp">
    <v-form ref="form" v-model="valid" class="vapp">
        <br><br><br><br><br>
        <v-container>
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
                    <v-radio-group v-model="select" >
                        <v-radio label="ASK" value="ASK" ></v-radio>
                        <v-radio label="URL" value="URL"></v-radio>
                    </v-radio-group>
                </div>
            </v-row>
            <v-row>
                <div class="spacer"></div>
                <v-textarea
                        v-if = "select === 'ASK'"
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
                        v-else-if = "select === 'URL'"
                        v-model="url"
                        :rules="urlRules"
                        label="URL"
                        required
                ></v-text-field>
                <div class="spacer"></div>
            </v-row>
            <v-row v-if="checkLogged()">
                <div class="spacer"></div>
                <v-btn outlined @click="send()">SUBMIT</v-btn>
                <div class="spacer"></div>
            </v-row>
            <div v-else>
                <v-row>
                    <div class="spacer"></div>
                    <v-btn outlined disabled>SUBMIT</v-btn>
                    <div class="spacer"></div>
                </v-row>
                <v-row>
                    <div class="spacer"></div>
                    <span style="color:red">No estàs logejat</span>
                    <div class="spacer"></div>
                </v-row>
            </div>
        </v-container>
    </v-form>

</template>

<script>
    import {HTTP} from '@/components/http-common'
    export default {
        data: () => ({
            valid: false,
            select: 'ASK',
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
        methods:    {
            send:   function () {
                if(this.$refs.form.validate()) {
                    let formData;
                    if (this.select === 'ASK') {
                        formData = {
                            title: this.title,
                            text: this.text
                        }
                    } else {
                        formData = {
                            title: this.title,
                            url: this.url
                        }
                    }

                    HTTP.post('/posts', formData, {headers: {'Authorization': localStorage['googleId']}}).then(response => {
                        if(response.status === 200) {
                            this.$router.push("/contributions/" + response.data.id);
                        }
                        else this.$router.push("/contributions/newest");
                    }).catch(e => {
                        this.errors.push(e);
                    });
                }
            },
            checkLogged() {
                return 'userId' in localStorage
            },
        }
    }
</script>


<style scoped>
    .radios{
        margin:auto;
    }
</style>