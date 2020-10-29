using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{

    //[External]
    [IgnoreCast]
    public interface IHasOnBeforeUpdate
    {
        [Name("onbeforeupdate")]
        Func<Vnode, object> OnBeforeUpdate { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnBeforeUpdate<TAttr>
    {
        [Name("onbeforeupdate")]
        Func<Vnode<TAttr>, object> OnBeforeUpdate { get; }
    }

    //[External] 
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnBeforeUpdate<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("onbeforeupdate")]
        Func<Vnode<TState, TAttr>, object> OnBeforeUpdate { get; }
    }
}
