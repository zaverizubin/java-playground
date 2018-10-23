using System.Collections.Generic;
using System.Windows;
using System.Windows.Input;

namespace Paint
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly Stack<IMemento> states = new Stack<IMemento>();

        public MainWindow()
        {
            InitializeComponent();
            CommandBindings.Add(new CommandBinding(ApplicationCommands.Undo, OnExecutedCommands));
            InkCanvasWithUndo1.MouseUp += InkCanvasWithUndo1_MouseUp;
            StoreState();
        }

        private void InkCanvasWithUndo1_MouseUp(object sender, MouseButtonEventArgs e)
        {
            StoreState();
        }

        private void OnExecutedCommands(object sender, ExecutedRoutedEventArgs e)
        {
            var myWindow = (MainWindow) sender;
            if (e.Command == ApplicationCommands.Undo)
            {
                myWindow.Undo(sender, e);
            }
        }

        private void Undo(object sender, ExecutedRoutedEventArgs executedRoutedEventArgs)
        {
            if (states.Count > 1)
            {
                states.Pop();
                var lastState = states.Peek();
                InkCanvasWithUndo1.SetMemento(lastState);
            }
            label1.Content = states.Count;
        }

        private void StoreState()
        {
            var memento = InkCanvasWithUndo1.CreateMemento();
            states.Push(memento);
            label1.Content = states.Count;
        }
    }
}
