const calculator = {
  deps: {
    view: ''
  },
  currentNum: '0',
  memory: '',
  evalQueue: '',
  equalsPressed: false,
  opPressed: true,
  procInput: function(input){
   if (input.classList.contains('clear')) {
     this.deps.view.clear();
   } else if (input.classList.contains('number')) {
     this.deps.view.displayNumInput(input);
   } else {
     this.deps.view.displayOpResult(input);
   }
  },
  procNumInput: function(num){
    if (this.equalsPressed) {
      this.deps.view.clear();
    }
    if (this.opPressed) {
      this.opPressed = false;
    }
    if (this.currentNum === '0') {
      this.currentNum = num;
    } else {
      this.currentNum = `${this.currentNum}${num}`;
    }
  },
  procOpInput: function(op){
    if (op === '=') {
      this.procEqualsPressed();
    } else {
      if (!calculator.opPressed) {
        if (op === 'X'){
          this.procMultPressed(op);
        } else {
          this.procSumDiffDiv(op);
       }
     }
   }
  },
  procEqualsPressed: function(){
    if (this.opPressed) {
      this.opPressed = false;
      this.evalQueue = '0 +';
      this.currentNum = this.memory;
    }
    this.memory = this.evalQueue ? this.round(eval(`${this.evalQueue}${this.currentNum}`)) :
      this.currentNum;
    this.evalQueue = ``;
    this.currentNum = this.memory;
    this.equalsPressed = true;
  },
  procMultPressed: function(op){
    if (this.equalsPressed) {
      this.equalsPressed = false;
    }
    this.memory = this.evalQueue ? this.round(eval(`${this.evalQueue}${this.currentNum}`)) :
      this.currentNum;
    this.evalQueue = `${this.evalQueue} ${this.currentNum}\*`;
    this.currentNum = '0';
    this.opPressed = true;
  },
  procSumDiffDiv: function(op){
    if (this.equalsPressed) {
      this.equalsPressed = false;
    }
    this.memory = this.evalQueue ?
      this.round(eval(`${this.evalQueue}${this.currentNum}`)) :
        this.currentNum;
    this.evalQueue = `${this.evalQueue} ${this.currentNum} ${op}`;
    this.currentNum = '0';
    this.opPressed = true;
  },
  round: function(num) {
    return (Math.round(num * 100000) / 100000);
  },
  init(viewObj) {
    this.deps.view = viewObj;
  }
};

export { calculator };
