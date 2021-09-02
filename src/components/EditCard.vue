<template>
  <div class="forms-container gray-bg border-rad-5">
    <form @submit="editingCard"
          class="forms-container__edit-card-form width-100-present padding-10">
      <button @click="toggleEditing()"
              class="forms-container__edit-card-form-button-close">
        <font-awesome-icon icon="times"/>
      </button>
      <h3 class="forms-container__edit-card-form-header width-100-present">Редактирование задачи</h3>
      <div class="forms-container__edit-card-form-form-control">
        <input v-model="title" type="text" class="forms-container__edit-card-form-form-control-input" name="title"
               placeholder="Задача">
      </div>
      <div class="forms-container__edit-card-form-form-control">
        <input v-model="description" type="text" class="forms-container__edit-card-form-form-control-input" name="description"
               placeholder="Описание">
      </div>
      <div class="forms-container__edit-card-form-form-control">
        <input v-model="author" type="text" class="forms-container__edit-card-form-form-control-input" name="author"
               placeholder="Автор задачи">
      </div>
      <!--  Отключить если нет такого поля (в сделанных)  -->
      <div v-if="cardStatus !=='created'" class="forms-container__edit-card-form-form-control">
        <label class="forms-container__edit-card-form-form-control-label" for="start-date">Дата начала работы</label>
        <input v-model="dateOfWorkStart" type="date" class="forms-container__edit-card-for-form-control-input" name="start-date"
               id="start-date">
      </div>
      <div class="forms-container__edit-card-form-form-control">
        <input type="submit" class="forms-container__edit-card-form-form-control-submit" value="Редактировать">
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name:  "EditCard",
  props: {
    cards:      Array,
    cardID:     Number,
    cardStatus: String
  },
  data() {
    return {
      id:              this.cardID,
      title:           '',
      description:     '',
      author:          '',
      dateOfCreation:  "",
      dateOfWorkStart: '',
      status:          '',
      timeSpend:       0
    }
  },
  methods: {
    ...mapActions(['editCard']),
    toggleEditing() {this.$emit('toggle-editing')},
    editingCard(e) {
      e.preventDefault()
      let edited    = {}
      let matchCard = {}
      this.cards.map((card) => {
        if (card.id === this.cardID) {
          return matchCard = card
        }
      });
      edited = {
        id:              this.cardID,
        title:           this.title !== "" ? this.title : matchCard.title,
        description:     this.description !== "" ? this.description : matchCard.description,
        author:          this.author !== "" ? this.author : matchCard.author,
        dateOfCreation:  matchCard.dateOfCreation,
        dateOfWorkStart: this.dateOfWorkStart !== "" ? this.dateOfWorkStart : matchCard.dateOfWorkStart,
        status:          this.status !== "" ? this.status : matchCard.status,
        timeSpend:       this.timeSpend !== 0 ? this.timeSpend : matchCard.timeSpend
      }
      this.editCard(edited, edited.id)
      this.toggleEditing()

    }
  }
}
</script>
<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';
@import '../assets/styles/modifiers';

.forms-container {
  @include forms-container;
  @include absolute-centered;

  &__edit-card-form {
    @include display-flex;
    @include max-size;
    position:        relative;
    justify-content: center;
    align-items:     flex-start;
    text-align:      center;

    &-header {
      margin-bottom: 20px;
      @include width-100-present;
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
      height:     70px;
      text-align: center;

      &-input, &-submit {
        @include input('focus');
      }

      &-submit {
        background: $color-secondary;
        color:      $white;
      }

      &-label {
        font-size: 14px;
      }
    }
  }
}
</style>