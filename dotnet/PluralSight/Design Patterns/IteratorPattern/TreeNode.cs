using System;
using System.Collections;
using System.Collections.Generic;

namespace IteratorPattern
{
    [Serializable]
    class TreeNode<T> : IEnumerable<T>
    {
        public TreeNode<T> LeftChild { get; set; }

        public TreeNode<T> RightChild { get; set; }

        protected bool UseBreadthFirstEnumerator { get; set; }

        public T Value { get; set; }

        public TreeNode(T value)
        {
            Value = value;
        }

        /*Traversing the tree w/o the use of the enumerator pattern*/
        public List<T> ToListInOrder()
        {
            var myList = new List<T>();
            if (LeftChild != null)
            {
                myList.AddRange(LeftChild.ToListInOrder());
            }
            myList.Add(Value);
            if (RightChild != null)
            {
                myList.AddRange(RightChild.ToListInOrder());
            }
            return myList;
        }
        
        public List<T> ToListPreOrder()
        {
            var myList = new List<T> {Value};
            if (LeftChild != null)
            {
                myList.AddRange(LeftChild.ToListPreOrder());
            }
            if (RightChild != null)
            {
                myList.AddRange(RightChild.ToListPreOrder());
            }
            return myList;
        }

        public List<T> ToListPostOrder()
        {
            var myList = new List<T>();
            if (LeftChild != null)
            {
                myList.AddRange(LeftChild.ToListPostOrder());
            }
            if (RightChild != null)
            {
                myList.AddRange(RightChild.ToListPostOrder());
            }
            myList.Add(Value);
            return myList;
        }

        /*Traversing the tree with the use of the enumerator pattern*/
        public IEnumerator<T> GetEnumerator()
        {
            if(UseBreadthFirstEnumerator)
            {
                return new TreeNodeBreadthFirstEnumerator<T>(this);
            }
            return new TreeNodeEnumerator<T>(this);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
