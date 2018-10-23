using System;
using System.Collections.Generic;

namespace BuilderPatter
{
    class Sandwich
    {
        public BreadType BreadType { get; set; }
        public CheeseType CheeseType { get; set; }
        public MeatType MeatType { get; set; }
        public bool IsToasted { get; set; }
        public bool HasMustard { get; set; }
        public bool HasMayo { get; set; }
        public List<string> Vegetables { get; set; }

        public void Display()
        {
            Console.WriteLine("BreadType:{0}", BreadType);
            Console.WriteLine("CheeseType:{0}", CheeseType);
            Console.WriteLine("MeatType:{0}", MeatType);
            Console.WriteLine("HasMustard:{0}", HasMustard);
            Console.WriteLine("HasMayo:{0}", HasMayo);
            Console.WriteLine("Vegetables:");
            foreach (var vegetable in Vegetables)
            {
                Console.WriteLine("{0},", vegetable); 
            }
            Console.WriteLine(""); 
        } 

    }

    public enum BreadType
    {
        Garlic,
        Wheat,
        WholeGrain
    }

    public enum CheeseType
    {
        Mozerella,
        Swiss
    }

    public enum MeatType
    {
        Chicken,
        Turkey
    }

}
