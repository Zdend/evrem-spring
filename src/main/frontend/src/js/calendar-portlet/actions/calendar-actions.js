import AppDispatcher from '../../core/dispatcher';
import CalendarConstants from '../constants/calendar-constants';

let CalendarActions = {

  registerNotes() {
	    AppDispatcher.dispatch({
	      actionType: CalendarConstants.REGISTER_NOTES
	    });
  }

};
export default CalendarActions;
