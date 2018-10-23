using System;
using System.Linq;
using Bridge.Html5;
using Newtonsoft.Json;

namespace VanillaJs.BridgeConversion
{
    public class Store
    {
        private readonly Action<Item[]> _callback = null;
        private readonly string _dbName;

        public Store(string name, Action<Item[]> callback = null)
        {
            _dbName = name;
            _callback = callback;

            var data = Window.LocalStorage.GetItem(_dbName).As<string>();
            if (string.IsNullOrEmpty(data))
            {
                var todos = new Item[0];
                Window.LocalStorage.SetItem(name, JSON.Stringify(todos));
            }
            if (callback != null)
                callback(JsonConvert.DeserializeObject<Item[]>(Window.LocalStorage.GetItem(_dbName).As<string>()));
            //JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>()));
        }

        internal void Find(long id, Action<Item[]> callback)
        {
            if (callback == null)
                return;

            //var todos = JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());
            Item[] todos = JsonConvert.DeserializeObject<Item[]>(Window.LocalStorage.GetItem(_dbName).As<string>()); // JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());

            callback(todos.Where(x => id == x.Id).ToArray());
        }
        public void Find(Func<Item, bool> filter, Action<Item[]> callback)
        {
            if (callback == null)
                return;

//            var todos = JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());
            Item[] todos = JsonConvert.DeserializeObject<Item[]>(Window.LocalStorage.GetItem(_dbName).As<string>()); // JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());

            callback(todos.Where(filter).ToArray());
        }
        public void Find(Item query, Action<Item[]> callback)
        {

            throw new NotImplementedException();

        }

        public void FindAll(Action<Item[]> callback = null)
        {
            if (callback != null)
            {
                //callback(JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(this._dbName).As<string>()));
                callback(JsonConvert.DeserializeObject<Item[]>(Window.LocalStorage.GetItem(_dbName).As<string>()));
            }
        }
        public void Save(ItemDTO updateData, Action<Item[]> callback, long? id = null)
        {
//            Item[] todos = JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());
            Item[] todos = JsonConvert.DeserializeObject<Item[]>(Window.LocalStorage.GetItem(_dbName).As<string>()); // JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());

            if (callback == null)
                return;

            if (id.HasValue)
            {
                var item = todos.Where(x => id.Value == x.Id).First();
                if (!string.IsNullOrWhiteSpace(updateData.Title))
                    item.Title = updateData.Title;
                if (updateData.Completed.HasValue)
                    item.Completed = updateData.Completed.Value;

                Window.LocalStorage.SetItem(_dbName, JSON.Stringify(todos));
                callback(todos);
            }
            else
            {
                var item = new Item
                {
                    Id = DateTime.Now.Ticks,
                    Title = updateData.Title,
                    Completed = false
                };
                todos.Push(item);
                Window.LocalStorage.SetItem(_dbName, JSON.Stringify(todos));
                callback(new[] { item });
            }
        }
        public void Remove(long id, Action<Item[]> callback)
        {
            Item[] todos = JsonConvert.DeserializeObject<Item[]>(Window.LocalStorage.GetItem(_dbName).As<string>()); // JSON.ParseAsArray<Item>(Window.LocalStorage.GetItem(_dbName).As<string>());

            for (int i = 0; i < todos.Length; i++) {
                var itemId = todos[i].Id;
                if (itemId.Equals(id)) {
                    todos.Splice(i, 1);
                    break;
                }
            }

            //todos = todos.Where(x => id != x.Id).ToArray();
            Window.LocalStorage.SetItem(_dbName, JSON.Stringify(todos));

            if (callback != null)
                callback(todos);

        }
        public void Drop(Action<Item[]> callback)
        {
            Item[] todos = new Item[0];
            Window.LocalStorage.SetItem(_dbName, JSON.Stringify(todos));

            if (callback != null)
                callback(todos);

        }
    }
}
