/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.4.0
 */
Bridge.assembly("TS_AngularJS.BridgeConversion", function ($asm, globals) {
    "use strict";

    require(["angular"], function (angular) {
        Bridge.define("TS_AngularJS.BridgeConversion.App", {
            main: function Main () {
                var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                System.Console.WriteLine("Welcome to Bridge.NET");
    
    
    
                var app = angular.module("todomvc", System.Array.init([], System.String));
    
                var todoCtrlConstructor = new Array("$http", "$timeout", "$scope", ($t6 = ($t = { ntype: 38, t: System.Array.type(System.Object), n: "args" }, ($t5 = { ntype: 10, t: Bridge.virtualc("angular.IController"), operand: ($t4 = Bridge.getMetadata(TS_AngularJS.BridgeConversion.TodoCtrl).m[0], { ntype: 31, t: $t4.td, constructor: $t4, arguments: Bridge.toList([($t1 = {"td":System.ObjectExtensions,"a":2,"n":"As","is":true,"t":8,"pi":[{"n":"obj","pt":System.Object,"ps":0}],"tpc":1,"def":function (T, obj) { return obj; },"rt":Bridge.virtualc("angular.IHttpService"),"p":[System.Object]}, { ntype: 6, t: $t1.rt, obj: null, method: $t1, args: Bridge.toList([{ ntype: 5, t: System.Object, left: $t, right: { ntype: 9, t: System.Int32, value: 0 } }]) }),($t2 = {"td":System.ObjectExtensions,"a":2,"n":"As","is":true,"t":8,"pi":[{"n":"obj","pt":System.Object,"ps":0}],"tpc":1,"def":function (T, obj) { return obj; },"rt":Bridge.virtualc("angular.ITimeoutService"),"p":[System.Object]}, { ntype: 6, t: $t2.rt, obj: null, method: $t2, args: Bridge.toList([{ ntype: 5, t: System.Object, left: $t, right: { ntype: 9, t: System.Int32, value: 1 } }]) }),($t3 = {"td":System.ObjectExtensions,"a":2,"n":"As","is":true,"t":8,"pi":[{"n":"obj","pt":System.Object,"ps":0}],"tpc":1,"def":function (T, obj) { return obj; },"rt":TS_AngularJS.BridgeConversion.ITodoCtrlScope,"p":[System.Object]}, { ntype: 6, t: $t3.rt, obj: null, method: $t3, args: Bridge.toList([{ ntype: 5, t: System.Object, left: $t, right: { ntype: 9, t: System.Int32, value: 2 } }]) })]) }) }, { ntype: 18, t: Function, rt: $t5.t, body: $t5, p: Bridge.toList([$t]) })), ($t6.body.t[$t6.body.constructor.sn] || $t6.body.t)));
    
                app.controller("todoCtrl", todoCtrlConstructor);
    
            },
            statics: {
                fields: {
                    TodoCtrlInitializerDelegate: null
                },
                methods: {
                    InitLocationProvider: function (locationProvider) {
                        locationProvider.hashPrefix("");
                    }
                }
            }
        });
    
        Bridge.define("TS_AngularJS.BridgeConversion.IHasScopeSpy", {
            $kind: "interface"
        });
    
        Bridge.define("TS_AngularJS.BridgeConversion.ITodoCtrlScope", {
            inherits: [Bridge.virtualc("angular.IScope")],
            fields: {
                Width: 0,
                Height: 0
            }
        });
    
        Bridge.define("TS_AngularJS.BridgeConversion.TodoCtrl", {
            inherits: [Bridge.virtualc("angular.IController")],
            fields: {
                _httpService: null,
                _timeOutService: null,
                _scope: null
            },
            ctors: {
                ctor: function (httpService, timeoutService, scope) {
                    this.$initialize();
                    Bridge.virtualc("angular.IController").call(this);
                    this._httpService = httpService;
                    this._timeOutService = timeoutService;
                    this._scope = scope;
    
                    this._timeOutService(2000).then(Bridge.fn.bind(this, function (arg) {
                        System.Console.WriteLine("timeout...");
                        this._scope.Height = 1000;
                        this._scope.$apply();
                        return null;
                    }));
                    window.TS_AngularJS$BridgeConversion$IHasScopeSpy$Spy = this._scope;
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUU19Bbmd1bGFySlMuQnJpZGdlQ29udmVyc2lvbi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Z0JBeUJZQTs7OztnQkFPQUEsVUFBVUEsMEJBQW1DQTs7Z0JBRzdDQSwwQkFBMEJBLElBQUlBLHFDQUl0QkEsQUFBa0RBLE9BQWlGQTs7Z0JBVzNJQSwyQkFBMkJBOzs7Ozs7OztvREFJRUE7d0JBRTdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBYVlBLGFBQW1EQSxnQkFBeURBOzs7b0JBRXhIQSxvQkFBZUE7b0JBQ2ZBLHVCQUFrQkE7b0JBQ2xCQSxjQUFTQTs7b0JBRVRBLGdDQUFnRkEsQUFBbUpBLCtCQUFDQTt3QkFFaE9BO3dCQUNBQTt3QkFDQUE7d0JBQ0FBLE9BQU9BOztvQkFFWEEsd0RBQXNEQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE5ld3RvbnNvZnQuSnNvbjtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBSZXR5cGVkO1xyXG5cclxubmFtZXNwYWNlIFRTX0FuZ3VsYXJKUy5CcmlkZ2VDb252ZXJzaW9uXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICAvL3N0YXRpYyBJQ29udHJvbGxlckNvbnN0cnVjdG9yRm4gVG9kb0N0cmxDb25zdHJ1Y3RvcjIgPSAob2JqZWN0W10gcCkgPT5cclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICBVbmlvbjxSZXR5cGVkLlByaW1pdGl2ZS5Wb2lkLCBJQ29udHJvbGxlcj4gcmVzdWx0ID0gbmV3IFRvZG9DdHJsKHBbMF0uQXM8SUh0dHBTZXJ2aWNlPigpLCBwWzFdLkFzPElUb2RvQ3RybFNjb3BlPigpKTtcclxuICAgICAgICAvLyAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIC8vfTtcclxuICAgICAgICAvL1VuaW9uPFJldHlwZWQuUHJpbWl0aXZlLlZvaWQsIElDb250cm9sbGVyPiBUb2RvQ3RybENvbnN0cnVjdG9yMyhwYXJhbXMgb2JqZWN0W10gcClcclxuICAgICAgICAvL3tcclxuICAgICAgICAvLyAgICBVbmlvbjxSZXR5cGVkLlByaW1pdGl2ZS5Wb2lkLCBJQ29udHJvbGxlcj4gcmVzdWx0ID0gbmV3IFRvZG9DdHJsKHBbMF0uQXM8SUh0dHBTZXJ2aWNlPigpLCBwWzFdLkFzPElUb2RvQ3RybFNjb3BlPigpKTtcclxuICAgICAgICAvLyAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBzdGF0aWMgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklDb250cm9sbGVyQ29uc3RydWN0b3IuSUNvbnRyb2xsZXJDb25zdHJ1Y3RvckN0b3JGbiBUb2RvQ3RybEluaXRpYWxpemVyRGVsZWdhdGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFdyaXRlIGEgbWVzc2FnZSB0byB0aGUgQ29uc29sZVxyXG4gICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcIldlbGNvbWUgdG8gQnJpZGdlLk5FVFwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL1RvZG9DdHJsSW5pdGlhbGl6ZXJEZWxlZ2F0ZSA9IG5ldyBJQ29udHJvbGxlckNvbnN0cnVjdG9yQ3RvckZuKChvYmplY3RbXSBhcmdzKSA9PlxyXG4gICAgICAgICAgICAvLyAgICBuZXcgVG9kb0N0cmwoYXJnc1swXS5BczxJSHR0cFNlcnZpY2U+KCksIGFyZ3NbMV0uQXM8SVRpbWVvdXRTZXJ2aWNlPigpLCBhcmdzWzJdLkFzPElUb2RvQ3RybFNjb3BlPigpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBsaWNhdGlvbiBkZWNsYXJhdGlvblxyXG4gICAgICAgICAgICB2YXIgYXBwID0gYW5ndWxhci5hbmd1bGFyMy5tb2R1bGUoXCJ0b2RvbXZjXCIsIG5ldyBzdHJpbmdbXSB7IH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzIG9uZSB3b3JrcyBidXQgaXMgdWdseTpcclxuICAgICAgICAgICAgdmFyIHRvZG9DdHJsQ29uc3RydWN0b3IgPSBuZXcgZXM1LkFycmF5PFVuaW9uPHN0cmluZywgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklDb250cm9sbGVyQ29uc3RydWN0b3I+PihcclxuICAgICAgICAgICAgICAgICAgICBcIiRodHRwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIkdGltZW91dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiJHNjb3BlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgKFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JQ29udHJvbGxlckNvbnN0cnVjdG9yKShuZXcgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklDb250cm9sbGVyQ29uc3RydWN0b3IuSUNvbnRyb2xsZXJDb25zdHJ1Y3RvckN0b3JGbigob2JqZWN0W10gYXJncykgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVG9kb0N0cmwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1swXS5BczxSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSUh0dHBTZXJ2aWNlPigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMV0uQXM8UmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklUaW1lb3V0U2VydmljZT4oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzWzJdLkFzPElUb2RvQ3RybFNjb3BlPigpKSlcclxuICAgICAgICAgICAgKSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciB0b2RvQ3RybENvbnN0cnVjdG9yID0gbmV3IGVzNS5BcnJheTxVbmlvbjxzdHJpbmcsIElDb250cm9sbGVyQ29uc3RydWN0b3I+PihcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiJGh0dHBcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiJHRpbWVvdXRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiJHNjb3BlXCIsIChJQ29udHJvbGxlckNvbnN0cnVjdG9yKVRvZG9DdHJsSW5pdGlhbGl6ZXJEZWxlZ2F0ZSk7XHJcbiAgICAgICAgICAgIGFwcC5jb250cm9sbGVyKFwidG9kb0N0cmxcIiwgdG9kb0N0cmxDb25zdHJ1Y3Rvcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgSW5pdExvY2F0aW9uUHJvdmlkZXIoUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklMb2NhdGlvblByb3ZpZGVyIGxvY2F0aW9uUHJvdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBUb2RvQ3RybCA6IFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JQ29udHJvbGxlclxyXG4gICAge1xyXG4gICAgICAgIC8vW25ubk5hbWUoXCIkaW5qZWN0XCIpXVxyXG4gICAgICAgIC8vW25ubkJyaWRnZS5JbmxpbmVDb25zdF1cclxuICAgICAgICAvL25ubnB1YmxpYyBzdGF0aWMgc3RyaW5nW10gaW5qZWN0ID0gbmV3IHN0cmluZ1tdIHsgXCIkaHR0cFwiLCBcIiR0aW1lb3V0XCIsXCIkc2NvcGVcIiB9O1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklIdHRwU2VydmljZSBfaHR0cFNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSVRpbWVvdXRTZXJ2aWNlIF90aW1lT3V0U2VydmljZTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElUb2RvQ3RybFNjb3BlIF9zY29wZTtcclxuXHJcbiAgICAgICAgcHVibGljIFRvZG9DdHJsKFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JSHR0cFNlcnZpY2UgaHR0cFNlcnZpY2UsIFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JVGltZW91dFNlcnZpY2UgdGltZW91dFNlcnZpY2UsIElUb2RvQ3RybFNjb3BlIHNjb3BlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2h0dHBTZXJ2aWNlID0gaHR0cFNlcnZpY2U7XHJcbiAgICAgICAgICAgIF90aW1lT3V0U2VydmljZSA9IHRpbWVvdXRTZXJ2aWNlO1xyXG4gICAgICAgICAgICBfc2NvcGUgPSBzY29wZTtcclxuXHJcbiAgICAgICAgICAgIF90aW1lT3V0U2VydmljZS5TZWxmKDIwMDApLnRoZW48UmV0eXBlZC5QcmltaXRpdmUuVm9pZCwgUmV0eXBlZC5QcmltaXRpdmUuVm9pZD4oKGdsb2JhbDo6UmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklQcm9taXNlPGdsb2JhbDo6UmV0eXBlZC5QcmltaXRpdmUuVm9pZD4udGhlbkZuPGdsb2JhbDo6UmV0eXBlZC5QcmltaXRpdmUuVm9pZCwgZ2xvYmFsOjpSZXR5cGVkLlByaW1pdGl2ZS5Wb2lkPikoKGFyZykgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJ0aW1lb3V0Li4uXCIpO1xyXG4gICAgICAgICAgICAgICAgX3Njb3BlLkhlaWdodCA9IDEwMDA7XHJcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2FwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBCcmlkZ2UuSHRtbDUuV2luZG93Lkluc3RhbmNlLkFzPElIYXNTY29wZVNweT4oKS5TcHkgPSBfc2NvcGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGludGVyZmFjZSBJSGFzU2NvcGVTcHlcclxuICAgIHtcclxuICAgICAgICBvYmplY3QgU3B5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgSVRvZG9DdHJsU2NvcGUgOiBSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSVNjb3BlXHJcbiAgICB7XHJcbiAgICAgICAgW0ZpZWxkXVxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFtGaWVsZF1cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgfVxyXG59Il0KfQo=
