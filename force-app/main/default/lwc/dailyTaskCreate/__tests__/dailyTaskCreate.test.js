import { createElement } from 'lwc';
import DailyTaskCreate from 'c/dailyTaskCreate';

describe('c-daily-task-create', () => {

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should dispatch taskcreated event', () => {
        const element = createElement('c-daily-task-create', {
            is: DailyTaskCreate
        });

        document.body.appendChild(element);

        const taskCreatedHandler = jest.fn();
        element.addEventListener('taskcreated', taskCreatedHandler);

        const form = element.shadowRoot.querySelector('lightning-record-edit-form');
        form.dispatchEvent(new CustomEvent('success', {detail: {id: '1'}}));

        return Promise.resolve().then(() => {
            expect(taskCreatedHandler).toHaveBeenCalledTimes(1);
        });
    });

    it('should dispatch ShowToastEvent event', () => {
        const element = createElement('c-daily-task-create', {
            is: DailyTaskCreate
        });

        document.body.appendChild(element);

        const ShowToastEventHandler = jest.fn();
        element.addEventListener('lightning__showtoast', ShowToastEventHandler);

        const form = element.shadowRoot.querySelector('lightning-record-edit-form');
        form.dispatchEvent(new CustomEvent('success', {detail: {id: '1'}}));

        return Promise.resolve().then(() => {
            expect(ShowToastEventHandler).toHaveBeenCalledTimes(1);
        });
    });

    it('should clear the form', () => {
        const element = createElement('c-daily-task-create', {
            is: DailyTaskCreate
        });

        document.body.appendChild(element);

        const inputName = element.shadowRoot.querySelectorAll('lightning-input-field')[0];
        inputName.value = 'Test name';
        inputName.reset = jest.fn();

        const inputDescription = element.shadowRoot.querySelectorAll('lightning-input-field')[1];
        inputDescription.value = 'Test description';
        inputDescription.reset = jest.fn();

        const form = element.shadowRoot.querySelector('lightning-record-edit-form');
        form.dispatchEvent(new CustomEvent('success', {detail: {id: '1'}}));

        return Promise.resolve().then(() => {
            expect(inputName.reset).toHaveBeenCalledTimes(1);
            expect(inputDescription.reset).toHaveBeenCalledTimes(1);
        });
    });
});