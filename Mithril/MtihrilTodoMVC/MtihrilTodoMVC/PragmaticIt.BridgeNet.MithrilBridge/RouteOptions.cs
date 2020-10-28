﻿using Bridge;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    [External]
    [ObjectLiteral]
    [Convention(Notation = Notation.CamelCase)]
    public class RouteOptions
    {
        [Field]
        public bool Replace { get; set; }
        [Field]
        public object State { get; set; }
        [Field]
        public string Title { get; set; }
    }
    //public class VnodeStateBase<TAttrs>
    //{
    //    public TAttrs Attrs { get; }
    //}
    //[External]
    //[Convention(Notation = Notation.CamelCase)]
    //public class Vnode<TState, TAttrs> where TState : VnodeStateBase<TAttrs>
    //{
    //    public TAttrs Attrs { get; }
    //}
    //public class Vnode : Vnode<object> { }



    //[Convention(Notation = Notation.CamelCase)]
    //[IgnoreCast]
    //public interface IMithrilComponent<TAttrs>
    //{
    //    //public delegate object LifecycleMethod(Vnode vnode);
    //    Func<Vnode<TAttrs>, object> View { get; }
    //}

    //public abstract class MithrilComponent<TAttrs> : IMithrilComponent<TAttrs>
    //{
    //    public Func<Vnode<TAttrs>, object> View { get { return ViewHandler; } }

    //    public abstract object ViewHandler(Vnode<TAttrs> attrs);
    //}

    //[Convention(Notation = Notation.CamelCase)]
    //[IgnoreCast]

    //public interface IMithrilComponent
    //{
    //    Func<object> View { get; }
    //}

}
