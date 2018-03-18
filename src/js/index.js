import { calculator } from './calculator';
import { view } from './view';
import '../css/style.css';


view.init(calculator);
calculator.init(view)
