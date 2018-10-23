using System;
using System.Collections.Generic;
using System.Reflection;
using Factory_Pattern.Factory1.Autos;

namespace Factory_Pattern.Factory1
{
    class AutoFactory
    {
        private Dictionary<string, Type> _autos;

        public AutoFactory()
        {
            LoadTypesICanReturn();
        }

        private void LoadTypesICanReturn()
        {
            _autos = new Dictionary<string, Type>();

            Type[] typesInThisAssembly = Assembly.GetExecutingAssembly().GetTypes();

            foreach (var type in typesInThisAssembly)
            {
                if(type.GetInterface(typeof(IAuto).ToString())!= null)
                {
                    _autos.Add(type.Name.ToLower(), type);
                }
            }
        }


        public IAuto CreateInstance(string carname)
        {
            Type t = GetTypeToCreate(carname);

            if (t == null)
                return new NullAuto();

            return Activator.CreateInstance(t) as IAuto;


        }

        private Type GetTypeToCreate(string carname )
        {
            foreach (var auto in _autos)
            {
                if(auto.Key.Contains(carname))
                {
                    return _autos[auto.Key];
                }
            }
            return null;
        }
    }
}
