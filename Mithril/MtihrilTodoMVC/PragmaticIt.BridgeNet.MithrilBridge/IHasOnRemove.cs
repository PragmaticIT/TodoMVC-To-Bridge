using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    //[External]
    [IgnoreCast]
    public interface IHasOnRemove {
        [Name("onremove")]
        Func<Vnode, object> OnRemove { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnRemove<TAttr>
    {
        [Name("onremove")]
        Func<Vnode<TAttr>, object> OnRemove { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnRemove<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("onremove")]
        Func<Vnode<TState, TAttr>, object> OnRemove { get; }
    }
}
