using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        [Name("route")]
        public static void Routes(Element element, string defaultRoute, object routes)
        {
            return;
        }

        public static MRoute Route
        {
            get { return default(MRoute); }
        }

        //public static MithrilPromise Request(string url, RequestOptions options)
        //{
        //    return default(MithrilPromise);
        //}
        public static MithrilPromise Request(string url, object options)
        {
            return default(MithrilPromise);
        }
        //public static MithrilPromise Request(RequestOptions options)
        //{
        //    return default(MithrilPromise);
        //}
        public static MithrilPromise Request(object options)
        {
            return default(MithrilPromise);
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

        [Template("m({T},{attrs},{nodes})")]
        public static Vnode m<T>(object attrs, params object[] nodes) { return default(Vnode); }

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

    [Convention(Notation = Notation.CamelCase)]
    public class RequestOptionsBuilder {
        private dynamic _options = new object();
        public RequestOptionsBuilder WithMethod(string method) { _options["method"] = method; return this; }
        public RequestOptionsBuilder WithUrl(string url) { _options["url"] = url; return this; }
        public RequestOptionsBuilder WithParameters(object parameters) { _options ["params"] = parameters; return this; }
        public RequestOptionsBuilder WithBody(object body) { _options ["body"] = body; return this; }
        public RequestOptionsBuilder WithAsync(bool async) { _options ["async"] = async; return this; }
        public RequestOptionsBuilder WithUser(string user) { _options ["user"] = user; return this; }
        public RequestOptionsBuilder WithPassword (string password){ _options ["password"] = password; return this; }
        public RequestOptionsBuilder WithCredentials(bool withCredentials) { _options ["withCredentials"] = withCredentials; return this; }
        public RequestOptionsBuilder WithTimeOut(int value) { _options ["timeout"] = value; return this; }
        public RequestOptionsBuilder WithResponseType(string responseType) { _options ["responseType"] = responseType; return this; }
        public RequestOptionsBuilder WithConfigFunction(Func<XMLHttpRequest, XMLHttpRequest> func) { _options ["config"] = func; return this; }
        public RequestOptionsBuilder WithHeaders(object headers) { _options ["headers"] = headers; return this; }

        public RequestOptionsBuilder WithBackground(bool background) { _options ["background"] = background; return this; }

        public object Build()
        {
            return _options;
            //return Script.ToPlainObject<object>(_options);
        }
    }

    //[Convention(Notation = Notation.CamelCase)]
    //[ObjectLiteral]
    //public class RequestOptions
    //{
    //    public string Method { get; set; }
    //    public string Url { get; set; }
    //    [Name("params")]
    //    public object Parameters { get; set; }
    //    public object Body { get; set; }
    //    public bool Async { get; set; }
    //    public string User { get; set; }
    //    public string Password { get; set; }
    //    public bool WithCredentials { get; set; }
    //    public int TimeOut { get; set; }
    //    public string ResponseType { get; set; }
    //    public Func<XMLHttpRequest, XMLHttpRequest> Config { get; set; }
    //    public object Headers { get; set; }

    //    public bool Background { get; set; }

    //}
    //[Convention(Notation = Notation.CamelCase)]
    //[ObjectLiteral]
    //public class RequestOptions<T>:RequestOptions
    //{
    //    [Name("type")]
    //    public Func<object, object> ConstructorType { get; set; }
    //    public Func<T, string> Serialize { get; set; }
    //    public Func<string, T> Deserialize { get; set; }
    //    public Func<T, XMLHttpRequest, RequestOptions> Extract { get; set; }
    //}
}
