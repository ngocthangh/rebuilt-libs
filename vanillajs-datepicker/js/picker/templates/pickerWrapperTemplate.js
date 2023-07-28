import {optimizeTemplateHTML} from '../../lib/utils.js';
import pickerTemplate from './pickerTemplate.js';
import pickerTimeTemplate from './pickerTimeTemplate.js'

export default optimizeTemplateHTML(`
  <div class="datetimepicker-wrapper">
    <div class="datetimepicker-header">
      <div class="datetimepicker-title"></div>
      <div class="datetimepicker-controls"></div>
    </div>
    <div class="datetimepicker-main">
      ${pickerTemplate}
      ${pickerTimeTemplate}
    </div>
    <div class="datetimepicker-footer">
      <div class="datetimepicker-controls">
      </div>
    </div>
  </div>`
);
