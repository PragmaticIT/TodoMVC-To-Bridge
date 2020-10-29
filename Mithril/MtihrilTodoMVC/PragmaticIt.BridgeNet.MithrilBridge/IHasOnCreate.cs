using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    //[External]
    [IgnoreCast]
    public interface IHasOnCreate
    {
        [Name("oncreate")]
        Func<Vnode, object> OnCreate { get; }
    }
    //[External]
    [IgnoreGeneric]
    [IgnoreCast]
    public interface IHasOnCreate<TAttr>
    {
        [Name("oncreate")]
        Func<Vnode<TAttr>, object> OnCreate { get; }
    }
    //[External]
    [IgnoreGeneric]
    [IgnoreCast]
    public interface IHasOnCreate<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("oncreate")]
        Func<Vnode<TState, TAttr>, object> OnCreate { get; }
    }
}
