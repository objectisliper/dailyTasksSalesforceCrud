import { createElement } from 'lwc';
import DailyTaskList from 'c/dailyTaskList';

describe('c-daily-task-list', () => {

    const TASKS_LIST_MOCK = [{Id: '1', Name: 'Test', Description__c: 'Test'}];

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should show error on erroroccurred event', () => {
        const ERROR_TEXT = 'some error text';

        const element = createElement('c-daily-task-list', {
            is: DailyTaskList
        });
        element.tasks = TASKS_LIST_MOCK
        document.body.appendChild(element);

        const dailyTaskTileComponent = element.shadowRoot.querySelector('c-daily-task-tile');
        dailyTaskTileComponent.dispatchEvent(new CustomEvent('erroroccurred', {detail: ERROR_TEXT}));

        return Promise.resolve().then(() => {
            const errorMessageLabel = element.shadowRoot.querySelector('.slds-text-color_error');
            expect(errorMessageLabel.textContent).toBe(ERROR_TEXT)
        })
    });

    it('should dispatch taskdeleted event', () => {
        const element = createElement('c-daily-task-list', {
            is: DailyTaskList
        });
        element.tasks = TASKS_LIST_MOCK

        document.body.appendChild(element);

        const taskDeletedHandler = jest.fn();
        element.addEventListener('taskdeleted', taskDeletedHandler);

        const dailyTaskTileComponent = element.shadowRoot.querySelector('c-daily-task-tile');
        dailyTaskTileComponent.dispatchEvent(new CustomEvent('taskdeleted'));

        return Promise.resolve().then(() => {
            expect(taskDeletedHandler).toHaveBeenCalledTimes(1);
        })
    });

    it('should dispatch taskedit event', () => {
        const element = createElement('c-daily-task-list', {
            is: DailyTaskList
        });
        element.tasks = TASKS_LIST_MOCK

        document.body.appendChild(element);

        const taskEditHandler = jest.fn();
        element.addEventListener('taskedit', taskEditHandler);

        const dailyTaskTileComponent = element.shadowRoot.querySelector('c-daily-task-tile');
        dailyTaskTileComponent.dispatchEvent(new CustomEvent('taskedit'));

        return Promise.resolve().then(() => {
            expect(taskEditHandler).toHaveBeenCalledTimes(1);
        })
    });
});