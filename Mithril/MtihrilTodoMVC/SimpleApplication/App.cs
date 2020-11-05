using Bridge;
using Bridge.Html5;
using Newtonsoft.Json;
using PragmaticIt.BridgeNet.MithrilBridge;
using System;

namespace SimpleApplication
{
    public class App
    {
        public static void Main()
        {
            // Write a message to the Console
            Console.WriteLine("Welcome to Bridge.NET");
            M.Route.Prefix="#"  ;
            M.Routes(Document.Body, "/list", new HandlerBuilder()
                .Add("/list", new HandlerBuilder()
                    .Add("render", () => { return M.m<Layout>(null, M.m<UserList>(null, null)); })
                    .Build())
                .Add("/edit/:id", new HandlerBuilder()
                    .Add("render", (Vnode<object> vnode) => { return M.m<Layout>(null, M.m<UserForm>(vnode.Attrs, null)); })
                    .Build())
                .Build());
            
        }
    }
}