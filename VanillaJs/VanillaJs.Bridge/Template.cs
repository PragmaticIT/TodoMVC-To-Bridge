using System;
using Bridge.Html5;
using System.Collections.Generic;
using System.Linq;

namespace VanillaJs.BridgeConversion
{
    public class Template
    {
        private static readonly Dictionary<char, string> HtmlEscapes = new Dictionary<char, string>{
            { '&',"&amp;"},
            { '<',"&lt;"},
            { '>',"&gt;"},
            { '"',"&quot"},
            { '\'',"&#x27"},
            { '`',"&#x60"}
        };

        private string EscapeHtmlChar(char c) {
            return HtmlEscapes[c];
        }
        private string Escape(string input) {
            return String.Join("", input.Select(c =>
            {
                string result;
                if (HtmlEscapes.TryGetValue(c, out result))
                    return result;
                return c.ToString();
            }));
        }
        private const string DefaultTemplate
                    = "<li data-id=\"{{id}}\" class=\"{{completed}}\">"
        + "<div class=\"view\">"
        + "<input class=\"toggle\" type=\"checkbox\" {{checked}}>"
        + "<label>{{title}}</label>"
        + "<button class=\"destroy\"></button>"
        + "</div>"
        + "</li>";
        public string Show(IEnumerable<Item> data) {
            return string.Join("", data.Select(item => {
                var template = DefaultTemplate;
                string completed = item.Completed ? "completed" : "",
                @checked = item.Completed ? "checked" : "";

                var result=template
                .Replace("{{id}}", item.Id.ToString())
                .Replace("{{title}}", Escape(item.Title))
                .Replace("{{completed}}", completed)
                .Replace("{{checked}}", @checked);

                return result;
            }));
        }
        internal string ClearCompletedButton(int completedCount)
        {
            return (completedCount > 0)
                ? "Clear completed"
                : "";
        }

        internal string ItemCounter(int activeTodos)
        {
            return
                "<strong>"
                + activeTodos
                + "</strong> item"
                + (activeTodos == 1 ? "" : "s")
                + " left";
        }
    }
}
