using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    [External]
    [Namespace(false)]
    //[Name("m")]
    [Convention(Notation = Notation.CamelCase)]
    public static class M
    {
        public static void Render(Element element, string str)
        {
            return;
        }
        public static void Render(Element element, Vnode node)
        {
            return;
        }

        public static void Render(Element element, IEnumerable<Vnode> nodes)
        {
            return;
        }
        public static void Mount(Element element, IMithrilComponent component)
        {
            return;
        }
        /// <summary>
        /// Turns a string of the form ?a=1&b=2 to an object
        /// <see cref="https://mithril.js.org/archive/v1.1.7/parseQueryString.html"/>
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static object ParseQueryString(string input)
        {
            return default(object);
        }
        /// <summary>
        /// Turns a string of the form ?a=1&b=2 to an object. Added Generic declaration for .NET/C#
        /// <see cref="https://mithril.js.org/archive/v1.1.7/parseQueryString.html"/>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="input"></param>
        /// <returns></returns>
        public static T ParseQueryString<T>(string input)
        {
            return default(T);
        }
        public static string BuildQueryString(object input)
        {
            return default(string);
        }
        public static void Redraw()
        {
            return;
        }
        public static Vnode Trust(string html)
        {
            return default(Vnode);
        }
        public static Func<T> WithAttr<T>(string attrName, Func<T> callback)
        {
            return default(Func<T>);
        }
        public static Func<T> WithAttr<T, P>(string attrName, Func<T> callback, P thisObject)
        {
            return default(Func<T>);
        }
        //todo:move to helper method
        //public static void Route(Element element, string defaultRoute, Dictionary<string, object> routes)
        //{
        //    return;
        //}

        public static void Route(Element element, string defaultRoute, object routes)
        {
            return;
        }

        public static Vnode Fragment(object attrs, params Vnode[] nodes)
        {
            return default(Vnode);
        }
        public static Vnode Fragment(object attrs, params object[] nodes)
        {
            return default(Vnode);
        }
        public static Vnode Fragment(object attrs, object nodes)
        {
            return default(Vnode);
        }
        [Template("m({selector})")]
        public static Vnode m(string selector) { return default(Vnode); }

        [Template("m({selector},{nodes})")]
        public static Vnode m(string selector, params Vnode[] nodes) { return default(Vnode); }
        // public static Vnode m(string selector, params object[] nodes) { return default(Vnode); }

        [Template("m({selector},{attrs},{nodes})")]
        public static Vnode m(string selector, object attrs, params Vnode[] nodes) { return default(Vnode); }

        [Template("m({selector},{attrs},{nodes})")]
        public static Vnode m(string selector, object attrs, params object[] nodes) { return default(Vnode); }

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
