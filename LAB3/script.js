class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    newNote.setAttribute("class", "card");

    let newP = document.createElement("p");
    newP.innerHTML = title;

    let newA = document.createElement("a");
    newA.innerHTML = "Remove";
    newA.setAttribute("class", "card-remove");
    newA.setAttribute("href", "#");

    newNote.appendChild(newP);
    newNote.appendChild(newA);
    
    // HINT🤩 a.addEventListener('click', this.remove.bind(newNote));
    newA.addEventListener('click', () => {
      this.remove;
    });
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    document.querySelector(".notes").appendChild(this.element);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    let notes = JSON.parse(localStorage.getItem("todos")) || [];
    notes.push(this.title);
    localStorage.setItem("todos", JSON.stringify(notes));
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    console.log(this);
  } 
}


class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector("#btnAddNote");
    this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    let notes = JSON.parse(localStorage.getItem("todos")) || [];
    notes.forEach(item => {
      let note = new Note(item);
      note.add();
    });
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let text = document.querySelector("#txtAddNote").value;
    let note = new Note(text);
    // HINT🤩
    note.add();
    note.saveToStorage();
    this.reset();
  }
  
  reset(){
    // this function should reset the form
    document.querySelector("#txtAddNote").value = ""; 
  }
  
}

let app = new App();