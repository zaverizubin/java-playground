using System.Collections.Generic;

namespace FlyWeightPattern
{
    class TileFactory
    {
        static Dictionary<string, ITile>  tiles = new Dictionary<string, ITile>();

        public static ITile GetTile(string tileType)
        {
            switch (tileType)
            {
                case "Ceramic":
                    if(!tiles.ContainsKey("Ceramic"))
                    {
                        tiles["Ceramic"] = new CeramicTile();
                    }
                    return tiles["Ceramic"];
                    
                case "Stone":
                    if (!tiles.ContainsKey("Stone"))
                    {
                        tiles["Stone"] = new StoneTile();
                    }
                    return tiles["Stone"];
            }
            return null;
        }
    }
}
