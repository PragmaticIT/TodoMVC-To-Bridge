using System;
using Bridge.Html5;

namespace VanillaJs.BridgeConversion
{
    public class App
    {
        public class Todo
        {
            public Todo(string name)
            {
                this.Storage = new Store(name);
                this.Model = new Model(this.Storage);
                this.Template = new Template();
                this.View = new View(this.Template);
                this.Controller = new Controller(this.Model, this.View);
            }

            public Store Storage { get; private set; }
            public Model Model { get; private set; }
            public Template Template { get; private set; }
            public View View { get; private set; }
            public Controller Controller { get; private set; }
        }

        private static Todo todo = new Todo("todos-vanillajs-bridge");

        static void SetView()
        {
            todo.Controller.SetView(Document.Location.Hash);
        }

        public static void Main()
        {
            //todo: add event 
            //$on(window, 'load', setView);
            //$on(window, 'hashchange', setView);
            Helpers.On(Window.Instance.As<HTMLElement>(), "load", evnt => SetView());
            Helpers.On(Window.Instance.As<HTMLElement>(), "hashchange", evnt => SetView());
        }

    }
}
