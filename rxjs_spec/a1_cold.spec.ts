// Using 5.spec.ts and helpers/marble-testing.ts as reference
// https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md

/*
  hot('--a--b') will emit "a" and "b" whereas
  hot('--a--b', { a: 1, b: 2 }) will emit 1 and 2.
  hot('---#') will emit error "error" whereas
  hot('---#', null, new SpecialError('test')) will emit new SpecialError('test')


Marble syntax is a string which represents events happening over "time".
The first character of any marble string always represents the "zero frame".
A "frame" is somewhat analogous to a virtual millisecond.

    "-" time: 10 "frames" of time passage.
    "|" complete: The successful completion of an observable. This is the observable producer signaling complete()
    "#" error: An error terminating the observable. This is the observable producer signaling error()
    "a" any character: All other characters represent a value being emitted by the producer signaling next()
    "()" sync groupings: When multiple events need to be in the same frame synchronously, parentheses are used to group those events.
        You can group nexted values, a completion or an error in this manner.
        The position of the initial ( determines the time at which its values are emitted.
"^" subscription point: (hot observables only) shows the point at which the tested observables will be subscribed to the hot observable. 
        This is the "zero frame" for that observable, every frame before the ^ will be negative.

    "!" : means unsubscribe i think (see 1-to-5.spec.ts);
        : unsubscription point: shows the point in time at which a subscription is unsubscribed.


Examples
    '-' or '------': Equivalent to Observable.never(), or an observable that never emits or completes
    |: Equivalent to Observable.empty()
    #: Equivalent to Observable.throw()
    '--a--': An observable that waits 20 "frames", emits value a and then never completes.
    '--a--b--|': On frame 20 emit a, on frame 50 emit b, and on frame 80, complete
    '--a--b--#': On frame 20 emit a, on frame 50 emit b, and on frame 80, error
    '-a-^-b--|': In a hot observable, on frame -20 emit a, then on frame 20 emit b, and on frame 50, complete.   ???!!! wtf ???!!!!
    '--(abc)-|': on frame 20, emit a, b, and c, then on frame 80 complete
    '-----(a|)': on frame 50, emit a and complete.


    '--^--': a subscription happened after 20 "frames" of time passed, and the subscription was not unsubscribed.
    '--^--!-': on frame 20 a subscription happened, and on frame 50 was unsubscribed.


A basic test might look as follows:
    var e1 = hot('----a--^--b-------c--|');
    var e2 = hot(  '---d-^--e---------f-----|');
    var expected =      '---(be)----c-f-----|';

    expectObservable(e1.merge(e2)).toBe(expected);
      The ^ characters of hot observables should always be aligned.
      The first character of cold observables or expected observables should always be aligned with each other,
         and with the ^ of hot observables. <<<======= VIMP.
      Use default emission values when you can. Specify values when you have to.

*/

import { TestScheduler } from 'rxjs/testing/';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';

const rxTestScheduler = new TestScheduler(null);
function cold(marbles: string, values?: void, error?: any): ColdObservable<string>;
function cold<V>(marbles: string, values?: { [index: string]: V; }, error?: any): ColdObservable<V>;
function cold(marbles: string, values?: any, error?: any): ColdObservable<any> {
    return rxTestScheduler.createColdObservable(marbles, values);
} // cold ends

describe('cold()', () => {
      it('should exist', () => {
        expect(cold).toBeTruthy();
        expect(cold).not.toBeFalsy();
        expect(cold).toEqual(jasmine.any(Function));
      });

      it('should create a cold observable', () => {
        const expected = [1, 2];
        const source = cold('-a-b-|', { a: 1, b: 2 });
        source.subscribe(
            (x: number) => {  expect(x).toEqual(expected.shift());  },
            null,
            () => { expect(expected.length).toEqual(0);  }
          ); // subscribe ends
      });
}); // cold-describe ends.
