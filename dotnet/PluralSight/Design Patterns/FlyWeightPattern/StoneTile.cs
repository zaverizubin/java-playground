using System.Drawing;

namespace FlyWeightPattern
{
    class StoneTile: ITile
    {
        public static int ObjectCounter = 0;

        private readonly Brush _paintBrush;

        public StoneTile()
        {
            _paintBrush = Brushes.Blue;
            ++ObjectCounter;
        }

        public void Draw(Graphics g, int x, int y , int width, int height)
        {
            g.FillRectangle(_paintBrush, x,y,width, height);
        }
    }

    
}
