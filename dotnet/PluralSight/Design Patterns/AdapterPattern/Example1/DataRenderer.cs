using System.Data;
using System.IO;

namespace AdapterPattern.Example1
{
    /*
     The adaptee class who's interface must be adopted by the adapter.
     */
    public class DataRenderer
    {
        
        private readonly IDbDataAdapter _dataAdapter;

        public DataRenderer(IDbDataAdapter dataAdapter)
        {
            _dataAdapter = dataAdapter;
        }

        public void Render(TextWriter writer)
        {
            writer.WriteLine("Rendering Data:");
            var myDataSet = new DataSet();
            _dataAdapter.Fill(myDataSet);

            foreach (DataTable table in myDataSet.Tables)
            {
                foreach (DataColumn column in table.Columns)
                {
                    writer.WriteLine(column.ColumnName.PadRight(20) + " ");
                }
                writer.WriteLine();
                foreach (DataRow row in table.Rows)
                {
                    for (int i = 0; i < table.Columns.Count; i++)
                    {
                        writer.WriteLine(row[i].ToString().PadRight(20) + " ");
                    }
                    writer.WriteLine();
                }

            }
           
        }
    }
}
