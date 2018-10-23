using System;


namespace VanillaJs.BridgeConversion
{
    public class Model
    {
        
        private readonly Store _storage;

        public Model(Store storage)
        {
            _storage = storage;
        }

        public void Create(string title, Action<Item[]> callback)
        {
            this._storage.Save(new ItemDTO { Title = title, Completed = false }, callback);
        }
        public void Read(long id, Action<Item[]> callback) {
            _storage.Find(id, callback);
        }
        public void Read(Func<Item, bool> filter, Action<Item[]> callback) {
            //todo: add filtering
            _storage.Find(filter, callback);
        }

        public void Update(long id, ItemDTO data, Action<Item[]> callback)
        {
            _storage.Save(data, callback, id);
        }

        public void Remove(long id, Action<Item[]> callback) {
            _storage.Remove(id, callback);
        }

        public void RemoveAll(Action<Item[]> callback)
        {
            _storage.Drop(callback);
        }

        public class CountOutput
        {
            public int Completed { get; internal set; }
            public int Active { get; internal set; }
            public int Total { get; internal set; }
        }

        public void GetCount(Action<CountOutput> callback) {
            _storage.FindAll((items) => {
                var result = new CountOutput();
                foreach (var todo in items) {
                    if (todo.Completed)
                        result.Completed += 1;
                    else
                        result.Active += 1;
                    result.Total += 1;
                }
                callback(result);
            });
        }

    }
}
