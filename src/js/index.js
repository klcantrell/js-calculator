import { calculator } from './calculator';
import { view } from './view';
import '../css/style.css';

function init() {
  view.init(calculator);
  calculator.init(view);
}

window.addEventListener('DOMContentLoaded', init);
