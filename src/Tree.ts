import { IQueue, StackQueue } from "./Queue";

interface ITreeNode<T> {
  value: T,
  left?: ITreeNode<T>,
  right?: ITreeNode<T>,
}


export class TreeNode<T> implements ITreeNode<T> {

  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}

export class Tree<T> {
  root: TreeNode<T>;

  constructor(rootValue: T) {
    this.root = new TreeNode(rootValue);
  }

  static addNodes<T>(root: TreeNode<T>, vals: IQueue<T>) {
    if (vals.size() > 0) {
      root.value = vals.dequeue()
      if (!root.left) {
        root.left = new TreeNode(undefined as T)
      }

      if (!root.right) {
        root.right = new TreeNode(undefined as T)
      }
      
      Tree.addNodes(root.left, vals)
      Tree.addNodes(root.right, vals)
    }
  }

  static inOrder<T>(root: TreeNode<T> | undefined, result: T[]) {
    if (root) {
      Tree.inOrder(root.left, result);
      result.push(root.value);
      Tree.inOrder(root.right, result);
    }
  }

  static preOrder<T>(root: TreeNode<T> | undefined, result: T[]) {
    if (root) {
      result.push(root.value);
      Tree.preOrder(root.left, result);
      Tree.preOrder(root.right, result);
    }
  }

  static postOrder<T>(root: TreeNode<T> | undefined, result: T[]) {
    if (root) {
      Tree.postOrder(root.left, result);
      Tree.postOrder(root.right, result);
      result.push(root.value)
    }
  }

  static levelOrderArray<T>(root: TreeNode<T>): [T[]] | [] {
    if (!root) {
      return []
    }

    const result: any = [] 
    const queue = new StackQueue<TreeNode<T>>([root]);
    while (queue.size() > 0) {
      let queueSize = queue.size()
      const currentLevel: T[] = []

      while (queueSize > 0) {
        const curr = queue.dequeue();
        currentLevel.push(curr.value);

        if (curr.left) {
          queue.enqueue(curr.left);
        } 
        
        if (curr.right) {
          queue.enqueue(curr.right);
        }
        queueSize--;
      }
      if (currentLevel.length > 0) {
        result.push(currentLevel);
      }
    }

    return result;
  }
    
  static levelOrder<T>(root: TreeNode<T>): T[] {
    if (!root) {
      return []
    }

    const result: T[] = []
    const queue = new StackQueue<TreeNode<T>>([root]);
    while (queue.size() > 0) {
      
      let queueSize = queue.size()
      while (queueSize > 0) {
        const curr = queue.dequeue();
        result.push(curr.value);
        if (curr.left) {
          queue.enqueue(curr.left);
        } 
        
        if (curr.right) {
          queue.enqueue(curr.right);
        }
        queueSize--;
      }

    }

    return result;
  }

  static levelOrderWithHeight<T>(root: TreeNode<T>): T[] {
    const result: T[] = [];
    const depth = Tree.depth(root);

    const getCurrentLevel = function (r: TreeNode<T> | undefined, level: number, result: T[]) {
      if (!r) {
        return
      }

      if (level === 1) {
        result.push(r.value);
        return
      }

      getCurrentLevel(r.left, level - 1, result)
      getCurrentLevel(r.right, level - 1, result)

    }


    for (let i = 1; i < depth+1; i++) {
      
      getCurrentLevel(root, i, result);
      
    }

    return result;
  }

  static depth(root?: TreeNode<any>): number {
    if (!root) return 0;
    return 1 + Math.max(Tree.depth(root.left), Tree.depth(root.right))

  }

  static rightView<T>(root?: TreeNode<T>): T[] {
    if (!root) {
      return []
    }

    const result: T[] = [];

    const _levelOrder = Tree.levelOrderArray(root);

    for (const level of _levelOrder) {
      const last = level[level.length - 1]
      result.push(last)
    }

    return result;
  }

  static rightViewDFS<T>(root?: TreeNode<T>): T[] {
    const result: T[] = [];
    let maxLevel = 0;
    function rightViewHelper(level: number, root?: TreeNode<T>) {
      if (!root) {
        return
      }

      if (maxLevel < level) {
        result.push(root.value)
        maxLevel = level
      }

      rightViewHelper(level+1, root.right);
      rightViewHelper(level+1, root.left);
    }

    rightViewHelper(1, root);
    return result;
  }

  static leftView<T>(root?: TreeNode<T>): T[] {
    const result: T[] = []

    if (!root) return result

    const levels = Tree.levelOrderArray(root)
    for (const level of levels) {
      result.push(level[0])
    }

    return result
  } 

  static leftViewDFS<T>(root?: TreeNode<T>): T[] {
    const result: T[] = []
    
    if (!root) {
      return result
    }

    let maxLevel = 0
    function DFS(level: number, root?: TreeNode<T>) {
      if (!root) {
        return
      }

      if (maxLevel < level) {
        result.push(root.value)
        maxLevel = level;
      }

      DFS(level + 1, root.left);
      DFS(level + 1, root.right);

    }

    DFS(1, root);
    return result;
  }
}


export class BinarySearchTree<T> extends Tree<T> {
  addNode(val: T) {
    
    const tempRoot = this.root;

    function insert(root?: TreeNode<T>): TreeNode<T> {
      if (!root) {
        return new TreeNode<T>(val)
      }

      if (val > root.value) {
        root.right = insert(root.right)
      } else if (val < root.value) {
        root.left = insert(root.left)
      } else {
        throw new Error("Binary tree does not accept duplicate values")
      }

      return root
    }
  
    this.root = insert(tempRoot)
  }

  isValidBST(): boolean {
    const inorder: T[] = []
    Tree.inOrder(this.root, inorder);
    console.log("Inorder is ", inorder);
    for (let i = 1; i < inorder.length; i++) {
      if (inorder[i-1] >= inorder[i]) return false
    }

    return true;
  }

  //Currenlt for number.
  lowestCommonAncestor(a: T, b: T): TreeNode<T> | undefined {
    let result: TreeNode<T> | undefined = this.root;
    let small;
    let large;

    if (!this.isValidBST()) {
      throw new SyntaxError("Not a Valid BST");
    }

    if (a > b) {
      large = a;
      small = b;
    } else {
      large = b;
      small = a;
    }

    while (result) {
      if (result.value > large) {
        result = result.left;
      } else if (result.value < small) {
        result = result.right;
      } else return result;
    }

    throw new RangeError("Could not find LCA, probably the given child nodes do not exist in the Tree");
  }
  
}