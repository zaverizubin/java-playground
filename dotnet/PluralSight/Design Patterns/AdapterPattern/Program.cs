using AdapterPattern.Example2;

namespace AdapterPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            /*Example 2
            var shapes = new IShape[]{new RectangleAdapter(new Rectangle()), new LineAdapter(new Line())};
            const int x1 = 10;
            const int y1 = 20;
            const int x2 = 30;
            const int y2 = 60;

            foreach (var shape in shapes) {
                shape.Draw(x1, y1, x2, y2);
            }
            */
        }
    }
}
