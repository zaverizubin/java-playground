namespace TestModelFirst
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnAdd = new System.Windows.Forms.Button();
            this.btnAddPurchase = new System.Windows.Forms.Button();
            this.btnUpdatePurchase = new System.Windows.Forms.Button();
            this.btnDeletePurchase = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnAdd
            // 
            this.btnAdd.Location = new System.Drawing.Point(108, 54);
            this.btnAdd.Name = "btnAdd";
            this.btnAdd.Size = new System.Drawing.Size(75, 23);
            this.btnAdd.TabIndex = 0;
            this.btnAdd.Text = "Add";
            this.btnAdd.UseVisualStyleBackColor = true;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);
            // 
            // btnAddPurchase
            // 
            this.btnAddPurchase.Location = new System.Drawing.Point(62, 111);
            this.btnAddPurchase.Name = "btnAddPurchase";
            this.btnAddPurchase.Size = new System.Drawing.Size(163, 23);
            this.btnAddPurchase.TabIndex = 1;
            this.btnAddPurchase.Text = "Add Purchase";
            this.btnAddPurchase.UseVisualStyleBackColor = true;
            this.btnAddPurchase.Click += new System.EventHandler(this.btnAddPurchase_Click);
            // 
            // btnUpdatePurchase
            // 
            this.btnUpdatePurchase.Location = new System.Drawing.Point(62, 169);
            this.btnUpdatePurchase.Name = "btnUpdatePurchase";
            this.btnUpdatePurchase.Size = new System.Drawing.Size(163, 23);
            this.btnUpdatePurchase.TabIndex = 2;
            this.btnUpdatePurchase.Text = "Update Purchase";
            this.btnUpdatePurchase.UseVisualStyleBackColor = true;
            this.btnUpdatePurchase.Click += new System.EventHandler(this.btnUpdatePurchase_Click);
            // 
            // btnDeletePurchase
            // 
            this.btnDeletePurchase.Location = new System.Drawing.Point(62, 224);
            this.btnDeletePurchase.Name = "btnDeletePurchase";
            this.btnDeletePurchase.Size = new System.Drawing.Size(163, 23);
            this.btnDeletePurchase.TabIndex = 3;
            this.btnDeletePurchase.Text = "Delete Purchase";
            this.btnDeletePurchase.UseVisualStyleBackColor = true;
            this.btnDeletePurchase.Click += new System.EventHandler(this.btnDeletePurchase_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Controls.Add(this.btnDeletePurchase);
            this.Controls.Add(this.btnUpdatePurchase);
            this.Controls.Add(this.btnAddPurchase);
            this.Controls.Add(this.btnAdd);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Button btnAddPurchase;
        private System.Windows.Forms.Button btnUpdatePurchase;
        private System.Windows.Forms.Button btnDeletePurchase;
    }
}

