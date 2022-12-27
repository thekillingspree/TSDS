import { Heap } from "./Heap";
import { StackQueue } from "./Queue";
import { BinarySearchTree, Tree, TreeNode } from "./Tree";

const vals: StackQueue<number> = new StackQueue<number>([1, 2, 4, 5, 3])

let result : number[] = [];

const newTree = new Tree<number>(1);
newTree.root.left = new TreeNode(2);
newTree.root.right = new TreeNode(3);
newTree.root.left.left = new TreeNode(4);
newTree.root.left.right = new TreeNode(5);
newTree.root.right.left = new TreeNode(6);
newTree.root.right.right = new TreeNode(7);

Tree.inOrder(newTree.root, result)
console.log(result)

result = [];
Tree.preOrder(newTree.root, result)
console.log(result)

result = Tree.levelOrder(newTree.root);
console.log(result)
console.log(Tree.levelOrderWithHeight(newTree.root))
console.log("Level", Tree.levelOrderArray(newTree.root))


const binaryTree = new BinarySearchTree<number>(20);
binaryTree.addNode(34)
binaryTree.addNode(18)
binaryTree.addNode(25)
binaryTree.addNode(10)
binaryTree.addNode(50)
binaryTree.addNode(49)
binaryTree.addNode(5)
binaryTree.addNode(2)
binaryTree.addNode(68)
binaryTree.addNode(4)
binaryTree.addNode(1)

result = [];
Tree.inOrder(binaryTree.root, result)
console.log("Inorder", result)
console.log("Level order", Tree.levelOrderArray(binaryTree.root))
console.log("Right View (BFS)", Tree.rightView(binaryTree.root))
console.log("Right View (DFS)", Tree.rightViewDFS(binaryTree.root))
console.log("Left View (BFS)", Tree.leftView(binaryTree.root))
console.log("Left View (DFS)", Tree.leftViewDFS(binaryTree.root))
console.log("Is Valid BST?", binaryTree.isValidBST())
binaryTree.root.value = 0;
console.log("Is Valid BST?", binaryTree.isValidBST())
console.log("Level order", Tree.levelOrderArray(binaryTree.root))

binaryTree.root.value = 20;
console.log("LCA of 68 and 49 is:", binaryTree.lowestCommonAncestor(68, 49))




const heap = new Heap<number>(undefined, Heap.HeapType.MAX_HEAP);
heap.insert(10)
heap.insert(100)
heap.insert(13)
heap.insert(200)

console.log(heap.values)

const sort = []
sort.push(heap.pop())
sort.push(heap.pop())
sort.push(heap.pop())
sort.push(heap.pop())
console.log("Sort:", sort);