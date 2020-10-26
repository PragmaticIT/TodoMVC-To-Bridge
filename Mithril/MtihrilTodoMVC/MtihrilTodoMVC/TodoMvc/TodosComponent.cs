using Bridge;
using Bridge.Html5;
using PragmaticIt.BridgeNet.MithrilBridge;
using System;
using System.Linq;

namespace PragmaticIt.MtihrilTodoMVC.TodoMvc
{
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreGeneric]
    [IgnoreCast]
    //[Namespace(false)]
    //[ObjectLiteral]
    public class TodosComponent :
        IMithrilComponentBase<State, TodoAttrs>,
        IHasOnInit<State, TodoAttrs>,
        IHasOnBeforeUpdate<State, TodoAttrs>
    {
        //public Func<Vnode<State, TodoAttrs>, object> OnIntit { get { return OnInitHandler; } }
        //public Func<Vnode<State, TodoAttrs>, object> OnIntit { get { return vnode => { _state = vnode.State; return null; }; } }

        public Func<Vnode<State, TodoAttrs>, object> OnInit
        {
            get
            {
                return (vnode) =>
                {
                    App.State.Computed(vnode);
                    return null;
                };
            }
        }
        private object OnInitHandler(Vnode<State, TodoAttrs> vnode)
        {
            App.State.Computed(vnode);
            return false;
        }

        public Func<Vnode<State, TodoAttrs>, object> OnBeforeUpdate { get { return OnBeforeUpdateHandler; } }

        public Func<Vnode<State, TodoAttrs>, object> View { get { return ViewHandler; } }


        private object OnBeforeUpdateHandler(Vnode<State, TodoAttrs> vnode)
        {
            App.State.Computed(vnode);
            return false;
        }

        public void Add(KeyboardEvent<HTMLInputElement> e)
        {
            if (e.KeyCode == 13 && !string.IsNullOrWhiteSpace(e.Target.Value))
            {
                App.State.CreateTodo(e.Target.Value);
                e.Target.Value = "";
            }
        }
        public void ToggleAll()
        {
            App.State.SetStatuses(Document.GetElementById<HTMLInputElement>("toggle-all").Checked);
        }
        public void Toggle(Todo todo)
        {
            App.State.SetStatus(todo, !todo.Completed);
        }
        public void Focus(Vnode vnode, Todo todo)
        {
            if (App.State.Editing != null && vnode.Dom != Document.ActiveElement)
            {
                var input = vnode.Dom as HTMLInputElement;
                input.Value = todo.Title;
                input.Focus();
                input.SelectionStart = todo.Title.Length;
                input.SelectionEnd = todo.Title.Length;
            }
        }

        public void Save(Event<HTMLInputElement> e)
        {
            var kbdEvt = e.As<KeyboardEvent>();

            if ((kbdEvt != null && kbdEvt.KeyCode == 13) || e.Type == "blur")
            {
                App.State.Update(e.CurrentTarget.Value);
            }

            if (kbdEvt != null && kbdEvt.KeyCode == 27)
            {
                App.State.Reset();
            }
        }

        public object ViewHandler(Vnode<State, TodoAttrs> vnode)
        {
            var ui = App.State;
            var handler = new HandlerBuilder().Add<KeyboardEvent<HTMLInputElement>>("onkeypress", Add).Build(); //new ObjectLiteral(new { ala = "makota" });
            var h2 = Script.ToObjectLiteral<object>(handler);
            //Script.FromTemp<Action<KeyboardEvent<HTMLInputElement>>>("ddd",Add);
            var header = M.m("header.header",
                    M.m("h1", new { }, "todos"),
                    M.m("input#new-todo[placeholder='What needs to be done?'][autofocus]", handler, "")
                    );
            var content = M.m("section#main",
                        new HandlerBuilder().Add("style", () => { return !ui.Todos.Any() ? "display:none" : ""; }).Build(),
                            M.m("input#toggle-all[type='checkbox']", new HandlerBuilder()
                                    .Add("checked", () => { return App.State.Remaining != 0; })
                                    .Add("onclick", () => ToggleAll()).Build(), null),
                            M.m("label[for='toggle-all']", new HandlerBuilder()
                                    .Add("onclick", ToggleAll).Build(), "Mark all as complete", ""),
                            M.m("ul#todo-list", null,
                            App.State.TodosByStatus.Select(todo =>
                            {
                                return M.m("li", new HandlerBuilder()
                                            .Add("className", string.Format("{0} {1}",
                                                                    (todo.Completed ? "completed" : ""),
                                                                    (todo == App.State.Editing ? "editing" : ""))).Build(),
                                        M.m(".view", null,
                                            M.m("input.toggle[type='checkbox']", new HandlerBuilder()
                                                .Add("checked", () => todo.Completed)
                                                .Add("onclick", () => Toggle(todo)).Build(), null),
                                            M.m("label", new HandlerBuilder()
                                                .Add("ondblclick", () => App.State.Edit(todo)).Build(), todo.Title),
                                            M.m("button.destroy", new HandlerBuilder()
                                                .Add("onclick", () => App.State.Destroy(todo)).Build(), null)),
                                        M.m("input.edit", new HandlerBuilder()
                                            .Add<Vnode>("onupdate", (inputVnode) => { Focus(inputVnode, todo); })
                                            .Add<Event<HTMLInputElement>>("onkeyup", Save)
                                            .Add<Event<HTMLInputElement>>("onblur", Save).Build(), null)
                                            );
                            }).ToArray()
                            )

                    );
            
            var footer = M.m("footer#footer", null, 
                            M.m("span#todo-count", null,
                                M.m("strong", null, App.State.Remaining),
                                (App.State.Remaining == 1 ? " item left" : " items left")),
                            M.m("ul#filters", null,
                                M.m("li", M.m(M.Route.Link(), new { href = "/", @class = (App.State.Showing == "" ? "selected" : "") }, "All")),
                                M.m("li", M.m(M.Route.Link(), new { href = "/active", @class = (App.State.Showing == "active" ? "selected" : "") }, "Active")),
                                M.m("li", M.m(M.Route.Link(), new { href = "/completed", @class = (App.State.Showing == "completed" ? "selected" : "") }, "Completed"))
                            ),
                            M.m("button#clear-completed", new HandlerBuilder().Add("onclick", () => App.State.Clear()).Build(), "Clear completed")
                        );
            return new object[] {
                header,
                content,
                App.State.Todos.Any()?footer:null
            };
        }
    }

    public class HandlerBuilder
    {
        //private readonly Dictionary<string, object> _handlers;
        private dynamic _handlers = new object();
        public HandlerBuilder Add<T1, T2>(string name, Action<T1, T2> handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add<T>(string name, Action<T> handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add(string name, Action handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add<T>(string name, Func<T> handler)
        {
            _handlers[name] = handler;
            return this;
        }
        public HandlerBuilder Add(string name, object value)
        {
            _handlers[name] = value;
            return this;
        }
        public object Build()
        {
            return _handlers;
            //return Script.ToPlainObject<object>(_handlers);
        }
    }


}
