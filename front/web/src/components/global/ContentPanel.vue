<template>
  <div class="bg-grey-3" :class="padding">
    <div :class="`row bg-${color} border-panel`">
      <div class="col q-pa-md">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ContentPanel',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    first: {
      // Usar cuando el panel es el primero en la vista. Ejemplo <content-panel first/ >
      type: Boolean,
      default: false
    },
    noPaddingRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    padding() {
      if (this.first) {
        return 'q-pt-md q-pl-md q-pr-md'
      } else if (this.noPaddingRight) {
        return 'q-py-md q-pl-md'
      }
      return 'q-pa-md'
    }
  }
}
</script>
