import {LightningElement, api} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Daily_Task__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Daily_Task__c.Description__c';

export default class DailyTaskEdit extends LightningElement {
    @api record;

    objectApiName = 'Daily_Task__c';

    fields = [NAME_FIELD, DESCRIPTION_FIELD];

    handleSuccess() {
        const event = new CustomEvent('taskupdated');
        this.dispatchEvent(event);
    }
}