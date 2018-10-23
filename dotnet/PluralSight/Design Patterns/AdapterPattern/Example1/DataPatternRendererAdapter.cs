using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace AdapterPattern.Example1
{
    /*
     The adapter class that wraps an instance of the adaptee(DataRenderer) and uses the adaptee's render method write an IEnumerable using a Stringwriter.
     */
    public class PatternRendererAdapter
    {
        private DataRenderer _dataRenderer;

        public string ListPatterns(IEnumerable<Pattern> patterns)
        {
            var adapter = new PatternCollectionDataAdapter(patterns);
            var writer = new StringWriter();

            _dataRenderer = new DataRenderer(adapter);
            _dataRenderer.Render(writer);
            return writer.ToString();
        }
    }

    class PatternCollectionDataAdapter : IDbDataAdapter
    {
        private readonly IEnumerable<Pattern> _patterns;

        public PatternCollectionDataAdapter(IEnumerable<Pattern> patterns)
        {
            _patterns = patterns;

        }
        public int Fill(DataSet dataSet)
        {
            var myDataTable = new DataTable();
            myDataTable.Columns.Add(new DataColumn("Id", typeof(int)));
            myDataTable.Columns.Add(new DataColumn("Name", typeof(string)));
            myDataTable.Columns.Add(new DataColumn("Description", typeof(string)));

            foreach (var pattern in _patterns)
            {
                var myRow = myDataTable.NewRow();
                myRow[0] = pattern.Id;
                myRow[1] = pattern.Name;
                myRow[2] = pattern.Description;
                myDataTable.Rows.Add(myRow);
                dataSet.Tables.Add(myDataTable);
                dataSet.AcceptChanges();
            }

            return 1;
        }

        #region "Not Implemented"
        public DataTable[] FillSchema(DataSet dataSet, SchemaType schemaType)
        {
            throw new NotImplementedException();
        }



        public IDataParameter[] GetFillParameters()
        {
            throw new NotImplementedException();
        }

        public int Update(DataSet dataSet)
        {
            throw new NotImplementedException();
        }

        public MissingMappingAction MissingMappingAction { get; set; }
        public MissingSchemaAction MissingSchemaAction { get; set; }
        public ITableMappingCollection TableMappings { get; private set; }
        public IDbCommand SelectCommand { get; set; }
        public IDbCommand InsertCommand { get; set; }
        public IDbCommand UpdateCommand { get; set; }
        public IDbCommand DeleteCommand { get; set; }
        #endregion

    }
}
