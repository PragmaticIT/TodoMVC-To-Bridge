using System;
using System.Linq;
using Bridge.Html5;


namespace VanillaJs.BridgeConversion
{
    public class View
    {
        private Template template;
        const int ENTER_KEY = 13;
        const int ESCAPE_KEY = 27;
        private readonly HTMLElement _todoList;
        private readonly HTMLElement _todoItemCounter;
        private readonly HTMLElement _clearCompleted;
        private readonly HTMLElement _main;
        private readonly HTMLElement _footer;
        private readonly HTMLElement _toggleAll;
        private readonly HTMLElement _newTodo;

        public View(Template template)
        {
            this.template = template;
            _todoList = Helpers.Qs(".todo-list");
            _todoItemCounter = Helpers.Qs(".todo-count");
            _clearCompleted = Helpers.Qs(".clear-completed");
            _main = Helpers.Qs(".main");
            _footer = Helpers.Qs(".footer");
            _toggleAll = Helpers.Qs(".toggle-all");
            _newTodo = Helpers.Qs(".new-todo");
        }

        public void RemoveItem(long id)
        {
            var elem = Helpers.Qs("[data-id=\"" + id + "\"]");
            if (elem != null)
                _todoList.RemoveChild(elem);
        }

        public void ClearCompletedButton(int completedCount, bool visible)
        {
            _clearCompleted.InnerHTML = template.ClearCompletedButton(completedCount);
            _clearCompleted.Style.Display = visible ? "block" : "none";
        }

        public void SetFilter(int? currentPage)
        {
            Helpers.Qs(".filters .selected").ClassName = "";
            Helpers.Qs(".filters [href=\"#/" + currentPage + "\"]").ClassName = "selected";
        }

        public void ElementComplete(long id, bool completed)
        {
            var listItem = Helpers.Qs("[data-id=\"" + id + "\"]");
            if (listItem == null)
                return;
            listItem.ClassName = completed ? "completed" : "";
            Helpers.Qs("input", listItem).As<HTMLInputElement>().Checked = completed;
        }

        public void EditItem(long id, string title)
        {
            var listItem = Helpers.Qs("[data-id=\"" + id + "\"]");
            if (listItem == null)
                return;
            listItem.ClassName = listItem.ClassName + " editing";

            var input = Document.CreateElement("input");
            input.ClassName = "edit";

            listItem.AppendChild(input);
            input.Focus();
            input.As<HTMLInputElement>().Value = title;
        }

        public void EditItemDone(long id, string title)
        {
            var listItem = Helpers.Qs("[data-id=\"" + id + "\"]");
            if (listItem == null)
                return;

            var input = Helpers.Qs("input.edit", listItem);
            listItem.RemoveChild(input);

            listItem.ClassName = listItem.ClassName.Replace("editing", "");

            Helpers.Qsa("label", listItem).ToList().ForEach(label => label.TextContent = title);
        }

