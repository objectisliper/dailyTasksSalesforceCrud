import {LightningElement} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Daily_Task__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Daily_Task__c.Description__c';

export default class DailyTaskCreate extends LightningElement {
    objectApiName = 'Daily_Task__c';

    fields = [NAME_FIELD, DESCRIPTION_FIELD];

    handleSuccess(event) {

        const toastEvent = new ShowToastEvent({
            title: "Task created",
            message: "Record ID: " + event.target.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);

        const taskCreatedEvent = new CustomEvent('taskcreated');

        this.dispatchEvent(taskCreatedEvent);
    }
}