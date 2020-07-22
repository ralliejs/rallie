import { EventEmitter } from '../src/lib/event-emitter';
import { Errors, Warnings } from '../src/lib/utils';

describe('Test broadcast:', () => {
    const broadCastTester = new EventEmitter();
    let valueToModify = 0;
    const callback =  (newValue: number) => {
        valueToModify = newValue;
    };
    test('# case 1: emit a broadcast event, callback should be called', () => {
        broadCastTester.addBroadcastEventListener('test', callback);
        expect(valueToModify).toBe(0);
        broadCastTester.emitBroadcast('test', 1);
        expect(valueToModify).toBe(1);
    });

    test('# case 2: remove an existed broadcast listener and emit the event, console.warn should be called', () => {
        console.warn = jest.fn();
        broadCastTester.removeBroadcastEventListener('test', callback);
        broadCastTester.emitBroadcast('test');
        const warnMessage = Warnings.emptyBroadcastEvents('test');
        expect(console.warn).toBeCalledWith(warnMessage);
    });

    test('#case 3: remove non-existent listener of an broadcast event, it should throw an error', () => {
        const errorMessage = Errors.wrongBroadcastCallback('test'); // eslint-disable-line
        const expectedError = new Error(errorMessage);
        expect(() => {
            broadCastTester.removeBroadcastEventListener('test', callback);
        }).toThrow(expectedError);
    });

    test('#case 4: remove a listener of a non-existent event, it should throw an error', () => {
        const eventName = 'nonExistentEvent';
        const errorMessage = Errors.removeNonExistedBroadcast(eventName); // eslint-disable-line
        const expectedError = new Error(errorMessage);
        expect(() => {
            broadCastTester.removeBroadcastEventListener(eventName, callback);
        }).toThrow(expectedError);
    });
});

describe('Test unicast:', () => {
    const unicastTester = new EventEmitter();
    const callback = (num: number) => {
        return num * 2;
    };
    test('#case 1: emit a unicast event, callback should be called and return a value', () => {
        unicastTester.addUnicastEventListener('double', callback);
        const result = unicastTester.emitUnicast('double', 3);
        expect(result).toEqual(2 * 3);
    });

    test('#case 2: remove an existed unicast listener and emit the event, there should be an error to be throwed', () => {
        unicastTester.removeUnicastEventListener('double', callback);
        expect(() => {
            unicastTester.emitUnicast('double', 2);
        }).toThrowError();
    });

    test('#case 3: remove the listener of a non-existence unicast event, there should be an error to be throwed', () => {
        expect(() => {
            unicastTester.removeUnicastEventListener('double', () => {});
        }).toThrowError(new Error(Errors.removeNonExistedUnicast('double')));
    });

    test('#case 4: remove a wrong listener of a unicast event, there should be an error to be throwed', () => {
        unicastTester.addUnicastEventListener('double', callback);
        expect(() => {
            unicastTester.removeUnicastEventListener('double', () => {});
        }).toThrowError(new Error(Errors.wrongUnicastCallback('double')));
    });

    test('#case 5: registed a callback on an existed unicast event, there should be an error to be throwed', () => {
        expect(() => {
            unicastTester.addUnicastEventListener('double', () => {});
        }).toThrowError(new Error(Errors.registedExistedUnicast('double')));
    });
});
