
// testing subscribe !!! awesome !!!

import { TestScheduler } from 'rxjs/testing';
import { Observable, Subject } from 'rxjs';

describe('createColdObservable()', () => {
    it('should create a cold observable', () => {
      const expected = ['A', 'B'];
      const scheduler = new TestScheduler(null);
      const source = scheduler.createColdObservable<string>('--a---b--|', { a: 'A', b: 'B' });
    //   expect(source).to.be.an.instanceOf(Observable); // chai style
      expect(source).toEqual(jasmine.any(Observable)); // jasmine style
      source.subscribe(x => {
        // expect(x).to.equal(expected.shift());
        expect(x).toEqual(expected.shift());
      });
      scheduler.flush();
      expect(expected.length).toEqual(0);
    });

});

describe('createHotObservable()', () => {
    it('should create a hot observable', () => {
      const expected = ['A', 'B'];
      const scheduler = new TestScheduler(null);
      const source = scheduler.createHotObservable<string>('--a---b--|', { a: 'A', b: 'B' });
    //   expect(source).to.be.an.instanceof(Subject); // chai style
      expect(source).toEqual(jasmine.any(Subject)); // jasmine style
      source.subscribe(x => {
        expect(x).toEqual(expected.shift());
      });
      scheduler.flush();
      expect(expected.length).toEqual(0);
    });
  });
