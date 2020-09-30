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
        //static IControllerConstructorFn TodoCtrlConstructor2 = (object[] p) =>
        //{
        //    Union<Retyped.Primitive.Void, IController> result = new TodoCtrl(p[0].As<IHttpService>(), p[1].As<ITodoCtrlScope>());
        //    return result;
        //};
        //Union<Retyped.Primitive.Void, IController> TodoCtrlConstructor3(params object[] p)
        //{
        //    Union<Retyped.Primitive.Void, IController> result = new TodoCtrl(p[0].As<IHttpService>(), p[1].As<ITodoCtrlScope>());
        //    return result;
        //}

        static IControllerConstructorCtorFn TodoCtrlInitializerDelegate;

        public static void Main()
        {
            // Write a message to the Console
            Console.WriteLine("Welcome to Bridge.NET");


            //TodoCtrlInitializerDelegate = new IControllerConstructorCtorFn((object[] args) =>
            //    new TodoCtrl(args[0].As<IHttpService>(), args[1].As<ITimeoutService>(), args[2].As<ITodoCtrlScope>()));

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

            //var todoCtrlConstructor = new es5.Array<Union<string, IControllerConstructor>>(
            //        "$http",
            //        "$timeout",
            //        "$scope", (IControllerConstructor)TodoCtrlInitializerDelegate);
            app.controller("todoCtrl", todoCtrlConstructor);

        }

        static void InitLocationProvider(ILocationProvider locationProvider)
        {
            locationProvider.hashPrefix("");
        }

    }
    public class TodoCtrl : IController
    {
        //[nnnName("$inject")]
        //[nnnBridge.InlineConst]
        //nnnpublic static string[] inject = new string[] { "$http", "$timeout","$scope" };
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
    public abstract class ITodoCtrlScope : IScope
    {
        [Field]
        public int Width { get; set; }
        [Field]
        public int Height { get; set; }

    }
}