import {describe, expect, it} from 'vitest';

import { Heap } from '../src/Heap';

describe('Heap', () => { 
    
    describe('Insert', () => { 
        const heap = new Heap();
        it("should insert an element to the heap", () => {
            heap.insert(10);
            expect(heap.values).toStrictEqual([10])
        })
    })

    describe("Insert in right order", () => {
        const heap = new Heap();

        it("should insert all the elements satisfying the heap property", () => {
            console.log(heap.values)
            heap.insert(40)
            heap.insert(20)
            heap.insert(30)
            heap.insert(130)
            heap.insert(530)
            expect(heap.peek()).toBe(530)
        })
    })

    describe("Pop", () => {
        const heap = new Heap();
        heap.insert(10)
        heap.insert(100)
        it("should pop the maximum element", () => {
            expect(heap.pop()).toBe(100)
            expect(heap.pop()).toBe(10)
            expect(() => heap.pop()).toThrowError("Heap is empty, hence cannot pop")
            expect(() => heap.peek()).toThrowError("Heap is empty, hence cannot pop")
        })
    })

    describe("Heapify", () => {
        const heap = new Heap([10, 23, 45, 2, 4, 90, 83, 23, 100, 34, 900]);

        it("Should have the greatest element first", () => {
            expect(heap.peek()).toBe(900)
            expect(heap.pop()).toBe(900)
            expect(heap.peek()).toBe(100)
        })
    })
    
    describe("Min Heap", () => {
        const heap = new Heap([10, 23, 45, 2, 4, 90, 83, 23, 100, 34, 900], Heap.HeapType.MIN_HEAP);

        it("Should have the greatest element first", () => {
            expect(heap.peek()).toBe(2)
            heap.insert(1)
            expect(heap.pop()).toBe(1)
            expect(heap.peek()).toBe(2)
        })
    })
})