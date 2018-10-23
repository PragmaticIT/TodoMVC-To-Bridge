using Bridge.Html5;
using System.Linq;

namespace VanillaJs.BridgeConversion
{
    public class Controller
    {
        private Model model;
        private View view;
        private string _activeRoute;
        private string _lastActiveRoute;

        public Controller(Model model, View view)
        {
            this.model = model;
            this.view = view;

            view.Bind("newTodo", (string title) => AddItem(title));
            view.Bind("itemEdit", (Item item) => EditItem(item.Id));
            view.Bind("itemEditDone", (Item item) => EditItemSave(item.Id, item.Title));
            view.Bind("itemEditCancel", (Item item) => EditItemCancel(item.Id));
            view.Bind("itemRemove", (Item item) => RemoveItem(item.Id));
            view.Bind("itemToggle", (Item item) => ToggleComplete(item.Id, item.Completed));
            view.Bind("removeCompleted", (bool @false) => { RemoveCompletedItems(); });
            view.Bind("toggleAll", (bool completed) => ToggleAll(completed));

        }

        internal void SetView(string locationHash)
        {
            var route = string.IsNullOrWhiteSpace(locationHash) ? "" : locationHash.Split('/')[1];
            var page = string.IsNullOrWhiteSpace(route) ? "" : route;
            UpdateFilterState(page);
        }
        internal void ShowAll()
        {
            model.Read(i => { return true; }, data =>
            {
                view.Render("showEntries", data);
            });
        }

        internal void ShowActive()
        {
            model.Read(i => { return !i.Completed; }, data =>
            {
                view.Render("showEntries", data);
            });
        }
        internal void ShowCompleted()
        {
            model.Read(i => { return i.Completed; }, data =>
            {
                view.Render("showEntries", data);
            });
        }
        internal void AddItem(string title)
        {
            var trimmed = title.Trim();
            if (string.IsNullOrWhiteSpace(trimmed))
                return;
            model.Create(trimmed, data =>
            {
                view.Render("clearNewTodo", "");
                Filter(true);
            });
        }
        internal void EditItem(long id)
        {
            model.Read(id, items => view.Render("editItem", items.FirstOrDefault()));
        }
        internal void EditItemSave(long id, string title)
        {
            var trimmed = title.Trim();
            if (string.IsNullOrWhiteSpace(trimmed))
            {
                RemoveItem(id);
            }
            else
            {
                model.Update(id, new ItemDTO { Title = title }, evnt =>
                {
                    view.Render("editItemDone", new { Id = id, Title = title });
                });
            }
        }
        internal void EditItemCancel(long id)
        {
            model.Read(id, data =>
            {
                view.Render("editItemDone", data[0]);
            });
        }
        internal void RemoveItem(long id)
        {
            model.Remove(id, data =>
            {
                view.Render("removeItem", new { Id = id });
            });
            Filter();
        }
        public void RemoveCompletedItems()
        {
            model.Read(i => { return i.Completed; }, data =>
             {
                 foreach (var item in data)
                 {
                     RemoveItem(item.Id);
                 }
             });
            Filter();
        }

        public void ToggleComplete(long id, bool completed, bool silent = false)
        {
            model.Update(id, new ItemDTO { Completed = completed }, data =>
            {
                view.Render("elementComplete", new { Id = id, Completed = completed });
            });
            if (!silent)
                Filter();
        }

        public void ToggleAll(bool completed)
        {
            model.Read(item => { return item.Completed == !completed; }, data =>
             {
                 foreach (var item in data)
                     ToggleComplete(item.Id, completed, true);

             });
            Filter();
        }
        public void UpdateCount()
        {
            model.GetCount(todos =>
            {
                view.Render("updateElementCount", new { ActiveTodos = todos.Active });
                view.Render("clearCompletedButton", new { todos.Completed, Visible = todos.Completed > 0 });
                view.Render("toggleAll", new { Checked = (todos.Completed == todos.Total) });
                view.Render("contentBlockVisibility", new { Visible = todos.Total > 0 });
            });
        }
        private void Filter(bool force = false)
        {
            var activeRoute = _activeRoute.ToUpper()[0] + _activeRoute.Substr(1);
            UpdateCount();

            if (force || _lastActiveRoute != "All" || _lastActiveRoute != activeRoute)
            {
                switch (activeRoute)
                {
                    case "All":
                        ShowAll();
                        break;
                    case "Active":
                        ShowActive();
                        break;
                    case "Completed":
                        ShowCompleted();
                        break;
                }
            }
            _lastActiveRoute = activeRoute;
        }
        public void UpdateFilterState(string currentPage)
        {
            _activeRoute = currentPage;
            if (currentPage == "")
                _activeRoute = "All";
            Filter();
            view.Render("setFilter", new { CurrentPage = currentPage });
        }
    }
}
