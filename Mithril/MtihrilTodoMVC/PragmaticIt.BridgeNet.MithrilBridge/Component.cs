using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{

    //  [External]
    [IgnoreCast]
    [Convention(Notation = Notation.CamelCase)]
    public abstract class MithrilComponentBase
    {
        Func<Vnode, object> View { get { return ViewHandler; } }
        public abstract object ViewHandler(Vnode vnode);
    }
    // [External]
    [IgnoreGeneric]
    // [IgnoreCast]
    [Convention(Notation = Notation.CamelCase)]
    public abstract class MithrilComponentBase<TAttr>
    {
        public Func<Vnode<TAttr>, object> View { get { return ViewHandler; } }
        public abstract object ViewHandler(Vnode<TAttr> vnode);
    }
    // [External]
    [IgnoreGeneric]
    //[IgnoreCast]
    [Convention(Notation = Notation.CamelCase)]
    public abstract class MithrilComponentBase<TState, TAttr> : IMithrilComponentBase<TState, TAttr>, IComponentState<TState>
        where TState : IComponentState<TState>
    {
        public Func<Vnode<TState, TAttr>, object> View { get { return ViewHandler; } }

        public abstract object ViewHandler(Vnode<TState, TAttr> arg);
    }

    public interface IMithrilComponentBase<TState, TAttr> : IComponentState<TState>
        where TState : IComponentState<TState>
    {
        Func<Vnode<TState, TAttr>, object> View { get; }
    }
}
