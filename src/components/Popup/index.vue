<template>
  <div class="pop-wrapper" v-show="show" @click="close">
    <div class="pop-content" :class="position" @click.stop>
      <transition :name="position">
        <slot v-if="show"></slot>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top'
      }
    },
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss" src="./style.scss"></style>
