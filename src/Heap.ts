enum HeapType {
    MIN_HEAP, 
    MAX_HEAP
}

export interface Comparable {
    valueOf(): number | string
}

export class Heap<T extends Comparable> {

    static readonly HeapType = HeapType;

    readonly values: T[] = [];
    size: number = 0;
    readonly heapType: HeapType;

    constructor(values?: T[], heapType: HeapType = HeapType.MAX_HEAP) {
        this.heapType = heapType;
        if (values) {
            this.values = values;
            this.size = this.values.length;
            this.heapify();
        }
        
    }

    private compare(a: T, b: T): boolean {
        switch (this.heapType) {
            case HeapType.MIN_HEAP: 
                return a < b
            default:
                return a > b
        }
    }

    heapify(values: T[] = this.values) {
        for (let i = Math.floor(values.length / 2); i >= 0; i--) {
            this.__heapify(i);
        }
    }

    private __heapify(current: number) {
        
        while (current < this.size) {

            if (2*current+1 >= this.size) {
                break;
            }
            

            let target: number;

            if (2*current+2 >= this.size) {
                target = 2 * current+1;
            } else if (this.compare(this.values[2*current+2], this.values[2*current+1])) {
                target = 2*current+2;
            } else {
                target = 2*current+1;
            }

            if (this.compare(this.values[target], this.values[current])) {
                this.swap(current, target);
                current = target;
            } else {
                break;
            }
        }
    }

    insert(val: T) {
        this.values.push(val);
        let last = this.values.length -1
        let parent = Math.floor(last/ 2)
        while (parent >= 0 && this.compare(this.values[last], this.values[parent])) {
            this.swap(parent, last);
            last = parent;
            parent = Math.floor(parent / 2)
        }
        
        this.size += 1;        
    }

    /**
     * Returns the minium element if MIN_HEAP or Maximum element for MAX_HEAP
     */
    peek(): T {
        if (this.size === 0) throw new RangeError("Heap is empty, hence cannot pop");
        return this.values[0]
    }
    /**
     * 
     * Removes and return the minimum element in the Min Heap or Maximum element in MAX_HEAP
     */
    pop(): T {
        if (this.size === 0) throw new RangeError("Heap is empty, hence cannot pop");
        let min = this.values[0]
        this.values[0] = this.values.pop() as T
        this.size--;
        this.__heapify(0);
        return min;
    }



    private swap(source: number, target: number) {
        [this.values[source], this.values[target]] = [this.values[target], this.values[source]]
    }

}