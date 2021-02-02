<template>
    <div class="add-menu">
        <add-or-edit :isEdit="true"/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import addOrEdit from './components/addOrEdit.vue'
export default Vue.extend({
  components: { addOrEdit },
    name: 'EditMenu',
    data () {
        return {}
    }
})
</script>
<style lang="scss" scoped></style>
