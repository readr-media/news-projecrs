<template>
  <nav class="nav">
    <div
      :class="[
        'nav__prev-wrapper',
        { 'nav__prev-wrapper--hide': currentArticleIndex === 0 }
      ]"
      @click="handleClick('prev')"
    />
    <p
      class="nav__title"
      v-text="currentArticleTitle"
    />
    <div
      :class="[
        'nav__next-wrapper',
        { 'nav__next-wrapper--hide': currentArticleIndex === articles.length - 1 }
      ]"
      @click="handleClick('next')"
    />
  </nav>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('UnitedFront')

import _ from 'lodash'

export default {
  computed: {
    ...mapState({
      articles: state => state.articles,
      currentArticleName: state => state.nav.currentArticleName
    }),
    currentArticleIndex() {
      return _.findIndex(this.articles, [ 'name', this.currentArticleName ])
    },
    currentArticleTitle() {
      return _.get(this.articles, [ this.currentArticleIndex, 'title' ], '')
    },
    prevArticleName() {
      return _.get(this.articles, [ this.currentArticleIndex - 1, 'name' ], '')
    },
    nextArticleName() {
      return _.get(this.articles, [ this.currentArticleIndex + 1, 'name' ], '')
    }
  },
  methods: {
    handleClick(direction) {
      if (direction === 'prev') {
        this.$scrollTo(`#${this.prevArticleName}`)
        window.ga('send', 'event', 'projects', 'click', `nav bottom ${direction}`, { nonInteraction: false })
      } else {
        this.$scrollTo(`#${this.nextArticleName}`)
        window.ga('send', 'event', 'projects', 'click', `nav bottom ${direction}`, { nonInteraction: false })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  height 40px
  display flex
  justify-content space-between
  align-items center
  background-color #d8d8d8
  padding 0 16px
  &__prev-wrapper
    min-width 20px
    display flex
    justify-content center
    align-items center
    &:after
      display inline-block
      content ''
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 12px 10px 0;
      border-color: transparent #d02525 transparent transparent;
    &--hide
      &:after
        display none
  &__title
    margin 0 10px
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  &__next-wrapper
    min-width 20px
    display flex
    justify-content center
    align-items center
    &:after
      display inline-block
      content ''
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 10px 0 10px 12px;
      border-color: transparent transparent transparent #d02525;
    &--hide
      &:after
        display none
</style>
