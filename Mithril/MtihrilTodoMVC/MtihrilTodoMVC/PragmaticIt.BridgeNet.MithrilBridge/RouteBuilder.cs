using Bridge;
using System;
using System.Collections.Generic;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    [Convention(Notation = Notation.CamelCase)]
    [ObjectLiteral]
    public class RouteBuilder
    {
        private readonly Dictionary<string, object> _routes = new Dictionary<string, object>();
        public class RouteComponent
        {
            private readonly RouteBuilder _builder;
            private readonly string _url;
            public RouteComponent(RouteBuilder builder, string url)
            {
                _builder = builder;
                _url = url;
            }
            public RouteBuilder Component<T>() where T : IMithrilComponent
            {
                return _builder.AddRoute(_url, typeof(T));
            }
        }
        public RouteComponent Add(string url)
        {
            return new RouteComponent(this, url);
        }
        private RouteBuilder AddRoute(string url, Type t)
        {
            _routes.Add(url, t);
            return this;
        }

        public object Build()
        {
            //return _routes;
            dynamic result = new object();
            foreach (var route in _routes)
                result[route.Key] = route.Value;
            return result;
        }
    }
}
