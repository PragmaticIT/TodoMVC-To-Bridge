using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    public class HandlerBuilder
    {
        //private readonly Dictionary<string, object> _handlers;
        private dynamic _handlers = new object();
        public HandlerBuilder Add<T1, T2>(string name, Action<T1, T2> handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add<T>(string name, Action<T> handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add(string name, Action handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add<T>(string name, Func<T> handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add(string name, object value)
        {
            _handlers[name] = value;
            return this;
        }
        public object Build()
        {
            return _handlers;
            //return Script.ToPlainObject<object>(_handlers);
        }
    }


}
