using Bridge;
using Bridge.Html5;
using PragmaticIt.BridgeNet.MithrilBridge;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PragmaticIt.MtihrilTodoMVC
{

    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    [Namespace(false)]
    public class Todo:IMithrilComponent
    {
        public string Title { get; set; }
        public bool Completed { get; set; }
    }

    [Convention(Notation = Notation.CamelCase)]
    [Namespace(false)]
    public class TodoAttrs
    {
        public string Status { get; set; }
    }

    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    [Namespace(false)]
    [IgnoreGeneric]
    public class State:IComponentState<State>
    {
        private readonly List<Todo> _todos=new List<Todo>();
        public State()
        {
           // _todos = new List<Todo>(); //todo: add loading data from localStorage


        }
        public Todo[] Todos { get { return _todos.ToArray(); } }
        public Todo Editing { get; set; }
        public string Filter { get; set; }
        public string Showing { get; set; }
        public int Remaining { get; set; }
        public Todo[] TodosByStatus { get; set; }
        public void Dispatch(string action, string args)
        {
            throw new NotImplementedException();
        }
        public void CreateTodo(string todo)
        {
            _todos.Add(new Todo { Title = todo, Completed = false });
        }
        public void SetStatuses(bool completed)
        {
            _todos.ForEach(t => t.Completed = completed);
        }
        public void SetStatus(Todo todo, bool completed)
        {
            todo.Completed = completed;
        }

        public void Destroy(Todo todo)
        {
            _todos.Remove(todo);
        }

        public void Clear()
        {
            _todos.Clear();
        }

        public void Edit(Todo todo)
        {
            Editing = todo;
        }

        public void Update(string title)
        {
            if (Editing != null)
            {
                var trimmed = title.Trim();
                if (string.IsNullOrWhiteSpace(trimmed))
                {
                    Destroy(Editing);
                }
                else
                {
                    Editing.Title = trimmed;
                }
                Editing = null;
            }
        }
        public void Reset()
        {
            Editing = null;
        }
        public void Computed(Vnode<TodoAttrs> vnode)
        {
            Showing = string.IsNullOrWhiteSpace(vnode.Attrs.Status)
                ? ""
                : vnode.Attrs.Status;

            Remaining = _todos.Count(x => !x.Completed);
            switch (Showing) {
                case "active":
                    TodosByStatus = _todos.Where(x => !x.Completed).ToArray();
                    break;
                case "completed":
                    TodosByStatus = _todos.Where(x => x.Completed).ToArray();
                    break;
                default:
                    TodosByStatus = _todos.ToArray();
                    break;
            }
        }
    }

    [Convention(Notation = Notation.CamelCase)]
    [IgnoreGeneric]
    [IgnoreCast]
    [Namespace(false)]
    //[ObjectLiteral]
    public class Todos// : MithrilComponentBase<State, TodoAttrs>, IHasOnInit<State, TodoAttrs>
    {
        State _state;

        public Func<Vnode<State, TodoAttrs>, object> OnIntit { get { return OnInitHandler; } }
        private object OnInitHandler(Vnode<State, TodoAttrs> vnode)
        {
            _state = vnode.State;
            _state.Computed(vnode);
            return null;
        }

        public Func<Vnode<State, TodoAttrs>, object> OnBeforeUpdate { get { return OnBeforeUpdateHandler; } }

        private object OnBeforeUpdateHandler(Vnode<State, TodoAttrs> vnode)
        {
            _state.Computed(vnode);
            return null;
        }

        public void Add() {
            throw new NotImplementedException();
        }
        public void ToggleAll() {
            _state.SetStatuses(Document.GetElementById<HTMLInputElement>("toggle-all").Checked);
        }
        public void Toggle(Todo todo) {
            _state.SetStatus(todo, !todo.Completed);
        }
        public void Focus(Vnode<State, TodoAttrs> vnode, Todo todo) {
            if (_state.Editing!=null){// && vnode.Dom==Document.ActiveElement) {
                var input = vnode.Dom as HTMLInputElement;
                input.Value = todo.Title;
                input.Focus();
                input.SelectionStart = todo.Title.Length;
                input.SelectionEnd = todo.Title.Length;
            }
        }

        public void Save(Event<HTMLInputElement> e) {
            if (e.Type == "blur") {
                _state.Update(e.CurrentTarget.Value);
            }
        }
        public Func<Vnode<State, TodoAttrs>, object> View { get { return ViewHandler; } }

        internal /*override*/ object ViewHandler(Vnode<State, TodoAttrs> vnode)
        {
            var ui = vnode.State;
            return new[]{
                M.m("header.header",
                    M.m("h1",new{ },"todos"),
                    M.m("input#new-todo[placeholder='What needs to be done?'][autofocus]", new { @onkeypress= ""},"")
                ),
                M.m("section#main",new { style=ui.Todos.Any()?"display:none":""},
                    M.m("input#toggle-all[type='checkbox']",new { @checked=ui.Remaining==0, onclick=""},""),
                    M.m("label[for='toggle-all']", new {onclick= "ui.toggleAll"}, "Mark all as complete",""),
                    M.m("ul#todo-list",new{ },
                        _state.TodosByStatus.Select(todo=>
                            M.m("li",new { @class=(todo.Completed?"completed":"")+" "+(_state.Editing!=null?"editing":"")},
                                M.m(".view",new { },
                                    M.m("input.toggle[type='checkbox']", new{ @checked=todo.Completed, onclick="function(){ui.toggle(todo)}"},""),
                                    M.m("label",new { },todo.Title),
                                    M.m("button.destroy",new{ },"")

                                    )
                                )
                            ).Union(new Vnode[]{
                                M.m("input.edit",new { },"")

                            }).ToArray()
                        )
                    )
                    };
                    
        }
    }
}
