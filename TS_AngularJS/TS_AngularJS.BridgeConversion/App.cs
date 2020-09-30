using Bridge;
using Newtonsoft.Json;
using System;
using static Retyped.angular.angular2;
using Retyped;
using static Retyped.angular.angular2.IControllerConstructor;

namespace TS_AngularJS.BridgeConversion
{
    public class App
    {
        public static void Main()
        {
            // Write a message to the Console
            Console.WriteLine("Welcome to Bridge.NET");


            
            // application declaration
            var app = angular.angular3.module("todomvc", new string[] { });

            //this one works but is ugly:
            var todoCtrlConstructor = new es5.Array<Union<string, IControllerConstructor>>(
                    "$http",
                    "$timeout",
                    "$scope",
                    (IControllerConstructor)(new IControllerConstructorCtorFn((object[] args) =>
                             new TodoCtrl(
                                args[0].As<IHttpService>(),
                                args[1].As<ITimeoutService>(),
                                args[2].As<ITodoCtrlScope>()))
            ));

            ////var todoCtrlConstructor = new es5.Array<Union<string, IControllerConstructor>>(
            ////        "$http",
            ////        "$timeout",
            ////        "$scope", (IControllerConstructor)TodoCtrlInitializerDelegate);
            //app.controller("todoCtrl", todoCtrlConstructor);


            app.controller("todoCtrl", new es5.Array<string>("$http", "$timeout", "$scope", typeof(TodoCtrl).Name));
        }

        static void InitLocationProvider(ILocationProvider locationProvider)
        {
            locationProvider.hashPrefix("");
        }

    }
    public class TodoCtrl : IController
    {
        [Name("$inject")]
        [InlineConst]
        public static string[] inject = new string[] { "$http", "$timeout", "$scope" };
        private readonly IHttpService _httpService;
        private readonly ITimeoutService _timeOutService;
        private readonly ITodoCtrlScope _scope;

        public TodoCtrl(IHttpService httpService, ITimeoutService timeoutService, ITodoCtrlScope scope)
        {
            _httpService = httpService;
            _timeOutService = timeoutService;
            _scope = scope;

            _timeOutService.Self(2000).then<Retyped.Primitive.Void, Retyped.Primitive.Void>((arg) =>
            {
                Console.WriteLine("timeout...");
                _scope.Height = 1000;
                _scope._apply();
                return null;
            });
            Bridge.Html5.Window.Instance.As<IHasScopeSpy>().Spy = _scope;
        }
    }
    public interface IHasScopeSpy
    {
        object Spy { get; set; }

    }
    [IgnoreCast]
    public abstract class ITodoCtrlScope : IScope
    {
        [Field]
        public int Width { get; set; }
        [Field]
        public int Height { get; set; }

    }
}