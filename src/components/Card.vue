<template>
  <li @dblclick="moveCard(id, status)"
      class="columns-container__column-created-cards-cards-row-item-list-card-item border-rad-5 m-5 padding-10">
    <div class="columns-container__column-created-cards-cards-row-item-list-card-item-card text-small">
      <div class="columns-container__column-created-cards-cards-row-item-list-card-item-card-header">
        <p class="columns-container__column-created-cards-cards-row-item-list-card-item-header-text">
          <span class="columns-container__column-created-cards-cards-row-item-list-card-item-header-text-title-status">
            {{title}} - [{{status}}]
          </span>
          <span class="columns-container__column-created-cards-cards-row-item-list-card-item-header-text-author-creation-date">
            {{author}}
            <br>
            {{new Date(dateOfCreation).toLocaleDateString("RUS")}}
          </span>
        </p>
      </div>
      <div class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body">
        <div class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-actions">
        <button @click="toggleEditing()"
            class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-actions-edit pointer no-border border-rad-5">
          <font-awesome-icon icon="pencil-alt" class="icon" />
        </button>
          <br>
          <button @click="deleteCard(id)"
              class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-actions-delete pointer no-border border-rad-5">
          <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
        <div class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-info">
        <p class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-description">{{description}}</p>
        <p class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-dates-start" v-if="dateOfWorkStart !== ''">Дата начала работы: {{new Date(dateOfWorkStart).toLocaleDateString("RUS")}}</p>
        <p class="columns-container__column-created-cards-cards-row-item-list-card-item-card-body-timestamp" v-if="timeSpend !== 0">Потраченные часы: {{timeSpends}}</p>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "Card",
  props:{
    id:Number,
  title:String,
  description:String,
  author:String,
  dateOfCreation:String,
  dateOfWorkStart:String,
  status:String,
  timeSpend:Number,
},
  methods:{
    ...mapActions(['manageCards', 'countHours']),
    moveCard(id){
      this.manageCards(id, status)
      this.$emit("move-card", id);},
    deleteCard(id) {this.$emit('delete-card', id)},
    toggleEditing(){this.$emit('toggle-editing')},
  },
  computed:{
    today:  function(){return new Date()},
    timeSpends: function(){
      if(this.status === "в работе"){
        let startDate = new Date(this.dateOfWorkStart)
        let countHours = Number.parseInt(((this.today - startDate) / (1000 * 3600 * 24))*8);
        // Объект для передачи в vuex - нужен т.к хранилище не принимает два аргумента
        let data = {
          id: this.id,
          hours: countHours
        }
        this.countHours(data)
        return countHours
      }
      if(this.status === "в работе"){
        return this.timeSpend
      }
      return this.timeSpend
    }
  },
  emits: ['move-card', 'delete-card', 'toggle-editing']
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/mixins';
@import '../assets/styles/modifiers';
.columns-container__column-created-cards-cards-row-item-list-card-item{
  background: #fff;
  &-card-header{font-weight: 600;}
  &-header-text{
    @include display-flex;
    border-bottom: solid 2px #f6f6f6;
    justify-content: space-between;
    flex-direction: row;
    &-author-creation-date{text-align: end;}
  }
  &-card-body-dates-start{border-top: solid 2px #f6f6f6;}
  &-card-body-actions{
    text-align: end;
    position: relative;
      button{
        opacity: 0;
        position: absolute;
        right: 1%;
        margin: 1px;
        padding: 3px;
      }
    button:hover{
      opacity: 0.5;
      background: #b6b6b6;
      border-radius: 5px;
    }
      &-edit{
        @include transparent;
        @include action-hover('hover');
        top: 1%
      }
      &-delete{
        @include transparent;
        @include action-hover('hover');
        top: 120%;
      }
  }
}
</style>