

export interface IQueue<T> {
    enqueue(val: T): any;
    dequeue(): T;
    peek(): T;
    size(): number;
}

// interface IArrayQueue<T> extends IQueue<T> {
// }

// interface IStackBasedQueue<T> extends IQueue<T> {
//     enqueueStack: T[]
//     dequeueStack: T[]
// }

export class ArrayQueue<T> implements IQueue<T> {
    
    private data: T[];
    
    constructor(vals?: T[]) {
        this.data = vals || [];
    }

    size(): number {
        return this.data.length;
    }

    enqueue(val: T) {
        this.data.push(val)
    }

    dequeue(): T {
        if (!this.data.length) throw new Error("Queue is empty to dequeue");

        const val = this.data.shift();
        return val as T
        
    }

    peek(): T {
        if (!this.data.length) throw new Error("Queue is empty to dequeue");

        return this.data[0]
    }
}

export class StackQueue<T> implements IQueue<T> {
    private enqueueStack: T[];
    private dequeueStack: T[];
    private _size: number;

    constructor(vals?: T[]) {
        this.enqueueStack = vals || [];
        this.dequeueStack = [];
        this._size = this.enqueueStack.length;
    }

    enqueue(val: T) {
        this.enqueueStack.push(val);
        this._size++;
    }

    private shift() {
        if (this.dequeueStack.length === 0) {
            while (this.enqueueStack.length > 0) {
                const val = this.enqueueStack.pop();
                this.dequeueStack.push(val as T);
            }
        }   
    
    }

    dequeue(): T {
        if (!this._size) throw new Error("Queue is Empty, cannot dequeue.");
        this.shift();
        this._size--;
        return this.dequeueStack.pop() as T
    }

    peek(): T {
        if (!this._size) throw new Error("Queue is Empty, cannot dequeue.");
        this.shift();
        return this.dequeueStack[this.dequeueStack.length - 1]
    }

    size(): number {
        return this._size;
    }

}