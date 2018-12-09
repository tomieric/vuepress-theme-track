<template>
    <section v-show="isActive"
      :aria-hidden="!isActive"
      class="tabs-component-panel"
      :class="{ active: isActiveClass }"
      :id="computedId"
      role="tabpanel"
    >
      <slot />
    </section>
</template>

<script>
  export default {
    props: {
      id: { default: null },
      name: { required: true },
      prefix: { default: '' },
      suffix: { default: '' },
      isDisabled:{ default: false }
    },
    data: () => ({
      isActive: false,
      isVisible: true,
      isActiveClass: ''
    }),
    computed: {
      header() {
        return this.prefix + this.name + this.suffix
      },
      computedId() {
        return this.id ? this.id : this.name.toLowerCase().replace(/ /g, '-')
      },
      hash() {
        if (this.isDisabled) {
            return '#'
        }
        return '#' + this.computedId
      }
    },
    watch: {
      isActive () {
        setTimeout(() => {
          this.isActiveClass = this.isActive ? 'active' : ''
        }, 0)
      }
    }
  }
</script>