<template>
<div>
    <a class="icon-help" @click="showModal = true"></a>

    <div class="modal" :class="{'is-active': showModal}">
        <div class="modal-background" @click="showModal = false"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">On Tap</p>
                <button class="delete" @click="showModal = false"></button>
            </header>
            <section class="modal-card-body">
                Welcome to my Hackfest project!<br> This app was built to try out the
                <a href="https://vuejs.org/" target="_blank">Vue.js</a> framework.  Feel free to
                play around with it, the data will be reset.
            </section>
            <section class="modal-card-body">
                <li>Double-click on a beer item to edit or delete it.</li>
                <li>Drag-and-drop beer items to change their displayed order.</li>
                <br><br>
            </section>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'help',
    data () {
        return {
            showModal: false
        }
    }
}
</script>

<style scoped>
.icon-help {
    font-size: 1.5em;
    position: absolute;
    right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    border: 2px solid #333;
    background-color: #666;
}
.icon-help:before {
    content: "\2754";
}
</style>
