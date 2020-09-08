import { createElement } from 'lwc';
import DailyTaskEdit from 'c/dailyTaskEdit';

describe('c-daily-task-edit', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should dispatch taskupdated event on success', () => {
        const element = createElement('c-daily-task-edit', {
            is: DailyTaskEdit
        });
        document.body.appendChild(element);

        const taskUpdatedHandler = jest.fn();
        element.addEventListener('taskupdated', taskUpdatedHandler);

        const form = element.shadowRoot.querySelector('lightning-record-form');
        form.dispatchEvent(new CustomEvent('success', {detail: {id: '1'}}));

        return Promise.resolve().then(() => {
            expect(taskUpdatedHandler).toHaveBeenCalledTimes(1);
        });
    });
});