import {LightningElement} from 'lwc';
import getCurrentUserDailyTaskList from '@salesforce/apex/DailyTaskController.getCurrentUserDailyTaskList';

export default class DailyTaskLWC extends LightningElement {
    _tasksList = []

    _taskEditList = []

    get currentTasks() {
        return this._tasksList;
    }

    get editableTasks() {
        return this._taskEditList;
    }

    connectedCallback() {
        this._loadTasks()
    }

    taskDeleteHandler() {
        this._loadTasks();
    }

    taskUpdateHandler() {
        this._loadTasks();
    }

    taskCreatedHandler() {
        this._loadTasks();
        this._activateListTab();
    }

    taskEditHandler(event) {
        if (this._taskEditList.every(item => item.Id !== event.detail.Id)) {
            console.log(`Task with id - ${event.detail.Id} pushed to edit list`);
            this._taskEditList = [...this._taskEditList, {...event.detail}];
        }
        setTimeout( () => this._activateEditTab(event.detail.Id), 100);
    }

    _activateListTab() {
        this.template.querySelector('lightning-tabset').activeTabValue = 'list';
    }

    _activateEditTab(taskId) {
        this.template.querySelector('lightning-tabset').activeTabValue = taskId;
    }

    _loadTasks() {
        getCurrentUserDailyTaskList()
            .then(result => {
                this._tasksList = result;

                this._taskEditList = this._taskEditList.filter(item => result.map(task => task.Id).includes(item.Id))
                    .map(item => result.find(task => task.Id === item.Id));
            })
            .catch(error => {
                this.error = 'An error occurred while loading the bear list';
                console.error(error);
            })
    }

}