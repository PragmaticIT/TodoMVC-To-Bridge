using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    /// <summary>
    /// Marker interface for component state. Component need to implement 
    /// the state properties. This is shared to Vnode. Please inherit for component implementation 
    /// </summary>
    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    [Convention(Notation = Notation.CamelCase)]
    public interface IMithrilComponent { }

    // [External]
    [IgnoreCast]
    [IgnoreGeneric]
    [Convention(Notation = Notation.CamelCase)]
    public interface IComponentState<TState> : IMithrilComponent where TState : IComponentState<TState>
    {
    }
    #region Lifecycle methods 
    /// <summary>
    /// <see cref="https://mithril.js.org/archive/v1.1.7/lifecycle-methods.html#oninit"/>
    /// </summary>
   // [External]
    [IgnoreCast]
    public interface IHasOnInit
    {
        [Name("oninit")]
        Func<Vnode, object> OnInit { get; }
    }
    // [External]
    [IgnoreGeneric]
    [IgnoreCast]
    public interface IHasOnInit<TAttr>
    {
        [Name("oninit")]
        Func<Vnode<TAttr>, object> OnInit { get; }
    }
    [External]
    [IgnoreGeneric]
    [IgnoreCast]
    public interface IHasOnInit<TState, TAttr> where TState : IComponentState<TState>
    {
        [Name("oninit")]
        Func<Vnode<TState, TAttr>, object> OnInit { get; }
    }
    [External]
    [IgnoreCast]
    public interface IHasOnCreate { }
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
    [External]
    [IgnoreCast]
    public interface IHasOnUpdate { }
    [External]
    [IgnoreCast]
    public interface IHasOnBeforeRemove { }
    [External]
    [IgnoreCast]
    public interface IHasOnRemove { }
    #endregion
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

        internal abstract object ViewHandler(Vnode<TState, TAttr> arg);
    }

    public interface IMithrilComponentBase<TState, TAttr> : IComponentState<TState>
        where TState : IComponentState<TState>
    {
        Func<Vnode<TState, TAttr>, object> View { get; }
    }
}
