// Using 5.spec.ts and helpers/marble-testing.ts as reference

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
        source.subscribe((x: number) => {
              expect(x).toEqual(expected.shift());
            }, null, () => {
              expect(expected.length).toEqual(0);
            }); // subscribe ends
      });
}); // cold-describe ends.
