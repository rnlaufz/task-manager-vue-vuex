<template>
  <div class="columns-container__column-created-cards width-300 gray-bg my-10 padding-10 border-rad-5">
    <h3 class="columns-container__column-created-cards-header"> {{
        columnType === "created" ? "Созданные задачи" :
            columnType === "in-work" ? "Задачи в работе" : columnType === "completed" ? "Завершенные задачи" : columnType
      }}</h3>
    <div class="columns-container__column-created-cards-cards-row">
      <ul class="columns-container__column-created-cards-cards-row-item-list no-decorator">
        <Card @move-card="moveCard(card.id)"
              @delete-card="deletingCard(card.id)"
              @toggle-editing="toggleEditing(card.id, card.status)"
              v-bind:key="card.id +`C`"
              v-for="card in this.columnType === 'created' ? this.createdCards : this.columnType === 'in-work' ?
              this.processCards : this.columnType === 'completed' ? this.completedCards : [] "
              :id="card.id"
              :title="card.title"
              :description="card.description"
              :author="card.author"
              :dateOfCreation="card.dateOfCreation"
              :dateOfWorkStart="card.dateOfWorkStart"
              :status="columnType === 'created' ? 'создана' : columnType === 'in-work' ?
              'в процессе' : columnType === 'completed' ? 'завершена' : ''"
              :timeSpend="card.timeSpend"/>
      </ul>
    </div>
    <div class="columns-container__column-created-cards-footer disp-flex">
      <button v-if="columnType !== 'completed'" @click="toggleNew(columnType)"
              class="columns-container__column-created-cards-footer-button no-border align-text-start padding-tlb-5-10-5 pointer no-focus">
        <font-awesome-icon icon="plus"/>
        Добавить задачу
      </button>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import {mapActions} from 'vuex';

export default {
  name:  "CreatedColumn",
  props: {
    columnType:     String,
    createdCards:   Array,
    processCards:   Array,
    completedCards: Array
  },
  data() {return {columnStatus: "created"}},
  components: {Card},
  methods:    {
    ...mapActions(['deleteCard']),
    moveCard(id) {this.$emit('move-card', id);},
    deletingCard(id) {
      this.deleteCard(id)
    },
    toggleEditing(id, status) {this.$emit('toggle-editing', id, status)},
    toggleNew(status) {
      this.$emit('toggle-new', status)
    }
  },
  emits:      ['move-card', 'delete-card', 'toggle-editing', "toggle-new"],
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';
@import '../assets/styles/modifiers';

.columns-container__column-created-cards {
  &-header {
    padding: 0 0 5px 5px
  }

  &-footer {
    align-items: start;

    &-button {
      @include button-hover('hover');
      @include transparent;
    }
  }
}
</style>