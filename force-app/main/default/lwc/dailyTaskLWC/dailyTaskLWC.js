import {LightningElement} from 'lwc';
import getCurrentUserDailyTaskList from '@salesforce/apex/DailyTaskController.getCurrentUserDailyTaskList';

export default class DailyTaskLWC extends LightningElement {
    _tasksList = []

    get currentTasks() {
        return this._tasksList;
    }

    connectedCallback() {
        this._loadTasks()
    }

    taskListUpdatedHandler() {
        this._loadTasks();
    }

    _loadTasks() {
        getCurrentUserDailyTaskList()
            .then(result => {
                this._tasksList = result;
            })
            .catch(error => {
                this.error = 'An error occurred while loading the bear list';
                console.error(error);
            })
    }

}