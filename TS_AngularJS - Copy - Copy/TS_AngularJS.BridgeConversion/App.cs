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

            var app = angular.angular3.module("todomvc", new string[] { });

            //this one works but is ugly:
            //var todoCtrlConstructor = new es5.Array<Union<string, IControllerConstructor>>(
            //        "$http",
            //        "$timeout",
            //        "$scope",
            //        (IControllerConstructor)(new IControllerConstructorCtorFn((object[] args) =>
            //                 new TodoCtrl(
            //                    args[0].As<IHttpService>(),
            //                    args[1].As<ITimeoutService>(),
            //                    args[2].As<ITodoCtrlScope>()))
            //));

            //app.controller("todoCtrl", todoCtrlConstructor);

            app.controller("test1", new es5.Array<Union<string, IControllerConstructor>>(
                "$scope",
                (IControllerConstructor)(new IControllerConstructorCtorFn((object[] args) => new TestCtrl(args[0] as TestCtrlScope)))
                ));

            angular.angular3.bootstrap(
                Bridge.Html5.Document.Instance.As<dom.Element>(),
                new es5.Array<string>("todomvc")
                );

        }

    }
    [Virtual]
    [ObjectLiteral]
    public abstract class TestCtrlScope : IScope
    {
        private string _greeting = "greeting";
        public string greeting
        {
            get { return _greeting; }
            set
            {
                _greeting = value;
            }
        }

        public int Height { get; set; }
        public int height { get; set; }
    }
    [Virtual]
    public class TestCtrl : IController
    {
        private TestCtrlScope _scope;

        public TestCtrl(TestCtrlScope scope)
        {
            _scope = scope;
            _scope.greeting = "Yo!";
            _scope.Height = 100;
            _scope.height = 200;
            _scope._apply();
        }
    }
    //public class TodoCtrl : IController
    //{
    //    private readonly IHttpService _httpService;
    //    private readonly ITimeoutService _timeOutService;
    //    private readonly ITodoCtrlScope _scope;

    //    public TodoCtrl(IHttpService httpService, ITimeoutService timeoutService, ITodoCtrlScope scope)
    //    {
    //        _httpService = httpService;
    //        _timeOutService = timeoutService;
    //        _scope = scope;

    //        _scope.Height = 40;

    //        _timeOutService.Self(2000).then<Retyped.Primitive.Void, Retyped.Primitive.Void>((arg) =>
    //        {
    //            Console.WriteLine("timeout...");
    //            _scope.Height = 1000;
    //            _scope._apply();
    //            return null;
    //        });
    //        Bridge.Html5.Window.Instance.As<IHasScopeSpy>().Spy = _scope;
    //    }
    //}
    //public interface IHasScopeSpy
    //{
    //    object Spy { get; set; }

    //}
    //public abstract class ITodoCtrlScope : IScope
    //{
    //    [Field]
    //    public int Width { get; set; }
    //    [Field]
    //    public int Height { get; set; }

    //}
}
