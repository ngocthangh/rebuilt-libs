import {createTagRepeat, optimizeTemplateHTML} from '../../lib/utils.js';

export const hourTemplate = optimizeTemplateHTML(`<div class="times">
  <div class="times-header">Hours</div>
  <div class="timepicker-grid-wrapper">
    <div class="timepicker-grid hour-cell">${createTagRepeat('span', 24)}</div>
  </div>
</div>`);

export const minuteTemplate = optimizeTemplateHTML(`<div class="times">
  <div class="times-header">Minute</div>
  <div class="timepicker-grid-wrapper">
    <div class="timepicker-grid minute-cell">${createTagRepeat('span', 60)}</div>
  </div>
</div>`);

export const secondTemplate = optimizeTemplateHTML(`<div class="times">
  <div class="times-header">Second</div>
  <div class="timepicker-grid-wrapper">
    <div class="timepicker-grid second-cell">${createTagRepeat('span', 60)}</div>
  </div>
</div>`);
