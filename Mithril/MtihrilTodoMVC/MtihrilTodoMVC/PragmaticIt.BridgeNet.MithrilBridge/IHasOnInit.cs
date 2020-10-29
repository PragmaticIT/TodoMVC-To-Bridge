using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    /// <summary>
    /// <see cref="https://mithril.js.org/archive/v1.1.7/lifecycle-methods.html#oninit"/>
    /// </summary>
    [IgnoreCast]
    public interface IHasOnInit
    {
        [Name("oninit")]
        Func<Vnode, object> OnInit { get; }
    }
    [IgnoreGeneric]
    [IgnoreCast]
    public interface IHasOnInit<TAttr>
    {
        [Name("oninit")]
        Func<Vnode<TAttr>, object> OnInit { get; }
    }
    [IgnoreGeneric]
    [IgnoreCast]
    public interface IHasOnInit<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("oninit")]
        Func<Vnode<TState, TAttr>, object> OnInit { get; }
    }
}
