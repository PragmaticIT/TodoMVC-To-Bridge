using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace VanillaJs.BridgeConversion
{
    public static class Helpers
    {
        public static HTMLElement Qs(string selector)
        {
            return Document.QuerySelector(selector).As<HTMLElement>();
        }
        public static HTMLElement Qs(string selector, HTMLElement scope)
        {
            return scope.QuerySelector(selector).As<HTMLElement>();
        }

        public static NodeList Qsa(string selector)
        {
            return Document.QuerySelectorAll(selector);
        }
        public static NodeList Qsa(string selector, HTMLElement scope)
        {
            return scope.QuerySelectorAll(selector);
        }

        public static void On(HTMLElement target, string type, Action<Event> callback, bool? useCapture=null)
        {
            if (useCapture.HasValue)
                target.AddEventListener(type, callback, useCapture.Value);
            else
                target.AddEventListener(type, callback);
        }

        public static void Delegate(HTMLElement target, string selector, string type, Action<Event> handler) {
            var useCapture = type == "blur" || type == "focus";
            On(target, type, (evnt) => {
                var targetElement = evnt.Target;
                var potentialElements = Qsa(selector, target);
                var hasMatch = potentialElements.Contains(targetElement);

                if (hasMatch)
                    handler.Call(targetElement, evnt);//todo:check order of parameters
            }, useCapture);
        }
        public static HTMLElement Parent(HTMLElement element, string tagName) {
            if (element.ParentNode == null)
                return null;

            if (element.ParentNode.As<HTMLElement>().TagName.ToLowerCase() == tagName.ToLowerCase())
                return element.ParentNode.As<HTMLElement>();

            return Parent(element.ParentNode.As<HTMLElement>(), tagName);
        }
    }
}
