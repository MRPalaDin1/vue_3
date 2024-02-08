Vue.component('kanban-board', {
    template: `
    <div>
      <header>
          <h1 class="title">Kanban</h1>
      </header>
      <input class="input" type="text" v-model="currentNote"  @keyup.enter="addNote">
      <main>
          <div class="all_columns">
              <div class="column column1">
                  <h4 class="column-title">Planned</h4>
                  <ul class="list" v-for="note in notes">
                      <li class="cart" v-if="note.isPlanned === true">
                          <p>{{note.text}}</p>
                          <button @click="(note.isProcess = true) && (note.isPlanned = false)">=></button>
                          <button @click="deleteNote(note.text)">x</button>
                      </li>

                  </ul>
              </div>

              <div class="column column2">
                  <h4 class="column-title">In process</h4>
                  <ul class="list" v-for="note in notes">
                      <li class="cart" v-if="note.isProcess === true">
                          <p>{{note.text}}</p>
                          <button @click="(note.isPlanned = true) && (note.isProcess = false)"><=</button>
                          <button @click="(note.isTested = true) && (note.isProcess = false)">=></button>
                          <button @click="deleteNote(note.text)">x</button>

                      </li>

                  </ul>
              </div>

              <div class="column column3">
                  <h4 class="column-title">Testing</h4>
                  <ul class="list" v-for="note in notes">
                      <li class="cart" v-if="note.isTested === true">
                          <p>{{note.text}}</p>
                          <button @click="(note.isProcess = true) && (note.isTested = false)"><=</button>
                          <button @click="(note.isDone = true) && (note.isTested = false)">=></button>
                          <button @click="deleteNote(note.text)">x</button>
                      </li>

                  </ul>
              </div>

              <div class="column column4">
                  <h4 class="column-title">Done</h4>
                  <ul class="list" v-for="note in notes">
                      <li class="cart" v-if="note.isDone === true">
                          <p>{{note.text}}</p>
                          <button @click="(note.isTested = true) && (note.isDone = false)"><=</button>
                          <button @click="deleteNote(note.text)">x</button>

                      </li>

                  </ul>
              </div>

          </div>
      </main>
    </div>
  `,
    data() {
        return {
            currentNote: "",
            notes: []
        };
    },
    methods: {
        addNote() {
            this.notes.push({
                text: this.currentNote,
                isPlanned: true,
                isProcess: false,
                isTested: false,
                isDone: false,
            });
            this.currentNote = "";
        },
        deleteNote(noteText) {
            this.notes = this.notes.filter(note => note.text !== noteText);
        }
    }
});

new Vue({
    el: '#app'
});