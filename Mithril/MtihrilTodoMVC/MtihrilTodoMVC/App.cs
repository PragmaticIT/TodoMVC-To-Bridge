using Bridge.Html5;
using PragmaticIt.BridgeNet.MithrilBridge;
using PragmaticIt.MtihrilTodoMVC.TodoMvc;
using System;

namespace PragmaticIt.MtihrilTodoMVC
{
    public class App
    {

        public static State State = new State();
        public static void Main()
        {
            // Write a message to the Console
            //Console.WriteLine("Welcome to Bridge.NET");
            
            //Console.WriteLine(M.Version());
            var root = Document.Body;
            var routes = new RouteBuilder()
                .Add("/").Component<TodoMvc.TodosComponent>()
                .Add("/:status").Component<TodoMvc.TodosComponent>()
                .Build();
            M.Routes(Document.GetElementById("todoapp"), "/", routes);
            // M.Route(Document.GetElementById("todoapp"), "/", Bridge.Script.Call<string>("{'/':Todos}"));

            // After building (Ctrl + Shift + B) this project, 
            // browse to the /bin/Debug or /bin/Release folder.

            // A new bridge/ folder has been created and
            // contains your projects JavaScript files. 

            // Open the bridge/index.html file in a browser by
            // Right-Click > Open With..., then choose a
            // web browser from the list

            // This application will then run in the browser.
        }
    }
}