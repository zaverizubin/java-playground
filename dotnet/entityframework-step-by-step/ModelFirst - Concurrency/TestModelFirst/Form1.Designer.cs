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
            this.btnConcurrency = new System.Windows.Forms.Button();
            this.btnRowVersion = new System.Windows.Forms.Button();
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
            // btnConcurrency
            // 
            this.btnConcurrency.Location = new System.Drawing.Point(108, 108);
            this.btnConcurrency.Name = "btnConcurrency";
            this.btnConcurrency.Size = new System.Drawing.Size(75, 23);
            this.btnConcurrency.TabIndex = 1;
            this.btnConcurrency.Text = "Concurrency";
            this.btnConcurrency.UseVisualStyleBackColor = true;
            this.btnConcurrency.Click += new System.EventHandler(this.btnConcurrency_Click);
            // 
            // btnRowVersion
            // 
            this.btnRowVersion.Location = new System.Drawing.Point(108, 155);
            this.btnRowVersion.Name = "btnRowVersion";
            this.btnRowVersion.Size = new System.Drawing.Size(75, 23);
            this.btnRowVersion.TabIndex = 2;
            this.btnRowVersion.Text = "RowVersion";
            this.btnRowVersion.UseVisualStyleBackColor = true;
            this.btnRowVersion.Click += new System.EventHandler(this.btnRowVersion_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Controls.Add(this.btnRowVersion);
            this.Controls.Add(this.btnConcurrency);
            this.Controls.Add(this.btnAdd);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Button btnConcurrency;
        private System.Windows.Forms.Button btnRowVersion;
    }
}

