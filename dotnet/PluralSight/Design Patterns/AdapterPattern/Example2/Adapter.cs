using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdapterPattern.Example2
{
    class LineAdapter: IShape {
         private readonly Line _adaptee;

        public LineAdapter(Line line) {
            _adaptee = line;
        }

        
        public void Draw(int x1, int y1, int x2, int y2) {
            _adaptee.Draw(x1, y1, x2, y2);
        }
    }

    class RectangleAdapter: IShape {
        private readonly Rectangle _adaptee;

        public RectangleAdapter(Rectangle rectangle) {
            _adaptee = rectangle;
        }

   
        public void Draw(int x1, int y1, int x2, int y2) {
            int x = Math.Min(x1, x2);
            int y = Math.Min(y1, y2);
            int width = Math.Abs(x2 - x1);
            int height = Math.Abs(y2 - y1);
            _adaptee.Draw(x, y, width, height);
        }
    }
}
