import { createElement } from 'lwc';
import DailyTaskTile from 'c/dailyTaskTile';
import deleteDailyTask from '@salesforce/apex/DailyTaskController.deleteDailyTask';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/DailyTaskController.deleteDailyTask',
    () => {
        return {
            default: jest.fn(() => new Promise(resolve => resolve()))
        };
    },
    { virtual: true }
);

describe('c-daily-task-tile', () => {
    const TASK_MOCK = {Id: 'some id', Name: 'some name', Description__c: 'some description'}

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('should toggle isShowDescription property', () => {
        const element = createElement('c-daily-task-tile', {
            is: DailyTaskTile
        });
        element.task = TASK_MOCK;
        document.body.appendChild(element);

        element.shadowRoot.querySelector('.clickable').click();

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.querySelector('.clickable').textContent).toBe('Hide description');

            element.shadowRoot.querySelector('.clickable').click();

            return Promise.resolve().then(() => {
                expect(element.shadowRoot.querySelector('.clickable').textContent).toBe('Show description');
            })
        })
    });

    it('should dispatch taskdeleted event', () => {

        const element = createElement('c-daily-task-tile', {
            is: DailyTaskTile
        });
        element.task = TASK_MOCK;
        document.body.appendChild(element);

        const taskDeletedEventHandler = jest.fn();
        element.addEventListener('taskdeleted', taskDeletedEventHandler);

        const deleteButton = element.shadowRoot.querySelectorAll('lightning-button')[1];
        deleteButton.click();

        return flushPromises().then(() => {
            expect(deleteDailyTask).toHaveBeenCalledTimes(1);
        })
    });

    it('should dispatch taskedit event', () => {

        const element = createElement('c-daily-task-tile', {
            is: DailyTaskTile
        });
        element.task = TASK_MOCK;
        document.body.appendChild(element);

        const taskEditEventHandler = jest.fn();
        element.addEventListener('taskedit', taskEditEventHandler);

        const editButton = element.shadowRoot.querySelectorAll('lightning-button')[0];
        editButton.click();

        return flushPromises().then(() => {
            expect(taskEditEventHandler).toHaveBeenCalledTimes(1);
        })
    });
});