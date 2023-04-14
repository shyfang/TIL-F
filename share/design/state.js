class Light {
  state = "off"
  constructor() {
    return this.setState.bind(this);
  }
  setState() {
    if (this.state === 'off') {
      console.log('弱光'); this.state = 'weakLight';
    } else if (this.state === 'weakLight') {
      console.log('强光'); this.state = 'strongLight';
    } else if (this.state === 'strongLight') {
      console.log('关灯'); this.state = 'off';
    }
  }
}
const light = new Light()

light()
light()
light()
light()