// class Animal {
//   name = 'animal';

//   constructor() {
//     console.log(this.name); // (*)
//   }
// }

// class Rabbit extends Animal {
//   constructor(props){
//     super(props)
//   }
//   name = 'rabbit';
// }

// new Animal(); // animal
// new Rabbit(); // animal

class Button {
  constructor(value) {
    this.value = value;
    console.log(this);
  }
  // click = () => {
  //   console.log(this.value);
  // }
  click(){
    console.log(this.value);
  }
}

let button = new Button("hello");

class Button2 extends Button {
  hide(){
    console.log(this);
    console.log(`${this.value} hides!`);
  }
}

let button2 = new Button2("hello_button2__-")

// setTimeout(button2.hide, 1000); // hellobutton2.hide
button2.hide()


