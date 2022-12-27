import {describe, expect, it} from 'vitest';

import { PriorityQueue } from '../src/PriorityQueue';

describe('Priority Queue', () => { 
    
    const pq = new PriorityQueue<number, number>();

    it("should insert an element", () => {
        pq.enqueue(10, 0)
        expect(pq.size()).toBe(1)
        expect(pq.peek()).toBe(10)
    })

    it("should pop an element", () => {
        pq.enqueue(100, 2)
        expect(pq.dequeue()).toBe(100)
        expect(pq.size()).toBe(1)
        expect(pq.dequeue()).toBe(10)
        expect(pq.size()).toBe(0)
        expect(() => pq.peek()).toThrowError("Priority Queue is empty")
        expect(() => pq.dequeue()).toThrowError("Priority Queue is empty")
    })

})