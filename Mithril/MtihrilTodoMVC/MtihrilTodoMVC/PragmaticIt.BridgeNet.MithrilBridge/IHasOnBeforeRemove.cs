using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    //[External]
    [IgnoreCast]
    public interface IHasOnBeforeRemove {
        [Name("onbeforeremove")]
        Func<Vnode, object> OnBeforeRemove { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnBeforeRemove<TAttr>
    {
        [Name("onbeforeremove")]
        Func<Vnode<TAttr>, object> OnBeforeRemove { get; }
    }

    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    public interface IHasOnBeforeRemove<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("onbeforeremove")]
        Func<Vnode<TState, TAttr>, object> OnBeforeRemove { get; }
    }
}
