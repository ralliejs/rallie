import { EventEmitter } from '../src/event-emitter';

describe('Test event-emitter module:', () => {
    const event = new EventEmitter();
    let valueToModify = 0;
    const callBack =  (newValue: number) => {
        valueToModify = newValue;
    };
    test('# case 1: trigger event to run the callback function ', () => {
        event.addEventListener('test', callBack);
        expect(valueToModify).toBe(0);
        event.emit('test', 1);
        expect(valueToModify).toBe(1);
    });

    test('# case 2: remove an existed listener', () => {
        console.warn = jest.fn();
        event.removeEventListener('test', callBack);
        event.emit('test');
        const warnMessage = '[obvious] you have emitted [test] event, but there is no listener of this event';
        expect(console.warn).toBeCalledWith(warnMessage);
    });

    test('#case 3: remove non-existent listener of an event', () => {
        const errorMessage = "[obvious] you are trying to remove a listener of [test] event, but the listener hasn't been registed"; // eslint-disable-line
        const expectedError = new Error(errorMessage);
        expect(() => {
            event.removeEventListener('test', callBack);
        }).toThrow(expectedError);
    });

    test('#case 4: remove a listener of a non-existent event', () => {
        const eventName = 'nonExistentEvent';
        const errorMessage = `[obvious] you are trying to remove a listener of [${eventName}] event, but [${eventName}] hasn't been registed as a event`; // eslint-disable-line
        const expectedError = new Error(errorMessage);
        expect(() => {
            event.removeEventListener(eventName, callBack);
        }).toThrow(expectedError);
    });
});
