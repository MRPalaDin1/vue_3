Vue.component('kanban-board', {
    template: `
    <div>
      <header>
          <h1 class="title">Kanban</h1>
          <div class="input-container">
            <input class="input" type="text" v-model="currentNote" placeholder="Название задачи" @keyup.enter="addNote">
            <textarea class="input" v-model="currentDescription" placeholder="Описание задачи"></textarea>
            <input class="input" type="date" v-model="currentDeadline">
            <button @click="addNote">Создать</button>
          </div>
      </header>
      <main>
          <div class="columns-container">
            <div class="column">
    <h4 class="column-title">Запланированные задачи</h4>
    <ul class="list">
        <li class="cart" v-for="(note, index) in notes" v-if="note.isPlanned === true">
            <p>{{ note.text }}</p>
            <p>Description: {{ note.description }}</p>
            <p>Created at: {{ note.created_at }}</p>
            <p v-if="note.lastEditedAt">Last edited at: {{ note.lastEditedAt }}</p>
            <p>Deadline: {{ note.deadline }}</p>
            <button @click="(note.isEdit = !note.isEdit)">Редактировать</button>
            <button @click="(note.isProcess = true) && (note.isPlanned = false)">=></button>
            <button @click="deleteNote(note.text)">x</button>
            <div v-if="note.isEdit">
                <input v-model="note.text">
                <textarea v-model="note.description"></textarea>
                <input type="date" v-model="note.deadline">
                <button @click="editNote(index)">Сохранить</button>
            </div>
        </li>
    </ul>
</div>

              <div class="column">
    <h4 class="column-title">Задачи в работе</h4>
    <ul class="list">
        <li class="cart" v-for="(note, index) in notes" v-if="note.isProcess === true">
            <p>{{ note.text }}</p>
            <p>Description: {{ note.description }}</p>
            <p>Created at: {{ note.created_at }}</p>
            <p v-if="note.lastEditedAt">Last edited at: {{ note.lastEditedAt }}</p>
            <p>Deadline: {{ note.deadline }}</p>
            <p v-if="note.returnReason">Причина отката: {{ note.returnReason }}</p>
            <button @click="(note.isTested = true) && (note.isProcess = false)">=></button>
            <button @click="deleteNote(note.text)">x</button>
        </li>
    </ul>
</div>

              <div class="column">
    <h4 class="column-title">Тестирование</h4>
    <ul class="list">
        <li class="cart" v-for="(note, index) in notes" v-if="note.isTested === true">
            <p>{{ note.text }}</p>
            <p>Description: {{ note.description }}</p>
            <p>Created at: {{ note.created_at }}</p>
            <p v-if="note.lastEditedAt">Last edited at: {{ note.lastEditedAt }}</p>
            <p>Deadline: {{ note.deadline }}</p>
            <button @click="moveToInProgress(index)"><=</button>
            <button @click="moveToCompleted(index)">=></button>
            <button @click="deleteNote(note.text)">x</button>
        </li>
    </ul>
</div>

<div class="column">
    <h4 class="column-title">Завершенные задачи</h4>
    <ul class="list">
        <li class="cart" v-for="(note, index) in notes" v-if="note.isDone === true">
            <p>{{ note.text }}</p>
            <p>Description: {{ note.description }}</p>
            <p>Created at: {{ note.created_at }}</p>
            <p v-if="note.lastEditedAt">Last edited at: {{ note.lastEditedAt }}</p>
            <p>Deadline: {{ note.deadline }}</p>
            <p v-if="note.isOverdue">Статус: Просрочено</p>
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
            currentDescription: "",
            currentDeadline: "",
            notes: []
        };
    },
    methods: {
        moveToCompleted(index) {
            const currentDate = new Date();
            const deadlineDate = new Date(this.notes[index].deadline);

            this.notes[index].isOverdue = currentDate > deadlineDate;

            this.notes[index].isTested = false;
            this.notes[index].isDone = true;
        },
        moveToInProgress(index) {
            const reason = prompt("Введите причину возврата задачи:");
            if (reason !== null) {
                this.notes[index].returnReason = reason;
                this.notes[index].isProcess = true;
                this.notes[index].isTested = false;
            }
        },
        addNote() {
            this.notes.push({
                text: this.currentNote,
                description: this.currentDescription,
                created_at: new Date(),
                lastEditedAt: null,
                deadline: this.currentDeadline,
                isPlanned: true,
                isProcess: false,
                isTested: false,
                isDone: false,
                isEdit: false
            });
            this.currentNote = "";
            this.currentDescription = "";
            this.currentDeadline = "";
        },
        editNote(index) {
            this.notes[index].lastEditedAt = new Date();
            this.notes[index].isEdit = false;
        },
        deleteNote(noteText) {
            this.notes = this.notes.filter(note => note.text !== noteText);
        }
    },
    created() {
        const savedNotes = localStorage.getItem('kanbanNotes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes);
        }
    },
    watch: {
        notes: {
            handler: function() {
                localStorage.setItem('kanbanNotes', JSON.stringify(this.notes));
            },
            deep: true
        }
    }
});

new Vue({
    el: '#app'
});