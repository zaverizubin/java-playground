using System.Collections;
using System.Collections.Generic;

namespace IteratorPattern
{
    class TreeNodeEnumerator<T>: IEnumerator<T>
    {
        /*Depth first(pre-order) enumerator*/
        private readonly TreeNode<T> _tree;
        private TreeNode<T> _current;
        private TreeNode<T> _previous;
        private readonly Stack<TreeNode<T>> _breadcrumb = new Stack<TreeNode<T>>();
        private int _count;

        public TreeNodeEnumerator(TreeNode<T> tree)
        {
            _tree = tree;
        }

        public void Dispose()
        {
            
        }

        public bool MoveNext()
        {
            if(_current == null)
            {
                Reset();
                _current = _tree;
                return true;
            }

            if(_current.LeftChild != null)
            {
                return TraverseLeft();
            }
            if (_current.RightChild != null)
            {
                return TraverseRight();
            }

            return TraverseUpAndRight();
        }

        private bool TraverseUpAndRight()
        {
            if(_breadcrumb.Count > 0)
            {
                _previous = _current;
                while(true)
                {
                    _current = _breadcrumb.Pop();
                    if (_breadcrumb.Count == 0) _count += 1;
                    if (_previous != _current.RightChild) break;
                }
                if(_count > 1) return false;
                if (_current.RightChild != null)
                {
                   _breadcrumb.Push(_current);
                    _current = _current.RightChild;
                    return true;
                }
            }
            return false;
        }

        private bool TraverseRight()
        {
            _breadcrumb.Push(_current);
            _current = _current.RightChild;
            return true;
        }

        private bool TraverseLeft()
        {
            _breadcrumb.Push(_current);
            _current = _current.LeftChild;
            return true;
        }

        public void Reset()
        {
            _current = null;
        }

        public T Current { get { return _current.Value; }}

        object IEnumerator.Current
        {
            get { return Current; }
        }
    }
}
