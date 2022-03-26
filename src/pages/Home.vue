<template>
  <b-container class="content">
    <div class="py-5">
      <div>
        <b-input-group class="mb-2">
          <input v-model="word" ref="word" class="form-control m-2" @keydown.enter="$refs.translate.focus()"/>
          <input v-model="translate" @focus="translateFocus" :disabled="word===''" ref="translate"
                 class="form-control m-2" type="text"
                 @keydown.enter="add"/>
          <b-button @click="add" class="m-2 btn-add" variant="danger">Add</b-button>
        </b-input-group>
      </div>
    </div>

    <div class="words">
      <div class="d-flex justify-content-center">
        <pacman-loader :loading="showPreloader" color="#0ECAF0"/>
      </div>
      <b-row class="content-word justify-content-center">
        <template v-if="words.length">
          <b-col class="mb-3 d-flex justify-content-around group" @click="showEditModal(word)"
                 v-for="(word, index) in words"
                 :key="index" cols="10" md="8">
            <div class="d-flex">
              <div class="card-m">
                <div class="word text-center">{{ word.word }}</div>
              </div>
            </div>
            <div>-</div>
            <div class="translate text-center text-muted-trans">{{ word.translate }}</div>
            <div>
              <button type="button" class=" btn-card btn-close btn-close-black" aria-label="Close"
                      @click.stop="removeCard(index,word)"></button>
            </div>
            <b-modal hide-header-close ok-title="Save" @ok="editWord(word)" :id="`edit-modal-${word.word}`"
                     title="Edit">
              <div class="d-flex">
                <b-form-input v-model="editableWord.word" class=" m-2" aria-label="word"/>
                <b-form-input v-model="editableWord.translate" class="m-2" aria-label="translate"/>
              </div>

            </b-modal>
          </b-col>
        </template>
        <div v-else-if="word.length&&showPreloader" class="text-center text-muted">
          <h3> Words not yet added !</h3>
        </div>
      </b-row>

    </div>

  </b-container>

</template>

<script>
import {db} from "@/db";

export default {
  name: "Home",

  data: () => ({
    word: "",
    translate: "",
    words: [],
    editableWord: {},
    showPreloader: false
  }),
  beforeMount() {
    this.showPreloader = true

  },
  methods: {
    translateFocus() {
    },
    showEditModal(word) {
      this.editableWord = {...word}
      this.$bvModal.show(`edit-modal-${word.word}`)
    },

    editWord(word) {
      this.showPreloader = true
      db.collection("words").doc(word.storeId)
          .update(this.editableWord)
          .then(() => {
            word.word = this.editableWord.word.trim()
            word.translate = this.editableWord.translate.trim()
            this.showPreloader = false
          })
    },

    add() {
      if (!this.word || !this.translate) {
        this.$toasted.error("Empty word !!!", {
          theme: "bubble",
          position: "top-center",
          duration: 2000
        });
        return
      }
      if (this.words.find((w) => w.word === this.word)) {
        this.$toasted.show("Copy Error !!!", {
          theme: "bubble",
          position: "top-right",
          duration: 2000
        });
        this.$refs.word.focus()
        return
      }
      const w = {
        word: this.word,
        translate: this.translate
      }
      this.showPreloader = true
      db.collection('words').add(w)
          .then((data) => data.get())
          .then((doc) => {
            this.words.unshift({...doc.data(), storeId: doc.id})
            this.$toasted.success("Word added !!!", {
              theme: "bubble",
              position: "bottom-center",
              duration: 2000
            });
            this.showPreloader = false
          })
      this.translate = ""
      this.word = ""
      this.$refs.word.focus()
    },

    removeCard(index, word) {
      this.showPreloader = true

      db.collection("words").doc(word.storeId).delete().then(() => {
        this.words.splice(index, 1)
        this.showPreloader = false

      })

    },


  },
  mounted() {
    this.$refs.word.focus()
    db.collection('words')
        .get()
        .then(querySnapshot => {
          this.words = querySnapshot.docs.map(doc => {
            return {...doc.data(), storeId: doc.id}
          })
          this.showPreloader = false
        })
  },

}
</script>

<style scoped lang="scss">
.btn-add {
  max-width: 100px;
}

.words {
  max-height: calc(100% - 158px);
  overflow-y: auto;
  flex-grow: 1;
  flex-basis: 100%;
  font-size: 20px;
  padding: 15px 0;
}

.group {
  padding: 10px;
  border: 1px solid #ffffff;

  &:hover {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #747474;
  }
}

.btn-card {
  margin-left: 30px;
}

@media screen and (max-width: 500px) {
  .content-word {
    max-width: 100%;
  }

  .word {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
  }
  .translate {
    width: 100px;
    color: #747474;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

</style>