        public void Render(string viewCmd, dynamic parameter)
        {
            switch (viewCmd)
            {
                case "showEntries":
                    _todoList.InnerHTML = template.Show(parameter);
                    break;
                case "removeItem":
                    RemoveItem(parameter.Id);
                    break;
                case "updateElementCount":
                    _todoItemCounter.InnerHTML = template.ItemCounter(parameter.ActiveTodos);
                    break;
                case "clearCompletedButton":
                    ClearCompletedButton(parameter.Completed, parameter.Visible);
                    break;
                case "contentBlockVisibility":
                    _main.Style.Display = parameter.Visible ? "block" : "none";
                    _footer.Style.Display = parameter.Visible ? "block" : "none";
                    break;
                case "toggleAll":
                    _toggleAll.As<HTMLInputElement>().Checked = parameter.Checked;
                    break;
                case "setFilter":
                    SetFilter(parameter.CurrentPage);
                    break;
                case "clearNewTodo":
                    _newTodo.As<HTMLInputElement>().Value = "";
                    break;
                case "elementComplete":
                    ElementComplete(parameter.Id, parameter.Completed);
                    break;
                case "editItem":
                    EditItem(parameter.Id, parameter.Title);
                    break;
                case "editItemDone":
                    EditItemDone(parameter.Id, parameter.Title);
                    break;
            }
        }
        public long ItemId(HTMLElement element)
        {
            var li = Helpers.Parent(element, "li");
            return long.Parse(li.Dataset["id"]);
        }
        public class ItemToggleDTO
        {
            public long Id { get; set; }
            public bool Completed { get; set; }
        }
        public class ItemEditDoneDto
        {
            public long Id { get; set; }
            public string Title { get; set; }
        }
        public void BindItemEditDone(Action<ItemEditDoneDto> handler)
        {
            Helpers.Delegate(_todoList, "li .edit", "blur", (evnt) =>
            {
                var isCanceled = Helpers.Parent(evnt.Target.As<HTMLElement>(), "li")
                                            .Dataset["iscanceled"];
                if (string.IsNullOrWhiteSpace(isCanceled))
                {
                    handler(new ItemEditDoneDto
                    {
                        Id = ItemId(evnt.Target.As<HTMLElement>()),
                        Title = evnt.Target.As<HTMLInputElement>().Value
                    });
                }
            });
            Helpers.Delegate(_todoList, "li .edit", "keypress", (evnt) =>
            {
                if (evnt.As<KeyboardEvent>().KeyCode == ENTER_KEY)
                    evnt.Target.As<HTMLInputElement>().Blur();
            });
        }
        public class ItemEditDTO
        {
            public long Id { get; set; }
        }
        public class ToggleAllDTO
        {
            public bool Checked { get; set; }
        }
        public class ItemRemoveDTO : ItemEditDTO
        {
        }
        public class ItemEditCancelDTO : ItemEditDTO
        {
        }
        public void BindItemEditCancel(Action<ItemEditCancelDTO> handler)
        {
            //Console.WriteLine("BindItemEditCancel");
            Helpers.Delegate(_todoList, "li .edit", "keyup", (evnt) =>
            {
                //Console.WriteLine("BindItemEditCancel");
                if (evnt.As<KeyboardEvent>().KeyCode == ESCAPE_KEY)
                {
                    //Console.WriteLine("BindItemEditCancel-escape");
                    Helpers.Parent(evnt.Target.As<HTMLElement>(), "li").Dataset["iscanceled"] = true.ToString();
                    evnt.Target.As<HTMLInputElement>().Blur();

                    handler(new ItemEditCancelDTO { Id = ItemId(evnt.Target.As<HTMLElement>()) });
                }
            });
        }

        public void Bind<T>(string @event, Action<T> handler)
        {
            switch (@event)
            {
                case "newTodo":
                    Helpers.On(_newTodo, "change", evnt =>
                    {
                        (handler.As<Action<string>>())(_newTodo.As<HTMLInputElement>().Value);
                    });
                    break;
                case "removeCompleted":
                    Helpers.On(_clearCompleted, "click", evnt =>
                    {
                        handler(default(T));
                    });
                    break;
                case "toggleAll":
                    Helpers.On(_toggleAll, "click", (evnt) =>
                    {
                        (handler.As<Action<ToggleAllDTO>>())(new ToggleAllDTO { Checked = evnt.Target.As<HTMLInputElement>().Checked });
                    });
                    break;
                case "itemEdit":
                    Helpers.Delegate(_todoList, "li label", "dblclick", (evnt) =>
                    {
                        (handler.As<Action<ItemEditDTO>>())(new ItemEditDTO { Id = ItemId(evnt.Target.As<HTMLElement>()) });
                    });
                    break;
                case "itemRemove":
                    Helpers.Delegate(_todoList, ".destroy", "click", (evnt) =>
                    {
                        (handler.As<Action<ItemRemoveDTO>>())(new ItemRemoveDTO { Id = ItemId(evnt.Target.As<HTMLElement>()) });
                    });
                    break;
                case "itemToggle":
                    Helpers.Delegate(_todoList, ".toggle", "click", evnt =>
                    {
                        (handler.As<Action<ItemToggleDTO>>())(new ItemToggleDTO
                        {
                            Id = ItemId(evnt.Target.As<HTMLElement>()),
                            Completed = evnt.Target.As<HTMLInputElement>().Checked
                        });
                    });
                    break;
                case "itemEditDone":
                    BindItemEditDone(handler.As<Action<ItemEditDoneDto>>());
                    break;
                case "itemEditCancel":
                    BindItemEditCancel(handler.As<Action<ItemEditCancelDTO>>());
                    break;

            }
        }
    }
}
