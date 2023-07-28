import {optimizeTemplateHTML} from '../../lib/utils.js';

export default optimizeTemplateHTML(`
  <div class="timepicker">
    <div class="timepicker-picker">
      <div class="timepicker-header">
        <div class="timepicker-title"></div>
        <div class="timepicker-controls">
        </div>
      </div>
      <div class="timepicker-main"></div>
      <div class="timepicker-footer">
        <div class="timepicker-controls">
        </div>
      </div>
    </div>
  </div>`
);
