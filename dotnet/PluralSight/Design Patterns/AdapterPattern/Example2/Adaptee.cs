using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdapterPattern.Example2
{
    class Line
    {
        public void Draw(int x1, int y1, int x2, int y2) {
            Console.WriteLine("Line from point A(" + x1 + ";" + y1 + "), to point B(" + x2 + ";" + y2 + ")");
        }
    }

    class Rectangle
    {
        public void Draw(int x, int y, int width, int height)
        {
            Console.WriteLine("Rectangle with coordinate left-down point (" + x + ";" + y + "), width: " + width + ", height: " + height);
        }
    }

}
