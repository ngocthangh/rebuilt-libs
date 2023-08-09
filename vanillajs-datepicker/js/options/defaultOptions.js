// config options updatable by setOptions() and their default values
export default {
  autohide: false,
  beforeShowDay: null,
  beforeShowDecade: null,
  beforeShowMonth: null,
  beforeShowYear: null,
  clearButton: false,
  dateDelimiter: ',',
  datesDisabled: [],
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  defaultViewDate: undefined, // placeholder, defaults to today() by the program
  disableTouchKeyboard: false,
  enableOnReadonly: true,
  format: 'MM/dd/yyyy HH:mm:ss',
  language: 'en',
  maxDate: null,
  maxNumberOfDates: 1,
  maxView: 3,
  minDate: null,
  orientation: 'auto',
  pickLevel: 0,
  showDaysOfWeek: true,
  showOnClick: true,
  showOnFocus: true,
  startView: 0,
  title: '',
  todayButton: false,
  todayButtonMode: 0,
  todayHighlight: false,
  updateOnBlur: true,
  weekNumbers: 0,
  weekStart: 0,
  nextArrow: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" version="1.1">
    <g aria-label="navigate_next" style="fill:#666666">
      <path d="m 9.984375,6 6,6 -6,6 L 8.578125,16.59375 13.171875,12 8.578125,7.40625 Z" id="path826"/>
    </g>
  </svg>`,
  prevArrow: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" version="1.1">
    <g aria-label="navigate_before" style="fill:#666666">
      <path d="M 15.421875,7.40625 10.828125,12 15.421875,16.59375 14.015625,18 l -6,-6 6,-6 z" id="path826"/>
    </g>
  </svg>`,
};
