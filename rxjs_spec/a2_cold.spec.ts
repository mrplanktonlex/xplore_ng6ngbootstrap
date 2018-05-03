import { TestScheduler } from 'rxjs/testing';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';

const rxTestScheduler = new TestScheduler(null);
function cold(marbles: string, values?: any, error?: any): ColdObservable<string>{
    return rxTestScheduler.createColdObservable(marbles, values, error);
} // cold ends

describe('cold()', () => {
    fit('should work for --a--|', () => {
        expect(cold('--a--|')).toBeTruthy();
        expect(cold('--a--|')).not.toBeFalsy();
    });

});

// https://medium.com/@adrianfaciu/testing-ngrx-effects-3682cb5d760e
