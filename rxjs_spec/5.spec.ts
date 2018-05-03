// // See helpers/marble-testing.ts
// // 5.spec.ts will fail as global is not defined anywhere.

// // IMP: uses helpers/marble-testing.ts
// // See https://github.com/ReactiveX/rxjs/blob/master/spec/helpers/marble-testing.ts

// import { Observable, NEVER, EMPTY, Subject, of, concat, merge, Notification } from 'rxjs';
// import { TestScheduler, } from 'rxjs/testing/';
// import { hot, cold, expectObservable, expectSubscriptions, time } from './helpers/marble-testing';

// const rxTestScheduler: TestScheduler = new TestScheduler(null); // declare means variable has been initialized somewhere else.

//   describe('jasmine helpers', () => {
//     describe('rxTestScheduler', () => {
//       it('should exist', () => {
//         // expect(rxTestScheduler).to.be.an.instanceof(TestScheduler); // chai style.
//         expect(rxTestScheduler).toEqual(jasmine.any(TestScheduler));
//       });
//     });

//     // testing cold() defined in helpers/marble-testing, to c if it works ok
//     describe('cold()', () => {
//       it('should exist', () => {
//         // expect(cold).to.exist;
//         expect(cold).toBeTruthy();
//         expect(cold).not.toBeFalsy();
//         // expect(cold).to.be.a('function');
//         expect(cold).toEqual(jasmine.any(Function));
//       });

//       it('should create a cold observable', () => {
//         const expected = [1, 2];
//         const source = cold('-a-b-|', { a: 1, b: 2 });
//         source.subscribe((x: number) => {
//           expect(x).toEqual(expected.shift());
//         }, null, () => {
//           expect(expected.length).toEqual(0);
//         });
//         expectObservable(source).toBe('-a-b-|', { a: 1, b: 2 });
//       });
//     }); // inner describe ends

//     // testing hot() defined in helpers/marble-testing, to c if it works ok
//     describe('hot()', () => {
//       it('should exist', () => {
//         // expect(hot).to.exist;
//         expect(hot).toBeTruthy();
//         expect(hot).not.toBeFalsy();
//         // expect(hot).to.be.a('function');
//         expect(hot).toEqual(jasmine.any(Function));
//       });

//       it('should create a hot observable', () => {
//         const source = hot('---^-a-b-|', { a: 1, b: 2 });
//         // expect(source).to.be.an.instanceOf(Subject);
//         expect(source).toEqual(jasmine.any(Subject));
//         expectObservable(source).toBe('--a-b-|', { a: 1, b: 2 });
//       });
//     });

//     // testing time() defined in helpers/marble-testing, to c if it works ok
//     describe('time()', () => {
//       it('should exist', () => {
//         // expect(time).to.exist;
//         expect(time).toBeTruthy();
//         expect(time).not.toBeFalsy();
//         // expect(time).to.be.a('function');
//         expect(time).toEqual(jasmine.any(Function));
//       });

//       it('should parse a simple time marble string to a number', () => {
//         expect(time('-----|')).toEqual(50);
//       });
//     });

//     // testing expectObservable() defined in helpers/marble-testing, to c if it works ok
//     // describe('expectObservable()', () => {
//     //   it('should exist', () => {
//     //     expect(expectObservable).to.exist;
//     //     expect(expectObservable).to.be.a('function');
//     //   });

//     //   it('should return an object with a toBe function', () => {
//     //     expect(expectObservable(of(1)).toBe).to.be.a('function');
//     //   });

//     //   it('should append to flushTests array', () => {
//     //     expectObservable(EMPTY);
//     //     expect((<any>rxTestScheduler).flushTests.length).toEqual(1);
//     //   });

//     //   it('should handle empty', () => {
//     //     expectObservable(EMPTY).toBe('|', {});
//     //   });

//     //   it('should handle never', () => {
//     //     expectObservable(NEVER).toBe('-', {});
//     //     expectObservable(NEVER).toBe('---', {});
//     //   });

//     //   it('should accept an unsubscription marble diagram', () => {
//     //     const source = hot('---^-a-b-|');
//     //     const unsubscribe  =  '---!';
//     //     const expected =      '--a';
//     //     expectObservable(source, unsubscribe).toBe(expected);
//     //   });
//     // });

//     // testing expectSubscriptions() defined in helpers/marble-testing, to c if it works ok
//     // describe('expectSubscriptions()', () => {
//     //   it('should exist', () => {
//     //     expect(expectSubscriptions).to.exist;
//     //     expect(expectSubscriptions).to.be.a('function');
//     //   });

//     //   it('should return an object with a toBe function', () => {
//     //     expect(expectSubscriptions([]).toBe).to.be.a('function');
//     //   });

//     //   it('should append to flushTests array', () => {
//     //     expectSubscriptions([]);
//     //     expect((<any>rxTestScheduler).flushTests.length).toEqual(1);
//     //   });

//     //   it('should assert subscriptions of a cold observable', () => {
//     //     const source = cold('---a---b-|');
//     //     const subs =        '^--------!';
//     //     expectSubscriptions(source.subscriptions).toBe(subs);
//     //     source.subscribe();
//     //   });
//     // });

//     // describe('end-to-end helper tests', () => {
//     //   it('should be awesome', () => {
//     //     const values = { a: 1, b: 2 };
//     //     const myObservable = cold('---a---b--|', values);
//     //     const subs =              '^---------!';
//     //     expectObservable(myObservable).toBe('---a---b--|', values);
//     //     expectSubscriptions(myObservable.subscriptions).toBe(subs);
//     //   });

//     //   it('should support testing metastreams', () => {
//     //     const x = cold('-a-b|');
//     //     const y = cold('-c-d|');
//     //     const myObservable = hot('---x---y----|', { x: x, y: y });
//     //     const expected =         '---x---y----|';
//     //     const expectedx = cold('-a-b|');
//     //     const expectedy = cold('-c-d|');
//     //     expectObservable(myObservable).toBe(expected, { x: expectedx, y: expectedy });
//     //   });
//     // });

//   }); // main describe ends
