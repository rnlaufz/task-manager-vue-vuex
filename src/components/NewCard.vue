<template>
  <div class="forms-container gray-bg border-rad-5">
    <form @submit="addNewCard" class="forms-container__new-card-form padding-10">
      <h3 class="forms-container__new-card-form-header">Добавить задачу</h3>
      <button class="forms-container__edit-card-form-button-close" @click="toggleNew(status = '')">
        <font-awesome-icon
            icon="times"/>
      </button>
      <div class="forms-container__new-card-form-form-control">
        <input type="text" class="forms-container__new-card-form-form-control-input" name="title" v-model="title" placeholder="Задача">
      </div>
      <div class="forms-container__new-card-form-form-control">
        <input type="text" class="forms-container__new-card-form-form-control-input" name="author" v-model="author" placeholder="Автор задачи">
      </div>
      <div class="forms-container__new-card-form-form-control">
        <input type="text" class="forms-container__new-card-form-form-control-input" name="description" v-model="description" placeholder="Описание">
      </div>
      <div class="forms-container__new-card-form-form-control">
        <input type="submit" class="forms-container__new-card-form-form-control-submit" value="Новая задача">
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name:    "NewCard",
  props:   {columnStatus: String},
  data:    function() {
    return {
      id:             Math.floor(Math.random() * 100000),
      title:          '',
      description:    '',
      author:         '',
      dateOfCreation: new Date().toDateString(),
      timeSpend:      0
    }
  },
  methods: {
    ...mapActions(['addCard']),
    toggleNew(status) {this.$emit('toggle-new', status)},
    addNewCard(e) {
      e.preventDefault()
      let newCard = {
        id:              this.id,
        title:           this.title,
        description:     this.description,
        author:          this.author,
        dateOfCreation:  this.dateOfCreation,
        dateOfWorkStart: "",
        status:          this.columnStatus,
        timeSpend:       this.timeSpend
      };
      this.addCard(newCard)
      this.toggleNew()
    }
  },
  emits:   ['new-card']
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';
@import '../assets/styles/modifiers';

.forms-container {
  @include forms-container;
  @include absolute-centered;

  &__new-card-form {
    @include display-flex;
    @include max-size;
    @include width-100-present;
    justify-content: center;
    align-items:     flex-start;
    text-align:      center;

    &-header {
      @include width-100-present;
      margin-bottom: 20px;
    }

    &-button-close {
      @include input('focus');
      width:      20px;
      background: none;
      position:   absolute;
      top:        5px;
      right:      5px;
    }

    &-form-control {
      @include width-100-present;
      height:     50px;
      text-align: center;

      &-input, &-submit {
        @include input('focus');
      }

      &-submit {
        background: $color-secondary;
        color:      $white;
      }
    }
  }
}
</style>