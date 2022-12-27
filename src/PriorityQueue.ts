import { Comparable, Heap } from "./Heap";

class Item<TElement, TPriority extends Comparable> implements Comparable {
    element: TElement;
    priority: TPriority;

    constructor(element: TElement, priority: TPriority) {
        this.element = element;
        this.priority = priority;
    }
    valueOf(): string | number {
        return this.priority.valueOf();
    }
    

    
}

export class PriorityQueue<TElement, TPriority extends Comparable> {
    private heap = new Heap<Item<TElement, TPriority>>(undefined, Heap.HeapType.MAX_HEAP)

    constructor() {

    }

    enqueue(element: TElement, priority: TPriority): TElement {
        const item = new Item(element, priority);
        this.heap.insert(item);
        return item.element;
    }

    dequeue(): TElement {
        if (this.heap.size === 0) throw new RangeError("Priority Queue is empty")

        return this.heap.pop().element;
    }

    peek(): TElement {
        if (this.heap.size === 0) throw new RangeError("Priority Queue is empty")
        return this.heap.peek().element;
    }

    size(): number {
        return this.heap.size
    }
}