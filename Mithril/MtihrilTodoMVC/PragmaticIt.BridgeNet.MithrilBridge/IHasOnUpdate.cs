using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    //[External]
    [IgnoreCast]
    public interface IHasOnUpdate
    {
        [Name("onupdate")]
        Func<Vnode, object> OnUpdate { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnUpdate<TAttr>
    {
        [Name("onupdate")]
        Func<Vnode<TAttr>, object> OnUpdate { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnUpdate<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("onupdate")]
        Func<Vnode<TState, TAttr>, object> OnUpdate { get; }
    }
}
