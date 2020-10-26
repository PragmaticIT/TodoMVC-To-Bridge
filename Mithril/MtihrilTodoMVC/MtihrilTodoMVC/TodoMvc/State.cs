using Bridge;
using Bridge.Html5;
using PragmaticIt.BridgeNet.MithrilBridge;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PragmaticIt.MtihrilTodoMVC.TodoMvc
{

    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    //[Namespace(false)]
    [IgnoreGeneric]
    public class State : IComponentState<State>
    {
        private const string _storageKey = "todos-mithril";
        private readonly List<Todo> _todos;
        public State()
        {
            // _todos = new List<Todo>(); //todo: add loading data from localStorage
            var stored = Window.LocalStorage[_storageKey].Cast<string>();
            if (!Script.IsUndefined(stored) || string.IsNullOrWhiteSpace(stored))
                _todos = new List<Todo>();
            else
                _todos = JSON.Parse<List<Todo>>(stored);
           
        }
        public void DoSave() {
            Window.RequestAnimationFrame(() => { Window.LocalStorage[_storageKey] = JSON.Stringify(_todos); });
        }
        //public void UpdateDataSource(double arg)
        //{
        //    Window.LocalStorage[_storageKey] = JSON.Stringify(_todos);
        //}

        public Todo[] Todos { get { return _todos.ToArray(); } }
        public Todo Editing { get; set; }
        public string Filter { get; set; }
        public string Showing { get; set; }
        public int Remaining { get; set; }
        public Todo[] TodosByStatus { get; set; }
        
        public void CreateTodo(string todo)
        {
            _todos.Add(new Todo { Title = todo, Completed = false });
            DoSave();
        }
        public void SetStatuses(bool completed)
        {
            _todos.ForEach(t => t.Completed = completed);
            DoSave();
        }
        public void SetStatus(Todo todo, bool completed)
        {
            todo.Completed = completed;
            DoSave();
        }

        public void Destroy(Todo todo)
        {
            _todos.Remove(todo);
            DoSave();
        }

        public void Clear()
        {
            _todos.RemoveAll(x => x.Completed);
            DoSave();
        }

        public void Edit(Todo todo)
        {
            Editing = todo;
            DoSave();
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
            DoSave();
        }
        public void Reset()
        {
            Editing = null;
            DoSave();
        }
        public void Computed(Vnode<State, TodoAttrs> vnode)
        {
            Showing = string.IsNullOrWhiteSpace(vnode.Attrs.Status)
                ? ""
                : vnode.Attrs.Status;

            Remaining = _todos.Count(x => !x.Completed);
            switch (Showing)
            {
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
}
