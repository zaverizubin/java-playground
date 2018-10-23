using System;

namespace IteratorPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            var treeNode = new TreeNode<string>("A")
                {
                    LeftChild = new TreeNode<string>("B")
                        {
                            LeftChild = new TreeNode<string>("D")
                                {
                                    LeftChild = new TreeNode<string>("I"),
                                    RightChild = new TreeNode<string>("J"),
                                },
                            RightChild = new TreeNode<string>("F"),

                        },
                    RightChild = new TreeNode<string>("C")
                        {
                            LeftChild = new TreeNode<string>("G")
                                {
                                    RightChild = new TreeNode<string>("K")
                                },
                            RightChild = new TreeNode<string>("H"),
                        }
                };

            Console.WriteLine(String.Join(" ", treeNode.ToListInOrder().ToArray()));
            Console.WriteLine(String.Join(" ", treeNode.ToListPreOrder().ToArray()));
            Console.WriteLine(String.Join(" ", treeNode.ToListPostOrder().ToArray()));

            //Using an enumerator
            String output = string.Empty;
            foreach (var y in treeNode)
            {
                output += String.Format("{0} ", y);
            }
            Console.WriteLine(output.TrimEnd());

            Console.ReadKey();
        }
    }
}
