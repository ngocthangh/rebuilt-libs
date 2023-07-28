import {today, dateValue, addDays, addWeeks, dayOfTheWeekOf} from '../../lib/date.js';
import {formatDate} from '../../lib/date-format.js';
import {parseHTML, showElement, hideElement} from '../../lib/dom.js';
import {secondTemplate} from '../templates/timesTemplate.js';
import weekNumbersTemplate from '../templates/weekNumbersTemplate.js';
import ViewTime from './ViewTime.js';

export default class SecondsView extends ViewTime {
  constructor(picker) {
    super(picker, {
      id: 4,
      name: 'seconds',
      cellClass: 'second',
    });
  }

  init(options, onConstruction = true) {
    if (onConstruction) {
      const inner = parseHTML(secondTemplate).firstChild;
      this.dow = inner.firstChild;
      this.grid = inner.lastChild.firstChild;
      this.element.appendChild(inner);
    }
    super.init(options);
  }

  setOptions(options) {
    let updateDOW;

    if ('minHour' in options) {
      this.minDate = options.minDate;
    }
    if ('maxHour' in options) {
      this.maxDate = options.maxDate;
    }
    if (options.checkDisabled) {
      this.checkDisabled = options.checkDisabled;
    }
    if (options.daysOfWeekDisabled) {
      this.daysOfWeekDisabled = options.daysOfWeekDisabled;
      updateDOW = true;
    }
    if (options.daysOfWeekHighlighted) {
      this.daysOfWeekHighlighted = options.daysOfWeekHighlighted;
    }
    if ('thisHourHighlight' in options) {
      this.todayHighlight = options.todayHighlight;
    }
    if ('weekStart' in options) {
      this.weekStart = options.weekStart;
      this.weekEnd = options.weekEnd;
      updateDOW = true;
    }
    if (options.locale) {
      const locale = this.locale = options.locale;
      this.dayNames = locale.daysMin;
      this.switchLabelFormat = locale.titleFormat;
      updateDOW = true;
    }
    // if ('beforeShowDay' in options) {
    //   this.beforeShow = typeof options.beforeShowDay === 'function'
    //     ? options.beforeShowDay
    //     : undefined;
    // }

    // if ('weekNumbers' in options) {
    //   if (options.weekNumbers && !this.weekNumbers) {
    //     const weeksElem = parseHTML(weekNumbersTemplate).firstChild;
    //     this.weekNumbers = {
    //       element: weeksElem,
    //       dow: weeksElem.firstChild,
    //       weeks: weeksElem.lastChild,
    //     };
    //     this.element.insertBefore(weeksElem, this.element.firstChild);
    //   } else if (this.weekNumbers && !options.weekNumbers) {
    //     this.element.removeChild(this.weekNumbers.element);
    //     this.weekNumbers = null;
    //   }
    // }

    // if ('getWeekNumber' in options) {
    //   this.getWeekNumber = options.getWeekNumber;
    // }

    // if ('showDaysOfWeek' in options) {
    //   if (options.showDaysOfWeek) {
    //     showElement(this.dow);
    //     if (this.weekNumbers) {
    //       showElement(this.weekNumbers.dow);
    //     }
    //   } else {
    //     hideElement(this.dow);
    //     if (this.weekNumbers) {
    //       hideElement(this.weekNumbers.dow);
    //     }
    //   }
    // }

    // update days-of-week when locale, daysOfweekDisabled or weekStart is changed
    // if (updateDOW) {
    //   Array.from(this.dow.children).forEach((el, index) => {
    //     const dow = (this.weekStart + index) % 7;
    //     el.textContent = this.dayNames[dow];
    //     el.className = this.daysOfWeekDisabled.includes(dow) ? 'dow disabled' : 'dow';
    //   });
    // }
  }

  // Apply update on the focused date to view's settings
  updateFocus() {
    const viewDate = new Date(this.picker.viewDate);
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    const firstOfMonth = dateValue(viewYear, viewMonth, 1);
    const start = dayOfTheWeekOf(firstOfMonth, this.weekStart, this.weekStart);

    this.first = firstOfMonth;
    this.last = dateValue(viewYear, viewMonth + 1, 0);
    this.start = start;
    this.focused = this.picker.viewDate;
  }

  // Apply update on the selected dates to view's settings
  updateSelection() {
    const {times = {second: 0}} = this.picker.datepicker;
    this.selected = times.second;
  }

   // Update the entire view UI
  render() {
    // update today marker on ever render
    this.today = this.todayHighlight ? today() : undefined;

    this.prepareForRender(
      formatDate(this.focused, this.switchLabelFormat, this.locale),
      this.first <= this.minDate,
      this.last >= this.maxDate
    );

    // if (this.weekNumbers) {
    //   const weekStart = this.weekStart;
    //   const startOfWeek = dayOfTheWeekOf(this.first, weekStart, weekStart);
    //   Array.from(this.weekNumbers.weeks.children).forEach((el, index) => {
    //     const dateOfWeekStart = addWeeks(startOfWeek, index);
    //     el.textContent = this.getWeekNumber(dateOfWeekStart, weekStart);
    //     if (index > 3) {
    //       el.classList[dateOfWeekStart > this.last ? 'add' : 'remove']('next');
    //     }
    //   });
    // }
    Array.from(this.grid.children).forEach((el, index) => {
      const current = addDays(this.start, index);
      const dateObj = new Date(current);
      const day = dateObj.getDay();
      const extraClasses = [];

      if (this.today === current) {
        extraClasses.push('today');
      }
      if (this.daysOfWeekHighlighted.includes(day)) {
        extraClasses.push('highlighted');
      }

      this.renderCell(
        el,
        index,
        'second',
        this,
        false,
        extraClasses
      );
    });
  }

  // Update the view UI by applying the changes of selected and focused items
  refresh() {
    Array.from(this.grid.children).forEach((el) => {
      this.refreshCell(el, Number(el.dataset.value), this.selected);
    });
  }

  // Update the view UI by applying the change of focused item
  refreshFocus() {
    this.changeFocusedCell(Math.round((this.focused - this.start) / 86400000));
  }
}
