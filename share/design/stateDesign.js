//状态模式:事物内部状态的改变往往会带来事物的行为改变

class Light {
  state = "offLight";

  constructor() {
    this.handle = this.weakLight;
  }

  setState(state, handle) {
    console.log(state)
    this.state = state;
    this.handle = handle;
  }

  weakLight() {
    this.setState("weakLight", this.strongLight);
  }

  strongLight() {
    this.setState("strongLight", this.offLight);
  }

  offLight() {
    this.setState("offLight", this.weakLight);
  }
}

const light = new Light();
light.handle();
light.handle();
light.handle();
light.handle();
