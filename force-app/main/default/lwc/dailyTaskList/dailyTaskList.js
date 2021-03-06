import {LightningElement, api} from 'lwc';

export default class DailyTaskList extends LightningElement {
    error;
    @api tasks;

    errorOccurredHandler(event) {
        this.error = event.detail;
    }

    taskDeletedHandler() {
        const event = new CustomEvent('taskdeleted');
        // Fire the event from c-list
        this.dispatchEvent(event);
    }

    taskEditHandler(event) {
        const editEvent = new CustomEvent('taskedit', {detail: event.detail});
        // Fire the event from c-list
        this.dispatchEvent(editEvent);
    }
}