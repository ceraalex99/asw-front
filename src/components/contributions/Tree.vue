<template>
    <div class="tree-menu">
        <div :style="indent"> {{label}} </div>
        <template>
            <tree-menu
                    v-bind:key="reply.id"
                    v-for="reply in replies"
                    :label="reply.text"
                    :author="reply.author"
                    :created-at="reply.createdAt"
                    :points="reply.points"
                    :replies="reply.respostes"
                    :depth="depth +1"
            ></tree-menu>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['label', 'author', 'createdAt', 'points', 'replies', 'depth'],
        name: 'tree-menu',
        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)`}
            }
        }
    }
</script>