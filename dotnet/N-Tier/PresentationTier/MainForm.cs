using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;



//https://docs.microsoft.com/en-us/visualstudio/data-tools/walkthrough-creating-an-n-tier-data-application

namespace PresentationTier
{
    public partial class MainForm : Form
    {

       

        public MainForm()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            btnCreate_Click(null, null);
        }
        
        private void btnCreate_Click(object sender, EventArgs e)
        {
            splitContainer1.Panel2.Controls.Clear();
            splitContainer1.Panel2.Controls.Add(new UC_CRUD());
        }
        
        private void BtnRelationships_Click(object sender, EventArgs e)
        {
            splitContainer1.Panel2.Controls.Clear();
            splitContainer1.Panel2.Controls.Add(new UC_Relationships());
        }
    }


}
