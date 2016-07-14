/**
 * Created by root on 16-6-6.
 */
/**
 *
 * @constructor
 */
var BinaryTree=function(){
    this.root=null;
    this.size=0;
};
BinaryTree.prototype={
    init:function(node){
        this.root=node;
        this.size++;
    },//construct a null binary tree
    destory:function(){
        this.root=null;
    },//destory this binary tree
    create:function(definition,values) {
        if (values != null) {
            var temp = values[0];
            this.root.value = temp;
            var nodeTemp = this.root;
            for (var i = 1; i < values.length; i++) {
                var node = {value: values[i], left: null, right: null, parent: nodeTemp};
                if (values[i] > temp) nodeTemp.right = node;
                else nodeTemp.left = node;
                nodeTemp=node;
            }
        }
        console.log("create");
    },//create a binary tree by some definition
    clear:function(){
        this.root={value:null,left:null,right:null,parent:null};
    },//clear the tree to be null
    isEmpty:function(){
        if(this.root==null) return true;
        else return false;
    },//judge a tree is null?
    getRoot:function(){
      //  console.log("root");
        return this.root;
    },//get the root node of this tree
    value:function(node){
        console.log("value");
        return node.value;
    },//get a node's value
    assign:function(node,value){
        node.value=value;
    },//set a value to a node
    parent:function(node){
        return node.parent;
    },//get a node's parent node
    left:function(node){
        return node.left;
    },//get a node's left child
    right:function(node){
        return node.right;
    },//get a node's right child
    insert:function(node,lr,root) {
        this.size++;
        var subTree=null;
        if (root.left != null&&lr==0) subTree=root.left;
        if(root.right!=null&&lr==1) subTree=root.right;
        node.right=subTree;
        if(lr==0) root.left=node;
        else root.right=node;
        node.parent=root;
    },//insert a node to a exist node
    delete:function(root,lr){
        if(lr==0) root.left=null;
        else root.right=null;
    },//delete a exist node
    iterator:function(node){
        if(node!=null) {
            this.iterator(node.left);
            this.iterator(node.right);
            console.log(node.value);
        }else return;
   }
};
