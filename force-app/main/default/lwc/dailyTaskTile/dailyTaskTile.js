import {LightningElement, api} from 'lwc';
import deleteDailyTask from '@salesforce/apex/DailyTaskController.deleteDailyTask';

export default class DailyTaskTile extends LightningElement {
    @api task;

    _isShowDescription = false;

    get isDescriptionExist() {
        return !!this.task.Description__c;
    }

    get isShowDescription() {
        return this._isShowDescription;
    }

    toggleDescription() {
        this._isShowDescription = !this._isShowDescription;
    }

    deleteTask() {
        deleteDailyTask({taskId: this.task.Id})
            .then(() => this._taskDeleted())
            .catch(error => {
                this._errorOccurred(`An error occurred while deleting the task ${this.task.Id}`)
                console.error(error);
            })
    }

    editTask() {
        const event = new CustomEvent('taskedit', {detail: this.task});
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }

    _taskDeleted() {
        console.log(`Task with id - ${this.task.Id} successfully deleted`)
        const event = new CustomEvent('taskdeleted');
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }

    _errorOccurred(message) {
        const event = new CustomEvent('erroroccurred', {detail: message});
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }
}