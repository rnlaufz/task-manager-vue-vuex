<template>
  <div id="app">
    <div class="columns-container padding-10">
      <Column v-bind:key="column" v-for="column in columnTypes"
              :columnType="column"
              :createdCards="createdC"
              :processCards="process"
              :completedCards="completed"
              @move-card="moveCard"
              @toggle-editing="toggleEditing"
              @toggle-new="toggleNew"
      />
    </div>
    <NewCard v-if="callNewCardForm"
             @toggle-new="toggleNew"
             :columnStatus="columnStatus"
    />
    <EditCard v-if="callEditForm"
              :cardID="cardID"
              :cards="allCards"
              :cardStatus="cardStatus"
              @toggle-editing="toggleEditing"
    />
  </div>
</template>

<script>
import Column from "./components/Column";
import NewCard from "@/components/NewCard";
import EditCard from "@/components/EditCard";

import {mapGetters, mapActions} from 'vuex'

export default {
  name:       'App',
  components: {
    NewCard,
    EditCard,
    Column
  },
  data() {
    return {
      callEditForm:    false,
      callNewCardForm: false,
      cardID:          0,
      cardStatus:      '',
      columnStatus:    '',
      columnTypes:     ['created', 'in-work', 'completed']
    }
  },
  computed: {
    createdC:  function() {
      return this.allCards.filter((card) => card.status === "created")
    },
    process:   function() {
      return this.allCards.filter((card) => card.status === "in-work")
    },
    completed: function() {
      return this.allCards.filter((card) => card.status === "completed")
    },
    ...mapGetters(["allCards"])
  },
  methods:  {
    ...mapActions(['fetchCards', 'deleteCard']),
    moveCard(id) {
      let today = new Date();
      this.allCards.map((card) => {
        // при перемещнии меняется статус и добавляется дата начала работы при пиреходе от "создана" к "в работе"
        switch (true) {
          case card.status === "created" && card.id === id:
            card.status          = "in-work";
            card.dateOfWorkStart = today.toDateString();
            card.timeSpend       = 0;
            break;
          case card.status === "in-work" && card.id === id:
            card.status = "completed"
            break;
          case card.status === "completed" && card.id === id:
            this.deleteCard(id);
            break;
          default:
            return this.allCards;
        }
      });
    },
    toggleNew(status) {
      this.columnStatus    = status;
      this.callEditForm    = false;
      this.callNewCardForm = !this.callNewCardForm;
    },
    toggleEditing(id, status) {
      this.cardID          = id;
      this.cardStatus      = status;
      this.callNewCardForm = false;
      this.callEditForm    = !this.callEditForm;
    },
  },
  created() {
    this.fetchCards()
  },

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import 'assets/styles/variables';
@import 'assets/styles/mixins';
@import 'assets/styles/modifiers';

* {
  margin:      0;
  padding:     0;
  box-sizing:  border-box;
  font-family: 'Roboto', sans-serif;
}

#app {
  position: relative;
  width:    100%;
  height:   100%;
}

.columns-container {
  @include max-size;
  @include display-flex;
  align-items:     flex-start;
  justify-content: space-evenly;
  flex-direction:  row;
}
</style>



