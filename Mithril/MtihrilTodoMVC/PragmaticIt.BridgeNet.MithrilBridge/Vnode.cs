using Bridge;
using Bridge.Html5;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    public class VnodeBase
    {
        public object Tag { get; }
        public string Key { get; }
        public object Children { get; }
        public object Text { get; }
        public HTMLElement Dom { get; }
        public int DomSize { get; }
    }

    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    [IgnoreGeneric]
    public class Vnode<TAttrs> : VnodeBase
    {
        public TAttrs Attrs { get; }
    }
    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    [IgnoreGeneric]
    public class Vnode : Vnode<object> { }


    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreGeneric]
    [IgnoreCast]
    public class Vnode<TState, TAttrs> : Vnode<TAttrs> where TState : IComponentState<TState>
    {
        public TState State { get; }
    }

}
