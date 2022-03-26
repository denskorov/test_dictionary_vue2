<template>
  <b-container>
    <div class="d-flex content-cards row">
      <div class="col-6 card-words text-center">
        <div class="card-games" :class="{active:activeWord&&activeWord.word===ref.ref.word}"
             @click="setActiveWord(ref)"
             v-for="(ref,index) in wordRef"
             :key="index">{{ ref.word }}
        </div>
      </div>
      <div class="col-6 card-translates text-center">
        <div class="card-games" v-for="(ref,index) in translateRef" :key="index">{{ ref.translate }}
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <b-button @click="compare" class="mt-5 btn-next">Next</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import _ from "lodash"

export default {
  name: "Testing3",
  data: () => ({
    words: [],
    index: 0,
    count: 3,
    activeWord: null,
    color: [
      "green",
      "black",
      "yellowgreen"
    ]
  }),

  created() {
    const data = JSON.parse(localStorage.getItem("words"))
    if (data) {
      this.words = data
    }
  },
  computed: {
    wordsSlice() {
      return this.words.slice(this.index, this.index + this.count)
    },
    // mixWords() {
    //   return _.shuffle(this.wordsSlice)
    // }

    wordRef() {
      return this.wordsSlice.map((w) => {
        return {
          ref: w,
          word: w.word
        }
      })
    },
    translateRef() {
      return _.shuffle(this.wordsSlice.map((y) => {
        return {
          ref: y,
          translate: y.translate
        }
      }))
    },

  },

  methods: {



    compare() {
      if (this.words.length - (this.index + this.count) >= 3) {
        this.index += this.count
      }
    },
    // eslint-disable-next-line no-unused-vars
    setActiveWord(ref, index) {
      // eslint-disable-next-line no-debugger

      this.activeWord = ref.ref
      // word.color = this.color[index]
      // this.activeWord = word
    },
    setCoupleToWord() {

    }
  },

}

</script>

<style scoped lang="scss">
.content-cards {
  margin-top: 100px;
}

.card-games {
  margin: 10px;
  font-size: 24px;
  border-radius: 5px;
  border: #747474 1px solid;

  &.active {
    border: 5px solid #c90505
  }

  &:hover {
    cursor: pointer;

  }

}
</style>