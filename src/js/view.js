const view = {
  deps: {
    calculator: ''
  },
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
    if (this.deps.calculator.memory.toString().length > 17 || this.deps.calculator.currentNum.length > 17) {
      el.style['font-size'] = '1.2em';
    } else if (this.deps.calculator.memory.toString().length > 10 || this.deps.calculator.currentNum.length > 10) {
      el.style['font-size'] = '2em';
    } else {
      el.style['font-size'] = '3em';
    }
  },
  addCalcListeners: function(clickable){
    if (this.isMobile) {
      clickable.addEventListener('touchend', function(){
        this.deps.calculator.procInput(clickable);
      });
    } else {
      clickable.addEventListener('click', function(){
        view.deps.calculator.procInput(clickable);
      });
    }
  },
  displayNumInput: function(num){
    this.deps.calculator.procNumInput(num.textContent);
    this.adjustTextSize(this.output);
    this.output.textContent = this.deps.calculator.currentNum;
  },
  clear: function(){
    this.deps.calculator.currentNum = '0';
    this.output.textContent = this.deps.calculator.currentNum;
    this.deps.calculator.evalQueue = '';
    this.queue.textContent = this.deps.calculator.evalQueue;
    this.deps.calculator.memory = '';
    this.deps.calculator.equalsPressed = false;
    this.deps.calculator.opPressed = true;
    this.adjustTextSize(this.output);
  },
  displayOpResult: function(op) {
    this.deps.calculator.procOpInput(op.textContent);
    this.adjustTextSize(this.output);
    this.deps.calculator.memory ? this.output.textContent = this.deps.calculator.memory : this.output.textContent = '0';
    this.queue.textContent = this.deps.calculator.evalQueue;
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
  init: function(calculatorObj) {
    this.deps.calculator = calculatorObj;
    this.cacheDom();
    this.mobile3DBehavior();
    this.bindEvents();
  }
};

export { view };
