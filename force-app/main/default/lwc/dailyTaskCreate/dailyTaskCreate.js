import {LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DailyTaskCreate extends LightningElement {
    objectApiName = 'Daily_Task__c';

    handleSuccess(event) {
        this._showToast(event);

        this._resetForm();

        this._dispatchTaskCreated();
    }

    _dispatchTaskCreated() {
        const taskCreatedEvent = new CustomEvent('taskcreated');

        this.dispatchEvent(taskCreatedEvent);
    }

    _showToast(event) {
        const toastEvent = new ShowToastEvent({
            title: "Task created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    _resetForm() {
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if (inputFields) {
            inputFields.forEach(field => field.reset());
        }
    }
}