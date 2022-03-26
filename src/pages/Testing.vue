<template>
  <div class="container">
    <div v-if="words.length">
      <div class="variant d-flex  mt-5 mb-5 justify-content-between">
        <div class="mb-3" @click="compare(word)" v-for="(word,index) in wordsToShow" :key="index">
          <div class="variant-text ">{{ word.word }}</div>
        </div>
      </div>
      <div class="text-center random">
        <div class="random-word">
          {{ randomWordToShow.translate }}
        </div>
      </div>
      <div>
        <b-modal id="modal-1" title="Modal with Popover" ok-title="Go Home" ok-only @ok="goHome" hide-header-close>
          <template slot="modal-title">Result</template>
          <div class="my-4 d-flex justify-content-center">
            <div class="m-3 text-result-done">True: {{ countOfTrueResult }}</div>
            <div class="m-3 text-result-error">Wrong: {{ countOfFalseResult }}</div>
          </div>
        </b-modal>
      </div>
    </div>
    <div class="mt-5 text-muted   text-center" v-else>
      <h3> Words not yet added !</h3>
      <p class="mt-2  text-muted">
        <router-link to="/">Go Home</router-link>
      </p>

    </div>

  </div>
</template>

<script>
import _ from "lodash"
import {db} from "@/db";

export default {
  name: "Testing",
  data: () => ({
    words: [],
    index: 0,
    count: 3,
    result: []
  }),
  created() {
      db.collection('words')
          .get()
          .then(querySnapshot => {
            this.words = querySnapshot.docs.map(doc => doc.data())
          })
  },
  methods: {
    goHome() {
      this.$router.push("/")
    },
    randomBetween(min = 1, max = 10) {
      return Math.floor(Math.random() * max) + min;
    },
    compare(word) {
      this.result.push(word.word === this.randomWordToShow.word)
      if (this.words.length - (this.index + this.count) >= 3) {
        this.index += this.count
      } else {
        this.$bvModal.show('modal-1')
      }
    }
  },
  computed: {
    shuffleWords() {
      return _.shuffle(this.words)
    },
    countOfTrueResult() {
      return this.result.filter(variant => variant).length
    },
    countOfFalseResult() {
      return this.result.filter(variant => !variant).length
    },
    wordsToShow() {
      return this.shuffleWords.slice(this.index, this.index + this.count)
    },
    randomNumberToShow() {
      return this.randomBetween(0, 2)
    },
    randomWordToShow() {
      return this.wordsToShow[this.randomNumberToShow]
    }
  },
}
</script>

<style scoped lang="scss">
.random {
  margin-top: 200px;
  font-size: 24px;
}

.random-word {
  display: flex;
  align-items: center;
  justify-content: center;
  border: #0ECAF0 solid 1px;
  color: #0ECAF0;
  border-radius: 5px;
  height: 100px;
}

.text-result-done {
  font-size: 20px;
  color: #11a111;
}

.text-result-error {
  font-size: 20px;
  color: #e84141;
}

.title-modal {
  font-size: 20px;
  display: flex;
  align-self: center;
}

.text-result {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
}

.variant-text {
  display: flex;
  justify-content: center;
  align-items: center;
  border: #747474 solid 1px;
  border-radius: 5px;
  padding: 20px 15px;
  user-select: none;

  &:hover {
    transition: .2s;
    cursor: pointer;
    border: #0ECAF0 solid 1px;
    color: #0ECAF0;
  }
}

@media screen and (max-width: 500px) {
  .variant {
    display: flex;
    flex-direction: column;
  }
  .random {
    margin-top: 100px;
    font-size: 20px;
  }
}
</style>
