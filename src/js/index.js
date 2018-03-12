(function(){

  window.addEventListener('DOMContentLoaded', init);

  function init(){
    view.init();
  }

  const calculator = {
    currentNum: '0',
    memory: '',
    evalQueue: '',
    equalsPressed: false,
    opPressed: true,
    procInput: function(input){
     if (input.classList.contains('clear')) {
       view.clear();
     } else if (input.classList.contains('number')) {
       view.displayNumInput(input);
     } else {
       view.displayOpResult(input);
     }
    },
    procNumInput: function(num){
      if (this.equalsPressed) {
        view.clear();
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
    }
  };

  const view = {
    isMobile: (typeof window.orientation !== "undefined") ||
      (navigator.userAgent.indexOf('IEMobile') !== -1),
    body: document.querySelector('body'),
    cacheDom: function() {
      this.calculator = this.body.querySelector('#calculator');
      this.output = this.calculator.querySelector("#output");
      this.clickables = this.calculator.querySelectorAll('.nums-ops p');
      this.queue = this.calculator.querySelector("#queue");
    },
    adjustTextSize: function(el){
      if (calculator.memory.toString().length > 17 || calculator.currentNum.length > 17) {
        el.style['font-size'] = '1.2em';
      } else if (calculator.memory.toString().length > 10 || calculator.currentNum.length > 10) {
        el.style['font-size'] = '2em';
      } else {
        el.style['font-size'] = '3em';
      }
    },
    addCalcListeners: function(clickable){
      if (this.isMobile) {
        clickable.addEventListener('touchend', function(){
          calculator.procInput(clickable);
        });
      } else {
        clickable.addEventListener('click', function(){
          calculator.procInput(clickable);
        });
      }
    },
    displayNumInput: function(num){
      calculator.procNumInput(num.textContent);
      this.adjustTextSize(this.output);
      this.output.textContent = calculator.currentNum;
    },
    clear: function(){
      calculator.currentNum = '0';
      this.output.textContent = calculator.currentNum;
      calculator.evalQueue = '';
      this.queue.textContent = calculator.evalQueue;
      calculator.memory = '';
      calculator.equalsPressed = false;
      calculator.opPressed = true;
      this.adjustTextSize(this.output);
    },
    displayOpResult: function(op) {
      calculator.procOpInput(op.textContent);
      this.adjustTextSize(this.output);
      calculator.memory ? this.output.textContent = calculator.memory : this.output.textContent = '0';
      this.queue.textContent = calculator.evalQueue;
    },
    mobile3DBehavior: function() {
      if (this.isMobile) {
        this.calculator.addEventListener('touchstart', function(e) {
            e.currentTarget.style.transform = "translateZ(50px) rotateY(0deg) rotateZ(0deg)";
            e.stopPropagation();
        });
        this.body.addEventListener('touchstart', function(e) {
          view.calculator.style.transform = "translateZ(50px) rotateY(45deg) rotateZ(20deg)";
        });
      }
    },
    bindEvents: function() {
      for (let i = 0; i < this.clickables.length; i++){
        this.addCalcListeners(this.clickables[i]);
      }
    },
    init: function() {
      this.cacheDom();
      this.mobile3DBehavior();
      this.bindEvents();
    }
  };

})();
