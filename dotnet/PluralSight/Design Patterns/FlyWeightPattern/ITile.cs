using System.Drawing;

namespace FlyWeightPattern
{
    internal interface ITile
    {
        void Draw(Graphics g, int x, int y, int width, int height);
    }
}
