import { createElement } from 'lwc';
import DailyTaskLWC from 'c/dailyTaskLWC';
import getCurrentUserDailyTaskList from '@salesforce/apex/DailyTaskController.getCurrentUserDailyTaskList';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/DailyTaskController.getCurrentUserDailyTaskList',
    () => {
        return {
            default: jest.fn(() => new Promise(resolve => resolve(
                [
                    {Id: '1', Name: 'Test', Description__c: 'Test'},
                    {Id: '2', Name: 'Test', Description__c: 'Test'}
                ]
            )))
        };
    },
    { virtual: true }
);

describe('c-daily-task-l-w-c', () => {

    const TASKS_LIST_MOCK = [
        {Id: '1', Name: 'Test', Description__c: 'Test'},
        {Id: '2', Name: 'Test', Description__c: 'Test'}
    ];

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

    it('should show daily task tile list', () => {

        const element = createElement('c-daily-task-l-w-c', {
            is: DailyTaskLWC
        });
        document.body.appendChild(element);


        return flushPromises().then(() => {
            const dailyTaskList = element.shadowRoot.querySelector('c-daily-task-list');
            expect(dailyTaskList.tasks.length).toBe(TASKS_LIST_MOCK.length);
            expect(getCurrentUserDailyTaskList).toHaveBeenCalledTimes(1);
        })
    });

    it('should call for new list on taskdeleted event', () => {

        const element = createElement('c-daily-task-l-w-c', {
            is: DailyTaskLWC
        });
        document.body.appendChild(element);

        const customComponent = element.shadowRoot.querySelector('c-daily-task-list');
        customComponent.dispatchEvent(new CustomEvent('taskdeleted'));


        return flushPromises().then(() => {
            expect(getCurrentUserDailyTaskList).toHaveBeenCalledTimes(2);
        })
    });

    it('should open new tab on taskedit event', () => {
        jest.useFakeTimers();

        const element = createElement('c-daily-task-l-w-c', {
            is: DailyTaskLWC
        });
        document.body.appendChild(element);

        const customComponent = element.shadowRoot.querySelector('c-daily-task-list');
        customComponent.dispatchEvent(new CustomEvent('taskedit', {detail: TASKS_LIST_MOCK[1]}));


        return flushPromises().then(() => {
            jest.advanceTimersByTime(1000);
            const tabset = element.shadowRoot.querySelector('lightning-tabset');
            expect(tabset.activeTabValue).toBe(TASKS_LIST_MOCK[1].Id);
        })
    });

    it('should call for new list on ontaskupdated event', () => {
        jest.useFakeTimers();

        const element = createElement('c-daily-task-l-w-c', {
            is: DailyTaskLWC
        });
        document.body.appendChild(element);

        const customListComponent = element.shadowRoot.querySelector('c-daily-task-list');
        customListComponent.dispatchEvent(new CustomEvent('taskedit', {detail: TASKS_LIST_MOCK[1]}));

        return flushPromises().then(() => {
            jest.advanceTimersByTime(1000);

            const customEditComponent = element.shadowRoot.querySelector('c-daily-task-edit');
            customEditComponent.dispatchEvent(new CustomEvent('taskupdated'));

            Promise.resolve().then(() => {
                expect(getCurrentUserDailyTaskList).toHaveBeenCalledTimes(2);
            })
        })
    });

    it('should call for new list on taskcreated event', () => {

        const element = createElement('c-daily-task-l-w-c', {
            is: DailyTaskLWC
        });
        document.body.appendChild(element);

        const customComponent = element.shadowRoot.querySelector('c-daily-task-create');
        customComponent.dispatchEvent(new CustomEvent('taskcreated'));


        return flushPromises().then(() => {
            expect(getCurrentUserDailyTaskList).toHaveBeenCalledTimes(2);
        })
    });
});