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
    
    
    
                app.controller("todoCtrl", new Array("$http", "$timeout", "$scope", Bridge.Reflection.getTypeName(TS_AngularJS.BridgeConversion.TodoCtrl)));
            },
            statics: {
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
            statics: {
                fields: {
                    $inject: null
                },
                ctors: {
                    init: function () {
                        this.$inject = System.Array.init(["$http", "$timeout", "$scope"], System.String);
                    }
                }
            },
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUU19Bbmd1bGFySlMuQnJpZGdlQ29udmVyc2lvbi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Z0JBWVlBOzs7O2dCQUtBQSxVQUFVQSwwQkFBbUNBOztnQkFHN0NBLDBCQUEwQkEsSUFBSUEscUNBSXRCQSxBQUFrREEsT0FBaUZBOzs7O2dCQWMzSUEsMkJBQTJCQSxJQUFJQSxxQ0FBaURBLDhCQUFPQTs7OztvREFHMURBO3dCQUU3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQVE0QkE7Ozs7Ozs7Ozs7Z0NBS2hCQSxhQUFtREEsZ0JBQXlEQTs7O29CQUV4SEEsb0JBQWVBO29CQUNmQSx1QkFBa0JBO29CQUNsQkEsY0FBU0E7O29CQUVUQSxnQ0FBZ0ZBLEFBQW1KQSwrQkFBQ0E7d0JBRWhPQTt3QkFDQUE7d0JBQ0FBO3dCQUNBQSxPQUFPQTs7b0JBRVhBLHdEQUFzREEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgQnJpZGdlO1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBUU19Bbmd1bGFySlMuQnJpZGdlQ29udmVyc2lvblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gV3JpdGUgYSBtZXNzYWdlIHRvIHRoZSBDb25zb2xlXHJcbiAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiV2VsY29tZSB0byBCcmlkZ2UuTkVUXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhcHBsaWNhdGlvbiBkZWNsYXJhdGlvblxyXG4gICAgICAgICAgICB2YXIgYXBwID0gYW5ndWxhci5hbmd1bGFyMy5tb2R1bGUoXCJ0b2RvbXZjXCIsIG5ldyBzdHJpbmdbXSB7IH0pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzIG9uZSB3b3JrcyBidXQgaXMgdWdseTpcclxuICAgICAgICAgICAgdmFyIHRvZG9DdHJsQ29uc3RydWN0b3IgPSBuZXcgZXM1LkFycmF5PFVuaW9uPHN0cmluZywgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklDb250cm9sbGVyQ29uc3RydWN0b3I+PihcclxuICAgICAgICAgICAgICAgICAgICBcIiRodHRwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCIkdGltZW91dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiJHNjb3BlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgKFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JQ29udHJvbGxlckNvbnN0cnVjdG9yKShuZXcgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklDb250cm9sbGVyQ29uc3RydWN0b3IuSUNvbnRyb2xsZXJDb25zdHJ1Y3RvckN0b3JGbigob2JqZWN0W10gYXJncykgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVG9kb0N0cmwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnc1swXS5BczxSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSUh0dHBTZXJ2aWNlPigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3NbMV0uQXM8UmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklUaW1lb3V0U2VydmljZT4oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzWzJdLkFzPElUb2RvQ3RybFNjb3BlPigpKSlcclxuICAgICAgICAgICAgKSk7XHJcblxyXG4gICAgICAgICAgICAvLy8vdmFyIHRvZG9DdHJsQ29uc3RydWN0b3IgPSBuZXcgZXM1LkFycmF5PFVuaW9uPHN0cmluZywgSUNvbnRyb2xsZXJDb25zdHJ1Y3Rvcj4+KFxyXG4gICAgICAgICAgICAvLy8vICAgICAgICBcIiRodHRwXCIsXHJcbiAgICAgICAgICAgIC8vLy8gICAgICAgIFwiJHRpbWVvdXRcIixcclxuICAgICAgICAgICAgLy8vLyAgICAgICAgXCIkc2NvcGVcIiwgKElDb250cm9sbGVyQ29uc3RydWN0b3IpVG9kb0N0cmxJbml0aWFsaXplckRlbGVnYXRlKTtcclxuICAgICAgICAgICAgLy9hcHAuY29udHJvbGxlcihcInRvZG9DdHJsXCIsIHRvZG9DdHJsQ29uc3RydWN0b3IpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGFwcC5jb250cm9sbGVyKFwidG9kb0N0cmxcIiwgbmV3IGVzNS5BcnJheTxzdHJpbmc+KFwiJGh0dHBcIiwgXCIkdGltZW91dFwiLCBcIiRzY29wZVwiLCB0eXBlb2YoVG9kb0N0cmwpLk5hbWUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIEluaXRMb2NhdGlvblByb3ZpZGVyKFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JTG9jYXRpb25Qcm92aWRlciBsb2NhdGlvblByb3ZpZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgVG9kb0N0cmwgOiBSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSUNvbnRyb2xsZXJcclxuICAgIHtcclxuICAgICAgICBbTmFtZShcIiRpbmplY3RcIildXHJcbiAgICAgICAgW0lubGluZUNvbnN0XVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nW10gaW5qZWN0ID0gbmV3IHN0cmluZ1tdIHsgXCIkaHR0cFwiLCBcIiR0aW1lb3V0XCIsIFwiJHNjb3BlXCIgfTtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JSHR0cFNlcnZpY2UgX2h0dHBTZXJ2aWNlO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUmV0eXBlZC5hbmd1bGFyLmFuZ3VsYXIyLklUaW1lb3V0U2VydmljZSBfdGltZU91dFNlcnZpY2U7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJVG9kb0N0cmxTY29wZSBfc2NvcGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUb2RvQ3RybChSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSUh0dHBTZXJ2aWNlIGh0dHBTZXJ2aWNlLCBSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSVRpbWVvdXRTZXJ2aWNlIHRpbWVvdXRTZXJ2aWNlLCBJVG9kb0N0cmxTY29wZSBzY29wZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9odHRwU2VydmljZSA9IGh0dHBTZXJ2aWNlO1xyXG4gICAgICAgICAgICBfdGltZU91dFNlcnZpY2UgPSB0aW1lb3V0U2VydmljZTtcclxuICAgICAgICAgICAgX3Njb3BlID0gc2NvcGU7XHJcblxyXG4gICAgICAgICAgICBfdGltZU91dFNlcnZpY2UuU2VsZigyMDAwKS50aGVuPFJldHlwZWQuUHJpbWl0aXZlLlZvaWQsIFJldHlwZWQuUHJpbWl0aXZlLlZvaWQ+KChnbG9iYWw6OlJldHlwZWQuYW5ndWxhci5hbmd1bGFyMi5JUHJvbWlzZTxnbG9iYWw6OlJldHlwZWQuUHJpbWl0aXZlLlZvaWQ+LnRoZW5GbjxnbG9iYWw6OlJldHlwZWQuUHJpbWl0aXZlLlZvaWQsIGdsb2JhbDo6UmV0eXBlZC5QcmltaXRpdmUuVm9pZD4pKChhcmcpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwidGltZW91dC4uLlwiKTtcclxuICAgICAgICAgICAgICAgIF9zY29wZS5IZWlnaHQgPSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgX3Njb3BlLl9hcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgQnJpZGdlLkh0bWw1LldpbmRvdy5JbnN0YW5jZS5BczxJSGFzU2NvcGVTcHk+KCkuU3B5ID0gX3Njb3BlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSUhhc1Njb3BlU3B5XHJcbiAgICB7XHJcbiAgICAgICAgb2JqZWN0IFNweSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgfVxyXG4gICAgW0lnbm9yZUNhc3RdXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgSVRvZG9DdHJsU2NvcGUgOiBSZXR5cGVkLmFuZ3VsYXIuYW5ndWxhcjIuSVNjb3BlXHJcbiAgICB7XHJcbiAgICAgICAgW0ZpZWxkXVxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIFtGaWVsZF1cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgfVxyXG59Il0KfQo=
