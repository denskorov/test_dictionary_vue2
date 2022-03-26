<template>
  <div class="app d-flex align-items-center justify-content-center mt-5 ">
    <div v-if="words.length" class="my-content d-flex flex-column text-center">
      <div class="mb-5 word d-flex  justify-content-between">
        <div class="word-mix text-center" v-for="(letter,index) in wordMix" :key="index"><span>{{ letter }}</span></div>
      </div>
      <div class="info-text text-center mb-4">Arrange the letters in the correct order!</div>
      <div class="d-flex justify-content-between">
        <div v-for="index in letterLength" :key="index">
          <input autocapitalize="off" class="m-1 mb-3 text-center" type="text" ref="inputs"
                 @keyup="changeLetter($event,index)"
                 maxlength="1">
        </div>
      </div>
      <b-button @click="compare" class="mt-5 btn-next">Next</b-button>
    </div>
    <div v-else class="text-center text-muted">
      <h3> Words not yet added !</h3>
      <p class="mt-2  text-muted">
        <router-link to="/">Go Home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import {db} from "@/db";

``

export default {
  name: "Testing2",
  data: () => ({
    words: [],
    arrayInput: [],
    index: 0
  }),
  created() {
    db.collection('words')
        .get()
        .then(querySnapshot => {
          this.words = querySnapshot.docs.map(doc => doc.data())
        })
  },
  beforeMount() {
    this.arrayInput = new Array(this.letterLength)
  },
  methods: {
    changeLetter(event, index) {
      this.$set(this.arrayInput, index - 1, event.target.value)
      const inputIndex = this.$refs.inputs.indexOf(event.target)
      if (event.target.value) {

        if (this.$refs.inputs[inputIndex + 1]) {
          this.$refs.inputs[inputIndex + 1].focus()
        }

      } else if (event.key === "Backspace") {
        if (this.$refs.inputs[inputIndex - 1]) {
          this.$refs.inputs[inputIndex - 1].focus()
        }
      }
    },
    compare() {
      const result = this.textInput === this.wordDToShow.word
      if (result) {
        this.index++
        this.$refs.inputs.forEach((input) => {
          input.value = ""
        });
        this.$toasted.success("Good !!!", {
          theme: "bubble",
          position: "top-center",
          duration: 2000
        });
      } else this.$toasted.error("ERROR !!!", {
        theme: "bubble",
        position: "top-center",
        duration: 2000
      });
    }
  },
  computed: {
    textInput() {
      return this.arrayInput.join('')
    },
    wordDToShow() {
      return this.words[this.index] || {}
    },
    wordMix() {
      return _.shuffle(this.wordDToShow?.word?.split('')).join('')
    },
    letterLength() {
      return this.wordMix.length
    }
  }
}

</script>

<style scoped lang="scss">
input {
  width: 50px;
  height: 50px;
  font-size: 25px;
}

.my-content {
  max-width: 100%;
}

.word {
  text-align: center;
  padding: 0;
  font-size: 40px;
}

.word-mix {
  width: 50px;
  height: 50px;
}

.info-text {
  color: darkgray;
}

.btn-next {
  align-self: center;
  width: 30%;
  min-width: 70px;
  background: #0ecaf0;

  &:hover {
    background: #0ad8ff;
  }
}

@media screen and (max-width: 500px) {
  input {
    width: 35px;
    height: 35px;
    font-size: 20px;
  }
  .word-mix {
    width: 35px;
    height: 35px;

  }
  .my-content {
    margin-top: 100px;
    overflow: auto;

  }
}
</style>
