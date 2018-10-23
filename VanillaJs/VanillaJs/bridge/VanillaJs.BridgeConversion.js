/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.4.0
 */
Bridge.assembly("VanillaJs.BridgeConversion", function ($asm, globals) {
    "use strict";

    Bridge.define("VanillaJs.BridgeConversion.App", {
        main: function Main () {
            VanillaJs.BridgeConversion.Helpers.On(window, "load", function (evnt) {
                VanillaJs.BridgeConversion.App.SetView();
            });
            VanillaJs.BridgeConversion.Helpers.On(window, "hashchange", function (evnt) {
                VanillaJs.BridgeConversion.App.SetView();
            });
        },
        statics: {
            fields: {
                todo: null
            },
            ctors: {
                init: function () {
                    this.todo = new VanillaJs.BridgeConversion.App.Todo("todos-vanillajs-bridge");
                }
            },
            methods: {
                SetView: function () {
                    VanillaJs.BridgeConversion.App.todo.Controller.SetView(document.location.hash);
                }
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.App.Todo", {
        $kind: "nested class",
        fields: {
            Storage: null,
            Model: null,
            Template: null,
            View: null,
            Controller: null
        },
        ctors: {
            ctor: function (name) {
                this.$initialize();
                this.Storage = new VanillaJs.BridgeConversion.Store(name);
                this.Model = new VanillaJs.BridgeConversion.Model(this.Storage);
                this.Template = new VanillaJs.BridgeConversion.Template();
                this.View = new VanillaJs.BridgeConversion.View(this.Template);
                this.Controller = new VanillaJs.BridgeConversion.Controller(this.Model, this.View);
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Controller", {
        fields: {
            model: null,
            view: null,
            _activeRoute: null,
            _lastActiveRoute: null
        },
        ctors: {
            ctor: function (model, view) {
                this.$initialize();
                this.model = model;
                this.view = view;

                view.Bind(System.String, "newTodo", Bridge.fn.bind(this, function (title) {
                    this.AddItem(title);
                }));
                view.Bind(VanillaJs.BridgeConversion.Item, "itemEdit", Bridge.fn.bind(this, function (item) {
                    this.EditItem(item.Id);
                }));
                view.Bind(VanillaJs.BridgeConversion.Item, "itemEditDone", Bridge.fn.bind(this, function (item) {
                    this.EditItemSave(item.Id, item.Title);
                }));
                view.Bind(VanillaJs.BridgeConversion.Item, "itemEditCancel", Bridge.fn.bind(this, function (item) {
                    this.EditItemCancel(item.Id);
                }));
                view.Bind(VanillaJs.BridgeConversion.Item, "itemRemove", Bridge.fn.bind(this, function (item) {
                    this.RemoveItem(item.Id);
                }));
                view.Bind(VanillaJs.BridgeConversion.Item, "itemToggle", Bridge.fn.bind(this, function (item) {
                    this.ToggleComplete(item.Id, item.Completed);
                }));
                view.Bind(System.Boolean, "removeCompleted", Bridge.fn.bind(this, function ($false) {
                    this.RemoveCompletedItems();
                }));
                view.Bind(System.Boolean, "toggleAll", Bridge.fn.bind(this, function (completed) {
                    this.ToggleAll(completed);
                }));

            }
        },
        methods: {
            SetView: function (locationHash) {
                var $t;
                var route = System.String.isNullOrWhiteSpace(locationHash) ? "" : ($t = System.String.split(locationHash, [47].map(function (i) {{ return String.fromCharCode(i); }})))[System.Array.index(1, $t)];
                var page = System.String.isNullOrWhiteSpace(route) ? "" : route;
                this.UpdateFilterState(page);
            },
            ShowAll: function () {
                this.model.Read(function (i) {
                    return true;
                }, Bridge.fn.bind(this, function (data) {
                    this.view.Render("showEntries", data);
                }));
            },
            ShowActive: function () {
                this.model.Read(function (i) {
                    return !i.Completed;
                }, Bridge.fn.bind(this, function (data) {
                    this.view.Render("showEntries", data);
                }));
            },
            ShowCompleted: function () {
                this.model.Read(function (i) {
                    return i.Completed;
                }, Bridge.fn.bind(this, function (data) {
                    this.view.Render("showEntries", data);
                }));
            },
            AddItem: function (title) {
                var trimmed = title.trim();
                if (System.String.isNullOrWhiteSpace(trimmed)) {
                    return;
                }
                this.model.Create(trimmed, Bridge.fn.bind(this, function (data) {
                    this.view.Render("clearNewTodo", "");
                    this.Filter(true);
                }));
            },
            EditItem: function (id) {
                this.model.Read$1(id, Bridge.fn.bind(this, function (items) {
                    this.view.Render("editItem", System.Linq.Enumerable.from(items).firstOrDefault(null, null));
                }));
            },
            EditItemSave: function (id, title) {
                var $t;
                var trimmed = title.trim();
                if (System.String.isNullOrWhiteSpace(trimmed)) {
                    this.RemoveItem(id);
                } else {
                    this.model.Update(id, ($t = new VanillaJs.BridgeConversion.ItemDTO(), $t.Title = title, $t), Bridge.fn.bind(this, function (evnt) {
                        this.view.Render("editItemDone", { Id: id, Title: title });
                    }));
                }
            },
            EditItemCancel: function (id) {
                this.model.Read$1(id, Bridge.fn.bind(this, function (data) {
                    this.view.Render("editItemDone", data[System.Array.index(0, data)]);
                }));
            },
            RemoveItem: function (id) {
                this.model.Remove(id, Bridge.fn.bind(this, function (data) {
                    this.view.Render("removeItem", { Id: id });
                }));
                this.Filter();
            },
            RemoveCompletedItems: function () {
                this.model.Read(function (i) {
                    return i.Completed;
                }, Bridge.fn.bind(this, function (data) {
                    var $t;
                    $t = Bridge.getEnumerator(data);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            this.RemoveItem(item.Id);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                }));
                this.Filter();
            },
            ToggleComplete: function (id, completed, silent) {
                var $t;
                if (silent === void 0) { silent = false; }
                this.model.Update(id, ($t = new VanillaJs.BridgeConversion.ItemDTO(), $t.Completed = completed, $t), Bridge.fn.bind(this, function (data) {
                    this.view.Render("elementComplete", { Id: id, Completed: completed });
                }));
                if (!silent) {
                    this.Filter();
                }
            },
            ToggleAll: function (completed) {
                this.model.Read(function (item) {
                    return item.Completed === !completed;
                }, Bridge.fn.bind(this, function (data) {
                    var $t;
                    $t = Bridge.getEnumerator(data);
                    try {
                        while ($t.moveNext()) {
                            var item = $t.Current;
                            this.ToggleComplete(item.Id, completed, true);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }

                }));
                this.Filter();
            },
            UpdateCount: function () {
                this.model.GetCount(Bridge.fn.bind(this, function (todos) {
                    this.view.Render("updateElementCount", { ActiveTodos: todos.Active });
                    this.view.Render("clearCompletedButton", { Completed: todos.Completed, Visible: todos.Completed > 0 });
                    this.view.Render("toggleAll", { Checked: (todos.Completed === todos.Total) });
                    this.view.Render("contentBlockVisibility", { Visible: todos.Total > 0 });
                }));
            },
            Filter: function (force) {
                if (force === void 0) { force = false; }
                var activeRoute = String.fromCharCode(this._activeRoute.toUpperCase().charCodeAt(0)) + (this._activeRoute.substr(1) || "");
                this.UpdateCount();

                if (force || !Bridge.referenceEquals(this._lastActiveRoute, "All") || !Bridge.referenceEquals(this._lastActiveRoute, activeRoute)) {
                    switch (activeRoute) {
                        case "All": 
                            this.ShowAll();
                            break;
                        case "Active": 
                            this.ShowActive();
                            break;
                        case "Completed": 
                            this.ShowCompleted();
                            break;
                    }
                }
                this._lastActiveRoute = activeRoute;
            },
            UpdateFilterState: function (currentPage) {
                this._activeRoute = currentPage;
                if (Bridge.referenceEquals(currentPage, "")) {
                    this._activeRoute = "All";
                }
                this.Filter();
                this.view.Render("setFilter", { CurrentPage: currentPage });
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Helpers", {
        statics: {
            methods: {
                Qs: function (selector) {
                    return document.querySelector(selector);
                },
                Qs$1: function (selector, scope) {
                    return scope.querySelector(selector);
                },
                Qsa: function (selector) {
                    return document.querySelectorAll(selector);
                },
                Qsa$1: function (selector, scope) {
                    return scope.querySelectorAll(selector);
                },
                On: function (target, type, callback, useCapture) {
                    if (useCapture === void 0) { useCapture = null; }
                    if (System.Nullable.hasValue(useCapture)) {
                        target.addEventListener(type, callback, System.Nullable.getValue(useCapture));
                    } else {
                        target.addEventListener(type, callback);
                    }
                },
                Delegate: function (target, selector, type, handler) {
                    var useCapture = Bridge.referenceEquals(type, "blur") || Bridge.referenceEquals(type, "focus");
                    VanillaJs.BridgeConversion.Helpers.On(target, type, function (evnt) {
                        var targetElement = evnt.target;
                        var potentialElements = VanillaJs.BridgeConversion.Helpers.Qsa$1(selector, target);
                        var hasMatch = System.Linq.Enumerable.from(potentialElements).contains(targetElement);

                        if (hasMatch) {
                            handler.call(targetElement, evnt);
                        }
                    }, useCapture);
                },
                Parent: function (element, tagName) {
                    if (element.parentNode == null) {
                        return null;
                    }

                    if (Bridge.referenceEquals(element.parentNode.tagName.toLowerCase(), tagName.toLowerCase())) {
                        return element.parentNode;
                    }

                    return VanillaJs.BridgeConversion.Helpers.Parent(element.parentNode, tagName);
                }
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Item", {
        fields: {
            Id: System.Int64(0),
            Title: null,
            Completed: false
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.ItemDTO", {
        fields: {
            Title: null,
            Completed: null
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Model", {
        fields: {
            _storage: null
        },
        ctors: {
            ctor: function (storage) {
                this.$initialize();
                this._storage = storage;
            }
        },
        methods: {
            Create: function (title, callback) {
                var $t;
                this._storage.Save(($t = new VanillaJs.BridgeConversion.ItemDTO(), $t.Title = title, $t.Completed = false, $t), callback);
            },
            Read$1: function (id, callback) {
                this._storage.Find$2(id, callback);
            },
            Read: function (filter, callback) {
                this._storage.Find(filter, callback);
            },
            Update: function (id, data, callback) {
                this._storage.Save(data, callback, id);
            },
            Remove: function (id, callback) {
                this._storage.Remove(id, callback);
            },
            RemoveAll: function (callback) {
                this._storage.Drop(callback);
            },
            GetCount: function (callback) {
                this._storage.FindAll(function (items) {
                    var $t;
                    var result = new VanillaJs.BridgeConversion.Model.CountOutput();
                    $t = Bridge.getEnumerator(items);
                    try {
                        while ($t.moveNext()) {
                            var todo = $t.Current;
                            if (todo.Completed) {
                                result.Completed = (result.Completed + 1) | 0;
                            } else {
                                result.Active = (result.Active + 1) | 0;
                            }
                            result.Total = (result.Total + 1) | 0;
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    callback(result);
                });
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Model.CountOutput", {
        $kind: "nested class",
        fields: {
            Completed: 0,
            Active: 0,
            Total: 0
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Store", {
        fields: {
            _callback: null,
            _dbName: null
        },
        ctors: {
            ctor: function (name, callback) {
                if (callback === void 0) { callback = null; }

                this.$initialize();
                this._dbName = name;
                this._callback = callback;

                var data = Bridge.unbox(window.localStorage.getItem(this._dbName));
                if (System.String.isNullOrEmpty(data)) {
                    var todos = System.Array.init(0, null, VanillaJs.BridgeConversion.Item);
                    window.localStorage.setItem(name, JSON.stringify(todos));
                }
                if (!Bridge.staticEquals(callback, null)) {
                    callback(Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.unbox(window.localStorage.getItem(this._dbName)), System.Array.type(VanillaJs.BridgeConversion.Item)));
                }
            }
        },
        methods: {
            Find$2: function (id, callback) {
                if (Bridge.staticEquals(callback, null)) {
                    return;
                }

                var todos = Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.unbox(window.localStorage.getItem(this._dbName)), System.Array.type(VanillaJs.BridgeConversion.Item));

                callback(System.Linq.Enumerable.from(todos).where(function (x) {
                        return id.equals(x.Id);
                    }).ToArray(VanillaJs.BridgeConversion.Item));
            },
            Find: function (filter, callback) {
                if (Bridge.staticEquals(callback, null)) {
                    return;
                }

                var todos = Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.unbox(window.localStorage.getItem(this._dbName)), System.Array.type(VanillaJs.BridgeConversion.Item));

                callback(System.Linq.Enumerable.from(todos).where(filter).ToArray(VanillaJs.BridgeConversion.Item));
            },
            Find$1: function (query, callback) {

                throw new System.NotImplementedException.ctor();

            },
            FindAll: function (callback) {
                if (callback === void 0) { callback = null; }
                if (!Bridge.staticEquals(callback, null)) {
                    callback(Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.unbox(window.localStorage.getItem(this._dbName)), System.Array.type(VanillaJs.BridgeConversion.Item)));
                }
            },
            Save: function (updateData, callback, id) {
                var $t;
                if (id === void 0) { id = null; }
                var todos = Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.unbox(window.localStorage.getItem(this._dbName)), System.Array.type(VanillaJs.BridgeConversion.Item));

                if (Bridge.staticEquals(callback, null)) {
                    return;
                }

                if (System.Nullable.hasValue(id)) {
                    var item = System.Linq.Enumerable.from(todos).where(function (x) {
                            return System.Nullable.getValue(id).equals(x.Id);
                        }).first();
                    if (!System.String.isNullOrWhiteSpace(updateData.Title)) {
                        item.Title = updateData.Title;
                    }
                    if (System.Nullable.hasValue(updateData.Completed)) {
                        item.Completed = System.Nullable.getValue(updateData.Completed);
                    }

                    window.localStorage.setItem(this._dbName, JSON.stringify(todos));
                    callback(todos);
                } else {
                    var item1 = ($t = new VanillaJs.BridgeConversion.Item(), $t.Id = System.DateTime.getTicks(System.DateTime.getNow()), $t.Title = updateData.Title, $t.Completed = false, $t);
                    todos.push(item1);
                    window.localStorage.setItem(this._dbName, JSON.stringify(todos));
                    callback(System.Array.init([item1], VanillaJs.BridgeConversion.Item));
                }
            },
            Remove: function (id, callback) {
                var todos = Newtonsoft.Json.JsonConvert.DeserializeObject(Bridge.unbox(window.localStorage.getItem(this._dbName)), System.Array.type(VanillaJs.BridgeConversion.Item));

                for (var i = 0; i < todos.length; i = (i + 1) | 0) {
                    var itemId = todos[System.Array.index(i, todos)].Id;
                    if (itemId.equalsT(id)) {
                        todos.splice(i, 1);
                        break;
                    }
                }

                window.localStorage.setItem(this._dbName, JSON.stringify(todos));

                if (!Bridge.staticEquals(callback, null)) {
                    callback(todos);
                }

            },
            Drop: function (callback) {
                var todos = System.Array.init(0, null, VanillaJs.BridgeConversion.Item);
                window.localStorage.setItem(this._dbName, JSON.stringify(todos));

                if (!Bridge.staticEquals(callback, null)) {
                    callback(todos);
                }

            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.Template", {
        statics: {
            fields: {
                HtmlEscapes: null,
                DefaultTemplate: null
            },
            ctors: {
                init: function () {
                    this.HtmlEscapes = function (_o1) {
                            _o1.add(38, "&amp;");
                            _o1.add(60, "&lt;");
                            _o1.add(62, "&gt;");
                            _o1.add(34, "&quot");
                            _o1.add(39, "&#x27");
                            _o1.add(96, "&#x60");
                            return _o1;
                        }(new (System.Collections.Generic.Dictionary$2(System.Char,System.String))());
                    this.DefaultTemplate = "<li data-id=\"{{id}}\" class=\"{{completed}}\"><div class=\"view\"><input class=\"toggle\" type=\"checkbox\" {{checked}}><label>{{title}}</label><button class=\"destroy\"></button></div></li>";
                }
            }
        },
        methods: {
            EscapeHtmlChar: function (c) {
                return VanillaJs.BridgeConversion.Template.HtmlEscapes.get(c);
            },
            Escape: function (input) {
                return Bridge.toArray(System.Linq.Enumerable.from(input).select(function (c) {
                            var result = { };
                            if (VanillaJs.BridgeConversion.Template.HtmlEscapes.tryGetValue(c, result)) {
                                return result.v;
                            }
                            return String.fromCharCode(c);
                        })).join("");
            },
            Show: function (data) {
                return Bridge.toArray(System.Linq.Enumerable.from(data).select(Bridge.fn.bind(this, function (item) {
                            var template = VanillaJs.BridgeConversion.Template.DefaultTemplate;
                            var completed = item.Completed ? "completed" : "", checked = item.Completed ? "checked" : "";

                            var result = System.String.replaceAll(System.String.replaceAll(System.String.replaceAll(System.String.replaceAll(template, "{{id}}", Bridge.toString(item.Id)), "{{title}}", this.Escape(item.Title)), "{{completed}}", completed), "{{checked}}", checked);

                            return result;
                        }))).join("");
            },
            ClearCompletedButton: function (completedCount) {
                return (completedCount > 0) ? "Clear completed" : "";
            },
            ItemCounter: function (activeTodos) {
                return "<strong>" + activeTodos + "</strong> item" + ((activeTodos === 1 ? "" : "s") || "") + " left";
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.View", {
        statics: {
            fields: {
                ENTER_KEY: 0,
                ESCAPE_KEY: 0
            },
            ctors: {
                init: function () {
                    this.ENTER_KEY = 13;
                    this.ESCAPE_KEY = 27;
                }
            }
        },
        fields: {
            template: null,
            _todoList: null,
            _todoItemCounter: null,
            _clearCompleted: null,
            _main: null,
            _footer: null,
            _toggleAll: null,
            _newTodo: null
        },
        ctors: {
            ctor: function (template) {
                this.$initialize();
                this.template = template;
                this._todoList = VanillaJs.BridgeConversion.Helpers.Qs(".todo-list");
                this._todoItemCounter = VanillaJs.BridgeConversion.Helpers.Qs(".todo-count");
                this._clearCompleted = VanillaJs.BridgeConversion.Helpers.Qs(".clear-completed");
                this._main = VanillaJs.BridgeConversion.Helpers.Qs(".main");
                this._footer = VanillaJs.BridgeConversion.Helpers.Qs(".footer");
                this._toggleAll = VanillaJs.BridgeConversion.Helpers.Qs(".toggle-all");
                this._newTodo = VanillaJs.BridgeConversion.Helpers.Qs(".new-todo");
            }
        },
        methods: {
            RemoveItem: function (id) {
                var elem = VanillaJs.BridgeConversion.Helpers.Qs("[data-id=\"" + id + "\"]");
                if (elem != null) {
                    this._todoList.removeChild(elem);
                }
            },
            ClearCompletedButton: function (completedCount, visible) {
                this._clearCompleted.innerHTML = this.template.ClearCompletedButton(completedCount);
                this._clearCompleted.style.display = visible ? "block" : "none";
            },
            SetFilter: function (currentPage) {
                VanillaJs.BridgeConversion.Helpers.Qs(".filters .selected").className = "";
                VanillaJs.BridgeConversion.Helpers.Qs(".filters [href=\"#/" + System.Nullable.toString(currentPage, null) + "\"]").className = "selected";
            },
            ElementComplete: function (id, completed) {
                var listItem = VanillaJs.BridgeConversion.Helpers.Qs("[data-id=\"" + id + "\"]");
                if (listItem == null) {
                    return;
                }
                listItem.className = completed ? "completed" : "";
                VanillaJs.BridgeConversion.Helpers.Qs$1("input", listItem).checked = completed;
            },
            EditItem: function (id, title) {
                var listItem = VanillaJs.BridgeConversion.Helpers.Qs("[data-id=\"" + id + "\"]");
                if (listItem == null) {
                    return;
                }
                listItem.className = (listItem.className || "") + " editing";

                var input = document.createElement("input");
                input.className = "edit";

                listItem.appendChild(input);
                input.focus();
                input.value = title;
            },
            EditItemDone: function (id, title) {
                var listItem = VanillaJs.BridgeConversion.Helpers.Qs("[data-id=\"" + id + "\"]");
                if (listItem == null) {
                    return;
                }

                var input = VanillaJs.BridgeConversion.Helpers.Qs$1("input.edit", listItem);
                listItem.removeChild(input);

                listItem.className = System.String.replaceAll(listItem.className, "editing", "");
                System.Linq.Enumerable.from(VanillaJs.BridgeConversion.Helpers.Qsa$1("label", listItem)).toList(Node).ForEach(function (label) {
                    label.textContent = title;
                });
            },
            Render: function (viewCmd, parameter) {
                switch (viewCmd) {
                    case "showEntries": 
                        this._todoList.innerHTML = this.template.Show(parameter);
                        break;
                    case "removeItem": 
                        this.RemoveItem(System.Int64(parameter.Id));
                        break;
                    case "updateElementCount": 
                        this._todoItemCounter.innerHTML = this.template.ItemCounter(parameter.ActiveTodos);
                        break;
                    case "clearCompletedButton": 
                        this.ClearCompletedButton(parameter.Completed, parameter.Visible);
                        break;
                    case "contentBlockVisibility": 
                        this._main.style.display = parameter.Visible ? "block" : "none";
                        this._footer.style.display = parameter.Visible ? "block" : "none";
                        break;
                    case "toggleAll": 
                        this._toggleAll.checked = parameter.Checked;
                        break;
                    case "setFilter": 
                        this.SetFilter(parameter.CurrentPage);
                        break;
                    case "clearNewTodo": 
                        this._newTodo.value = "";
                        break;
                    case "elementComplete": 
                        this.ElementComplete(System.Int64(parameter.Id), parameter.Completed);
                        break;
                    case "editItem": 
                        this.EditItem(System.Int64(parameter.Id), parameter.Title);
                        break;
                    case "editItemDone": 
                        this.EditItemDone(System.Int64(parameter.Id), parameter.Title);
                        break;
                }
            },
            ItemId: function (element) {
                var li = VanillaJs.BridgeConversion.Helpers.Parent(element, "li");
                return System.Int64.parse(li.dataset.id);
            },
            BindItemEditDone: function (handler) {
                VanillaJs.BridgeConversion.Helpers.Delegate(this._todoList, "li .edit", "blur", Bridge.fn.bind(this, function (evnt) {
                    var $t;
                    var isCanceled = VanillaJs.BridgeConversion.Helpers.Parent(evnt.target, "li").dataset.iscanceled;
                    if (System.String.isNullOrWhiteSpace(isCanceled)) {
                        handler(($t = new VanillaJs.BridgeConversion.View.ItemEditDoneDto(), $t.Id = this.ItemId(evnt.target), $t.Title = evnt.target.value, $t));
                    }
                }));
                VanillaJs.BridgeConversion.Helpers.Delegate(this._todoList, "li .edit", "keypress", function (evnt) {
                    if (evnt.keyCode === VanillaJs.BridgeConversion.View.ENTER_KEY) {
                        evnt.target.blur();
                    }
                });
            },
            BindItemEditCancel: function (handler) {
                VanillaJs.BridgeConversion.Helpers.Delegate(this._todoList, "li .edit", "keyup", Bridge.fn.bind(this, function (evnt) {
                    var $t;
                    if (evnt.keyCode === VanillaJs.BridgeConversion.View.ESCAPE_KEY) {
                        VanillaJs.BridgeConversion.Helpers.Parent(evnt.target, "li").dataset.iscanceled = System.Boolean.toString((true));
                        evnt.target.blur();

                        handler(($t = new VanillaJs.BridgeConversion.View.ItemEditCancelDTO(), $t.Id = this.ItemId(evnt.target), $t));
                    }
                }));
            },
            Bind: function (T, event, handler) {
                switch (event) {
                    case "newTodo": 
                        VanillaJs.BridgeConversion.Helpers.On(this._newTodo, "change", Bridge.fn.bind(this, function (evnt) {
                            (handler)(this._newTodo.value);
                        }));
                        break;
                    case "removeCompleted": 
                        VanillaJs.BridgeConversion.Helpers.On(this._clearCompleted, "click", function (evnt) {
                            handler(Bridge.getDefaultValue(T));
                        });
                        break;
                    case "toggleAll": 
                        VanillaJs.BridgeConversion.Helpers.On(this._toggleAll, "click", function (evnt) {
                            var $t;
                            (handler)(($t = new VanillaJs.BridgeConversion.View.ToggleAllDTO(), $t.Checked = evnt.target.checked, $t));
                        });
                        break;
                    case "itemEdit": 
                        VanillaJs.BridgeConversion.Helpers.Delegate(this._todoList, "li label", "dblclick", Bridge.fn.bind(this, function (evnt) {
                            var $t;
                            (handler)(($t = new VanillaJs.BridgeConversion.View.ItemEditDTO(), $t.Id = this.ItemId(evnt.target), $t));
                        }));
                        break;
                    case "itemRemove": 
                        VanillaJs.BridgeConversion.Helpers.Delegate(this._todoList, ".destroy", "click", Bridge.fn.bind(this, function (evnt) {
                            var $t;
                            (handler)(($t = new VanillaJs.BridgeConversion.View.ItemRemoveDTO(), $t.Id = this.ItemId(evnt.target), $t));
                        }));
                        break;
                    case "itemToggle": 
                        VanillaJs.BridgeConversion.Helpers.Delegate(this._todoList, ".toggle", "click", Bridge.fn.bind(this, function (evnt) {
                            var $t;
                            (handler)(($t = new VanillaJs.BridgeConversion.View.ItemToggleDTO(), $t.Id = this.ItemId(evnt.target), $t.Completed = evnt.target.checked, $t));
                        }));
                        break;
                    case "itemEditDone": 
                        this.BindItemEditDone(handler);
                        break;
                    case "itemEditCancel": 
                        this.BindItemEditCancel(handler);
                        break;
                }
            }
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.View.ItemEditDTO", {
        $kind: "nested class",
        fields: {
            Id: System.Int64(0)
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.View.ItemEditDoneDto", {
        $kind: "nested class",
        fields: {
            Id: System.Int64(0),
            Title: null
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.View.ItemToggleDTO", {
        $kind: "nested class",
        fields: {
            Id: System.Int64(0),
            Completed: false
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.View.ToggleAllDTO", {
        $kind: "nested class",
        fields: {
            Checked: false
        }
    });

    Bridge.define("VanillaJs.BridgeConversion.View.ItemEditCancelDTO", {
        inherits: [VanillaJs.BridgeConversion.View.ItemEditDTO],
        $kind: "nested class"
    });

    Bridge.define("VanillaJs.BridgeConversion.View.ItemRemoveDTO", {
        inherits: [VanillaJs.BridgeConversion.View.ItemEditDTO],
        $kind: "nested class"
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiQ29udHJvbGxlci5jcyIsIkhlbHBlcnMuY3MiLCJNb2RlbC5jcyIsIlN0b3JlLmNzIiwiVGVtcGxhdGUuY3MiLCJWaWV3LmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O1lBcUNZQSxzQ0FBV0EsZ0JBQTJDQSxBQUFvREE7Z0JBQVFBOztZQUNsSEEsc0NBQVdBLHNCQUFpREEsQUFBb0RBO2dCQUFRQTs7Ozs7Ozs7O2dDQWJqR0EsSUFBSUE7Ozs7O29CQUkzQkEsdURBQXdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFwQlpBOztnQkFFUkEsZUFBZUEsSUFBSUEsaUNBQU1BO2dCQUN6QkEsYUFBYUEsSUFBSUEsaUNBQU1BO2dCQUN2QkEsZ0JBQWdCQSxJQUFJQTtnQkFDcEJBLFlBQVlBLElBQUlBLGdDQUFLQTtnQkFDckJBLGtCQUFrQkEsSUFBSUEsc0NBQVdBLFlBQVlBOzs7Ozs7Ozs7Ozs7OzRCQ0huQ0EsT0FBYUE7O2dCQUUzQkEsYUFBYUE7Z0JBQ2JBLFlBQVlBOztnQkFFWkEsb0NBQTZCQSxBQUFnQ0EsK0JBQUNBO29CQUFpQkEsYUFBUUE7O2dCQUN2RkEsdURBQXVEQSxBQUFpRUEsK0JBQUNBO29CQUFjQSxjQUFTQTs7Z0JBQ2hKQSwyREFBMkRBLEFBQWlFQSwrQkFBQ0E7b0JBQWNBLGtCQUFhQSxTQUFTQTs7Z0JBQ2pLQSw2REFBNkRBLEFBQWlFQSwrQkFBQ0E7b0JBQWNBLG9CQUFlQTs7Z0JBQzVKQSx5REFBeURBLEFBQWlFQSwrQkFBQ0E7b0JBQWNBLGdCQUFXQTs7Z0JBQ3BKQSx5REFBeURBLEFBQWlFQSwrQkFBQ0E7b0JBQWNBLG9CQUFlQSxTQUFTQTs7Z0JBQ2pLQSw2Q0FBbUNBLEFBQThCQSwrQkFBQ0E7b0JBQWtCQTs7Z0JBQ3BGQSx1Q0FBNkJBLEFBQThCQSwrQkFB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QUNBLFNBQXFDQSxVQUFJQSx5REFFakNBLFlBQU9BLDZCQUNBQTs7d0JBR3BCQTtvQkFDSkE7d0JBQ0lBLHNCQUFpQkEsQUFBZ0ZBO3dCQUNqR0E7b0JBQ0pBO3dCQUNJQSx3QkFBbUJBLEFBQWtGQTt3QkFDckdBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgY2xhc3MgVG9kb1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIFRvZG8oc3RyaW5nIG5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RvcmFnZSA9IG5ldyBTdG9yZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBuZXcgTW9kZWwodGhpcy5TdG9yYWdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVmlldyA9IG5ldyBWaWV3KHRoaXMuVGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIodGhpcy5Nb2RlbCwgdGhpcy5WaWV3KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHVibGljIFN0b3JlIFN0b3JhZ2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBNb2RlbCBNb2RlbCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIFRlbXBsYXRlIFRlbXBsYXRlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgVmlldyBWaWV3IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgQ29udHJvbGxlciBDb250cm9sbGVyIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgVG9kbyB0b2RvID0gbmV3IFRvZG8oXCJ0b2Rvcy12YW5pbGxhanMtYnJpZGdlXCIpO1xyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBTZXRWaWV3KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRvZG8uQ29udHJvbGxlci5TZXRWaWV3KERvY3VtZW50LkxvY2F0aW9uLkhhc2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90b2RvOiBhZGQgZXZlbnQgXHJcbiAgICAgICAgICAgIC8vJG9uKHdpbmRvdywgJ2xvYWQnLCBzZXRWaWV3KTtcclxuICAgICAgICAgICAgLy8kb24od2luZG93LCAnaGFzaGNoYW5nZScsIHNldFZpZXcpO1xyXG4gICAgICAgICAgICBIZWxwZXJzLk9uKFdpbmRvdy5JbnN0YW5jZS5BczxIVE1MRWxlbWVudD4oKSwgXCJsb2FkXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KShldm50ID0+IFNldFZpZXcoKSkpO1xyXG4gICAgICAgICAgICBIZWxwZXJzLk9uKFdpbmRvdy5JbnN0YW5jZS5BczxIVE1MRWxlbWVudD4oKSwgXCJoYXNoY2hhbmdlXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KShldm50ID0+IFNldFZpZXcoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcbm5hbWVzcGFjZSBWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29udHJvbGxlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgTW9kZWwgbW9kZWw7XHJcbiAgICAgICAgcHJpdmF0ZSBWaWV3IHZpZXc7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX2FjdGl2ZVJvdXRlO1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF9sYXN0QWN0aXZlUm91dGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250cm9sbGVyKE1vZGVsIG1vZGVsLCBWaWV3IHZpZXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgIHRoaXMudmlldyA9IHZpZXc7XHJcblxyXG4gICAgICAgICAgICB2aWV3LkJpbmQ8c3RyaW5nPihcIm5ld1RvZG9cIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxzdHJpbmc+KSgoc3RyaW5nIHRpdGxlKSA9PiBBZGRJdGVtKHRpdGxlKSkpO1xyXG4gICAgICAgICAgICB2aWV3LkJpbmQ8VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbT4oXCJpdGVtRWRpdFwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbT4pKChJdGVtIGl0ZW0pID0+IEVkaXRJdGVtKGl0ZW0uSWQpKSk7XHJcbiAgICAgICAgICAgIHZpZXcuQmluZDxWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtPihcIml0ZW1FZGl0RG9uZVwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbT4pKChJdGVtIGl0ZW0pID0+IEVkaXRJdGVtU2F2ZShpdGVtLklkLCBpdGVtLlRpdGxlKSkpO1xyXG4gICAgICAgICAgICB2aWV3LkJpbmQ8VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbT4oXCJpdGVtRWRpdENhbmNlbFwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbT4pKChJdGVtIGl0ZW0pID0+IEVkaXRJdGVtQ2FuY2VsKGl0ZW0uSWQpKSk7XHJcbiAgICAgICAgICAgIHZpZXcuQmluZDxWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtPihcIml0ZW1SZW1vdmVcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0+KSgoSXRlbSBpdGVtKSA9PiBSZW1vdmVJdGVtKGl0ZW0uSWQpKSk7XHJcbiAgICAgICAgICAgIHZpZXcuQmluZDxWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtPihcIml0ZW1Ub2dnbGVcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0+KSgoSXRlbSBpdGVtKSA9PiBUb2dnbGVDb21wbGV0ZShpdGVtLklkLCBpdGVtLkNvbXBsZXRlZCkpKTtcclxuICAgICAgICAgICAgdmlldy5CaW5kPGJvb2w+KFwicmVtb3ZlQ29tcGxldGVkXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Ym9vbD4pKChib29sIEBmYWxzZSkgPT4geyBSZW1vdmVDb21wbGV0ZWRJdGVtcygpOyB9KSk7XHJcbiAgICAgICAgICAgIHZpZXcuQmluZDxib29sPihcInRvZ2dsZUFsbFwiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGJvb2w+KSgoYm9vbCBjb21wbGV0ZWQpID0+IFRvZ2dsZUFsbChjb21wbGV0ZWQpKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTZXRWaWV3KHN0cmluZyBsb2NhdGlvbkhhc2gpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcm91dGUgPSBzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKGxvY2F0aW9uSGFzaCkgPyBcIlwiIDogbG9jYXRpb25IYXNoLlNwbGl0KCcvJylbMV07XHJcbiAgICAgICAgICAgIHZhciBwYWdlID0gc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZShyb3V0ZSkgPyBcIlwiIDogcm91dGU7XHJcbiAgICAgICAgICAgIFVwZGF0ZUZpbHRlclN0YXRlKHBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNob3dBbGwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVhZCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIGJvb2w+KShpID0+IHsgcmV0dXJuIHRydWU7IH0pLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbVtdPikoZGF0YSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LlJlbmRlcihcInNob3dFbnRyaWVzXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIFNob3dBY3RpdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVhZCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIGJvb2w+KShpID0+IHsgcmV0dXJuICFpLkNvbXBsZXRlZDsgfSksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KShkYXRhID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuUmVuZGVyKFwic2hvd0VudHJpZXNcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBTaG93Q29tcGxldGVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLlJlYWQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtLCBib29sPikoaSA9PiB7IHJldHVybiBpLkNvbXBsZXRlZDsgfSksIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KShkYXRhID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuUmVuZGVyKFwic2hvd0VudHJpZXNcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBBZGRJdGVtKHN0cmluZyB0aXRsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0cmltbWVkID0gdGl0bGUuVHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yV2hpdGVTcGFjZSh0cmltbWVkKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbW9kZWwuQ3JlYXRlKHRyaW1tZWQsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KShkYXRhID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuUmVuZGVyKFwiY2xlYXJOZXdUb2RvXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgRmlsdGVyKHRydWUpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRWRpdEl0ZW0obG9uZyBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLlJlYWQoaWQsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KShpdGVtcyA9PiB2aWV3LlJlbmRlcihcImVkaXRJdGVtXCIsIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRmlyc3RPckRlZmF1bHQ8SXRlbT4oaXRlbXMpKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEVkaXRJdGVtU2F2ZShsb25nIGlkLCBzdHJpbmcgdGl0bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHJpbW1lZCA9IHRpdGxlLlRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UodHJpbW1lZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwuVXBkYXRlKGlkLCBuZXcgSXRlbURUTyB7IFRpdGxlID0gdGl0bGUgfSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW1bXT4pKGV2bnQgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LlJlbmRlcihcImVkaXRJdGVtRG9uZVwiLCBuZXcgeyBJZCA9IGlkLCBUaXRsZSA9IHRpdGxlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRWRpdEl0ZW1DYW5jZWwobG9uZyBpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLlJlYWQoaWQsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KShkYXRhID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuUmVuZGVyKFwiZWRpdEl0ZW1Eb25lXCIsIGRhdGFbMF0pO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGludGVybmFsIHZvaWQgUmVtb3ZlSXRlbShsb25nIGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVtb3ZlKGlkLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbVtdPikoZGF0YSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LlJlbmRlcihcInJlbW92ZUl0ZW1cIiwgbmV3IHsgSWQgPSBpZCB9KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBGaWx0ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQ29tcGxldGVkSXRlbXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVhZCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIGJvb2w+KShpID0+IHsgcmV0dXJuIGkuQ29tcGxldGVkOyB9KSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW1bXT4pKGRhdGEgPT5cclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbSBpbiBkYXRhKVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgUmVtb3ZlSXRlbShpdGVtLklkKTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIEZpbHRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVG9nZ2xlQ29tcGxldGUobG9uZyBpZCwgYm9vbCBjb21wbGV0ZWQsIGJvb2wgc2lsZW50ID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5VcGRhdGUoaWQsIG5ldyBJdGVtRFRPIHsgQ29tcGxldGVkID0gY29tcGxldGVkIH0sIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KShkYXRhID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuUmVuZGVyKFwiZWxlbWVudENvbXBsZXRlXCIsIG5ldyB7IElkID0gaWQsIENvbXBsZXRlZCA9IGNvbXBsZXRlZCB9KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBpZiAoIXNpbGVudClcclxuICAgICAgICAgICAgICAgIEZpbHRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVG9nZ2xlQWxsKGJvb2wgY29tcGxldGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuUmVhZCgoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIGJvb2w+KShpdGVtID0+IHsgcmV0dXJuIGl0ZW0uQ29tcGxldGVkID09ICFjb21wbGV0ZWQ7IH0pLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbVtdPikoZGF0YSA9PlxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtIGluIGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgIFRvZ2dsZUNvbXBsZXRlKGl0ZW0uSWQsIGNvbXBsZXRlZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBGaWx0ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlQ291bnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuR2V0Q291bnQoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLk1vZGVsLkNvdW50T3V0cHV0PikodG9kb3MgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmlldy5SZW5kZXIoXCJ1cGRhdGVFbGVtZW50Q291bnRcIiwgbmV3IHsgQWN0aXZlVG9kb3MgPSB0b2Rvcy5BY3RpdmUgfSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LlJlbmRlcihcImNsZWFyQ29tcGxldGVkQnV0dG9uXCIsIG5ldyB7IHRvZG9zLkNvbXBsZXRlZCwgVmlzaWJsZSA9IHRvZG9zLkNvbXBsZXRlZCA+IDAgfSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LlJlbmRlcihcInRvZ2dsZUFsbFwiLCBuZXcgeyBDaGVja2VkID0gKHRvZG9zLkNvbXBsZXRlZCA9PSB0b2Rvcy5Ub3RhbCkgfSk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LlJlbmRlcihcImNvbnRlbnRCbG9ja1Zpc2liaWxpdHlcIiwgbmV3IHsgVmlzaWJsZSA9IHRvZG9zLlRvdGFsID4gMCB9KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHZvaWQgRmlsdGVyKGJvb2wgZm9yY2UgPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVSb3V0ZSA9IF9hY3RpdmVSb3V0ZS5Ub1VwcGVyKClbMF0gKyBfYWN0aXZlUm91dGUuU3Vic3RyKDEpO1xyXG4gICAgICAgICAgICBVcGRhdGVDb3VudCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZvcmNlIHx8IF9sYXN0QWN0aXZlUm91dGUgIT0gXCJBbGxcIiB8fCBfbGFzdEFjdGl2ZVJvdXRlICE9IGFjdGl2ZVJvdXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGl2ZVJvdXRlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJBbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2hvd0FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQWN0aXZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNob3dBY3RpdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNvbXBsZXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTaG93Q29tcGxldGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9sYXN0QWN0aXZlUm91dGUgPSBhY3RpdmVSb3V0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlRmlsdGVyU3RhdGUoc3RyaW5nIGN1cnJlbnRQYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FjdGl2ZVJvdXRlID0gY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgX2FjdGl2ZVJvdXRlID0gXCJBbGxcIjtcclxuICAgICAgICAgICAgRmlsdGVyKCk7XHJcbiAgICAgICAgICAgIHZpZXcuUmVuZGVyKFwic2V0RmlsdGVyXCIsIG5ldyB7IEN1cnJlbnRQYWdlID0gY3VycmVudFBhZ2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxubmFtZXNwYWNlIFZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgSGVscGVyc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSFRNTEVsZW1lbnQgUXMoc3RyaW5nIHNlbGVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERvY3VtZW50LlF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLkFzPEhUTUxFbGVtZW50PigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEhUTUxFbGVtZW50IFFzKHN0cmluZyBzZWxlY3RvciwgSFRNTEVsZW1lbnQgc2NvcGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuUXVlcnlTZWxlY3RvcihzZWxlY3RvcikuQXM8SFRNTEVsZW1lbnQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE5vZGVMaXN0IFFzYShzdHJpbmcgc2VsZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRG9jdW1lbnQuUXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTm9kZUxpc3QgUXNhKHN0cmluZyBzZWxlY3RvciwgSFRNTEVsZW1lbnQgc2NvcGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGUuUXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgT24oSFRNTEVsZW1lbnQgdGFyZ2V0LCBzdHJpbmcgdHlwZSwgQWN0aW9uPEV2ZW50PiBjYWxsYmFjaywgYm9vbD8gdXNlQ2FwdHVyZT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHVzZUNhcHR1cmUuSGFzVmFsdWUpXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuQWRkRXZlbnRMaXN0ZW5lcih0eXBlLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkV2ZW50PiljYWxsYmFjaywgdXNlQ2FwdHVyZS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRhcmdldC5BZGRFdmVudExpc3RlbmVyKHR5cGUsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KWNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEZWxlZ2F0ZShIVE1MRWxlbWVudCB0YXJnZXQsIHN0cmluZyBzZWxlY3Rvciwgc3RyaW5nIHR5cGUsIEFjdGlvbjxFdmVudD4gaGFuZGxlcikge1xyXG4gICAgICAgICAgICB2YXIgdXNlQ2FwdHVyZSA9IHR5cGUgPT0gXCJibHVyXCIgfHwgdHlwZSA9PSBcImZvY3VzXCI7XHJcbiAgICAgICAgICAgIE9uKHRhcmdldCwgdHlwZSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5FdmVudD4pKChldm50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9IGV2bnQuVGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvdGVudGlhbEVsZW1lbnRzID0gUXNhKHNlbGVjdG9yLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc01hdGNoID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Db250YWluczxFdmVudFRhcmdldD4ocG90ZW50aWFsRWxlbWVudHMsdGFyZ2V0RWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhhc01hdGNoKVxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuQ2FsbCh0YXJnZXRFbGVtZW50LCBldm50KTsvL3RvZG86Y2hlY2sgb3JkZXIgb2YgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB9KSwgdXNlQ2FwdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSFRNTEVsZW1lbnQgUGFyZW50KEhUTUxFbGVtZW50IGVsZW1lbnQsIHN0cmluZyB0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LlBhcmVudE5vZGUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuUGFyZW50Tm9kZS5BczxIVE1MRWxlbWVudD4oKS5UYWdOYW1lLlRvTG93ZXJDYXNlKCkgPT0gdGFnTmFtZS5Ub0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuUGFyZW50Tm9kZS5BczxIVE1MRWxlbWVudD4oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQYXJlbnQoZWxlbWVudC5QYXJlbnROb2RlLkFzPEhUTUxFbGVtZW50PigpLCB0YWdOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9kZWxcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IFN0b3JlIF9zdG9yYWdlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW9kZWwoU3RvcmUgc3RvcmFnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENyZWF0ZShzdHJpbmcgdGl0bGUsIEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcmFnZS5TYXZlKG5ldyBJdGVtRFRPIHsgVGl0bGUgPSB0aXRsZSwgQ29tcGxldGVkID0gZmFsc2UgfSwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW1bXT4pY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWFkKGxvbmcgaWQsIEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIF9zdG9yYWdlLkZpbmQoaWQsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KWNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVhZChGdW5jPEl0ZW0sIGJvb2w+IGZpbHRlciwgQWN0aW9uPEl0ZW1bXT4gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgLy90b2RvOiBhZGQgZmlsdGVyaW5nXHJcbiAgICAgICAgICAgIF9zdG9yYWdlLkZpbmQoKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtLCBib29sPilmaWx0ZXIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtW10+KWNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShsb25nIGlkLCBJdGVtRFRPIGRhdGEsIEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3N0b3JhZ2UuU2F2ZShkYXRhLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbVtdPiljYWxsYmFjaywgaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlKGxvbmcgaWQsIEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIF9zdG9yYWdlLlJlbW92ZShpZCwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW1bXT4pY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlQWxsKEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3N0b3JhZ2UuRHJvcCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbVtdPiljYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xhc3MgQ291bnRPdXRwdXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBpbnQgQ29tcGxldGVkIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICAgICAgcHVibGljIGludCBBY3RpdmUgeyBnZXQ7IGludGVybmFsIHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgaW50IFRvdGFsIHsgZ2V0OyBpbnRlcm5hbCBzZXQ7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdldENvdW50KEFjdGlvbjxDb3VudE91dHB1dD4gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgX3N0b3JhZ2UuRmluZEFsbCgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbVtdPikoKGl0ZW1zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IENvdW50T3V0cHV0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3JlYWNoICh2YXIgdG9kbyBpbiBpdGVtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2RvLkNvbXBsZXRlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LkNvbXBsZXRlZCArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LkFjdGl2ZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5Ub3RhbCArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBOZXd0b25zb2Z0Lkpzb247XHJcblxyXG5uYW1lc3BhY2UgVmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb25cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFN0b3JlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBBY3Rpb248SXRlbVtdPiBfY2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgc3RyaW5nIF9kYk5hbWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdG9yZShzdHJpbmcgbmFtZSwgQWN0aW9uPEl0ZW1bXT4gY2FsbGJhY2sgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2RiTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIF9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBXaW5kb3cuTG9jYWxTdG9yYWdlLkdldEl0ZW0oX2RiTmFtZSkuQXM8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBpZiAoc3RyaW5nLklzTnVsbE9yRW1wdHkoZGF0YSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b2RvcyA9IG5ldyBJdGVtWzBdO1xyXG4gICAgICAgICAgICAgICAgV2luZG93LkxvY2FsU3RvcmFnZS5TZXRJdGVtKG5hbWUsIEpTT04uU3RyaW5naWZ5KHRvZG9zKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxJdGVtW10+KFdpbmRvdy5Mb2NhbFN0b3JhZ2UuR2V0SXRlbShfZGJOYW1lKS5BczxzdHJpbmc+KCkpKTtcclxuICAgICAgICAgICAgLy9KU09OLlBhcnNlQXNBcnJheTxJdGVtPihXaW5kb3cuTG9jYWxTdG9yYWdlLkdldEl0ZW0oX2RiTmFtZSkuQXM8c3RyaW5nPigpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEZpbmQobG9uZyBpZCwgQWN0aW9uPEl0ZW1bXT4gY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIHRvZG9zID0gSlNPTi5QYXJzZUFzQXJyYXk8SXRlbT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKF9kYk5hbWUpLkFzPHN0cmluZz4oKSk7XHJcbiAgICAgICAgICAgIEl0ZW1bXSB0b2RvcyA9IEpzb25Db252ZXJ0LkRlc2VyaWFsaXplT2JqZWN0PEl0ZW1bXT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKF9kYk5hbWUpLkFzPHN0cmluZz4oKSk7IC8vIEpTT04uUGFyc2VBc0FycmF5PEl0ZW0+KFdpbmRvdy5Mb2NhbFN0b3JhZ2UuR2V0SXRlbShfZGJOYW1lKS5BczxzdHJpbmc+KCkpO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtPih0b2RvcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIGJvb2w+KSh4ID0+IGlkID09IHguSWQpKS5Ub0FycmF5KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBGaW5kKEZ1bmM8SXRlbSwgYm9vbD4gZmlsdGVyLCBBY3Rpb248SXRlbVtdPiBjYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuLy8gICAgICAgICAgICB2YXIgdG9kb3MgPSBKU09OLlBhcnNlQXNBcnJheTxJdGVtPihXaW5kb3cuTG9jYWxTdG9yYWdlLkdldEl0ZW0oX2RiTmFtZSkuQXM8c3RyaW5nPigpKTtcclxuICAgICAgICAgICAgSXRlbVtdIHRvZG9zID0gSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8SXRlbVtdPihXaW5kb3cuTG9jYWxTdG9yYWdlLkdldEl0ZW0oX2RiTmFtZSkuQXM8c3RyaW5nPigpKTsgLy8gSlNPTi5QYXJzZUFzQXJyYXk8SXRlbT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKF9kYk5hbWUpLkFzPHN0cmluZz4oKSk7XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjayhTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPFZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0+KHRvZG9zLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uSXRlbSwgYm9vbD4pZmlsdGVyKS5Ub0FycmF5KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBGaW5kKEl0ZW0gcXVlcnksIEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEZpbmRBbGwoQWN0aW9uPEl0ZW1bXT4gY2FsbGJhY2sgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vY2FsbGJhY2soSlNPTi5QYXJzZUFzQXJyYXk8SXRlbT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKHRoaXMuX2RiTmFtZSkuQXM8c3RyaW5nPigpKSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhKc29uQ29udmVydC5EZXNlcmlhbGl6ZU9iamVjdDxJdGVtW10+KFdpbmRvdy5Mb2NhbFN0b3JhZ2UuR2V0SXRlbShfZGJOYW1lKS5BczxzdHJpbmc+KCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBTYXZlKEl0ZW1EVE8gdXBkYXRlRGF0YSwgQWN0aW9uPEl0ZW1bXT4gY2FsbGJhY2ssIGxvbmc/IGlkID0gbnVsbClcclxuICAgICAgICB7XHJcbi8vICAgICAgICAgICAgSXRlbVtdIHRvZG9zID0gSlNPTi5QYXJzZUFzQXJyYXk8SXRlbT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKF9kYk5hbWUpLkFzPHN0cmluZz4oKSk7XHJcbiAgICAgICAgICAgIEl0ZW1bXSB0b2RvcyA9IEpzb25Db252ZXJ0LkRlc2VyaWFsaXplT2JqZWN0PEl0ZW1bXT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKF9kYk5hbWUpLkFzPHN0cmluZz4oKSk7IC8vIEpTT04uUGFyc2VBc0FycmF5PEl0ZW0+KFdpbmRvdy5Mb2NhbFN0b3JhZ2UuR2V0SXRlbShfZGJOYW1lKS5BczxzdHJpbmc+KCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoaWQuSGFzVmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtPih0b2RvcywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIGJvb2w+KSh4ID0+IGlkLlZhbHVlID09IHguSWQpKS5GaXJzdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdHJpbmcuSXNOdWxsT3JXaGl0ZVNwYWNlKHVwZGF0ZURhdGEuVGl0bGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uVGl0bGUgPSB1cGRhdGVEYXRhLlRpdGxlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZURhdGEuQ29tcGxldGVkLkhhc1ZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uQ29tcGxldGVkID0gdXBkYXRlRGF0YS5Db21wbGV0ZWQuVmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgV2luZG93LkxvY2FsU3RvcmFnZS5TZXRJdGVtKF9kYk5hbWUsIEpTT04uU3RyaW5naWZ5KHRvZG9zKSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0b2Rvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBJdGVtXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSWQgPSBEYXRlVGltZS5Ob3cuVGlja3MsXHJcbiAgICAgICAgICAgICAgICAgICAgVGl0bGUgPSB1cGRhdGVEYXRhLlRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIENvbXBsZXRlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5TeXN0ZW0uQXJyYXlFeHRlbnNpb25zLlB1c2g8SXRlbT4oICAgICAgICAgICAgICAgIHRvZG9zLGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgV2luZG93LkxvY2FsU3RvcmFnZS5TZXRJdGVtKF9kYk5hbWUsIEpTT04uU3RyaW5naWZ5KHRvZG9zKSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXdbXSB7IGl0ZW0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlKGxvbmcgaWQsIEFjdGlvbjxJdGVtW10+IGNhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXRlbVtdIHRvZG9zID0gSnNvbkNvbnZlcnQuRGVzZXJpYWxpemVPYmplY3Q8SXRlbVtdPihXaW5kb3cuTG9jYWxTdG9yYWdlLkdldEl0ZW0oX2RiTmFtZSkuQXM8c3RyaW5nPigpKTsgLy8gSlNPTi5QYXJzZUFzQXJyYXk8SXRlbT4oV2luZG93LkxvY2FsU3RvcmFnZS5HZXRJdGVtKF9kYk5hbWUpLkFzPHN0cmluZz4oKSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRvZG9zLkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbUlkID0gdG9kb3NbaV0uSWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUlkLkVxdWFscyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2Rvcy5TcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vdG9kb3MgPSB0b2Rvcy5XaGVyZSh4ID0+IGlkICE9IHguSWQpLlRvQXJyYXkoKTtcclxuICAgICAgICAgICAgV2luZG93LkxvY2FsU3RvcmFnZS5TZXRJdGVtKF9kYk5hbWUsIEpTT04uU3RyaW5naWZ5KHRvZG9zKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRvZG9zKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyb3AoQWN0aW9uPEl0ZW1bXT4gY2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJdGVtW10gdG9kb3MgPSBuZXcgSXRlbVswXTtcclxuICAgICAgICAgICAgV2luZG93LkxvY2FsU3RvcmFnZS5TZXRJdGVtKF9kYk5hbWUsIEpTT04uU3RyaW5naWZ5KHRvZG9zKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRvZG9zKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcblxyXG5uYW1lc3BhY2UgVmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb25cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRlbXBsYXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRGljdGlvbmFyeTxjaGFyLCBzdHJpbmc+IEh0bWxFc2NhcGVzID0gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IERpY3Rpb25hcnk8Y2hhciwgc3RyaW5nPigpLChfbzEpPT57X28xLkFkZCgnJicsXCImYW1wO1wiKTtfbzEuQWRkKCc8JyxcIiZsdDtcIik7X28xLkFkZCgnPicsXCImZ3Q7XCIpO19vMS5BZGQoJ1wiJyxcIiZxdW90XCIpO19vMS5BZGQoJ1xcJycsXCImI3gyN1wiKTtfbzEuQWRkKCdgJyxcIiYjeDYwXCIpO3JldHVybiBfbzE7fSk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEVzY2FwZUh0bWxDaGFyKGNoYXIgYykge1xyXG4gICAgICAgICAgICByZXR1cm4gSHRtbEVzY2FwZXNbY107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIEVzY2FwZShzdHJpbmcgaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5Kb2luKFwiXCIsIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuU2VsZWN0PGNoYXIsc3RyaW5nPihpbnB1dCwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxjaGFyLCBzdHJpbmc+KShjID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoSHRtbEVzY2FwZXMuVHJ5R2V0VmFsdWUoYywgb3V0IHJlc3VsdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH0pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY29uc3Qgc3RyaW5nIERlZmF1bHRUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgID0gXCI8bGkgZGF0YS1pZD1cXFwie3tpZH19XFxcIiBjbGFzcz1cXFwie3tjb21wbGV0ZWR9fVxcXCI+PGRpdiBjbGFzcz1cXFwidmlld1xcXCI+PGlucHV0IGNsYXNzPVxcXCJ0b2dnbGVcXFwiIHR5cGU9XFxcImNoZWNrYm94XFxcIiB7e2NoZWNrZWR9fT48bGFiZWw+e3t0aXRsZX19PC9sYWJlbD48YnV0dG9uIGNsYXNzPVxcXCJkZXN0cm95XFxcIj48L2J1dHRvbj48L2Rpdj48L2xpPlwiO1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU2hvdyhJRW51bWVyYWJsZTxJdGVtPiBkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmcuSm9pbihcIlwiLCBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlNlbGVjdDxWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5JdGVtLHN0cmluZz4oZGF0YSwoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6OlZhbmlsbGFKcy5CcmlkZ2VDb252ZXJzaW9uLkl0ZW0sIHN0cmluZz4pKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gRGVmYXVsdFRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIGNvbXBsZXRlZCA9IGl0ZW0uQ29tcGxldGVkID8gXCJjb21wbGV0ZWRcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBAY2hlY2tlZCA9IGl0ZW0uQ29tcGxldGVkID8gXCJjaGVja2VkXCIgOiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQ9dGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIC5SZXBsYWNlKFwie3tpZH19XCIsIGl0ZW0uSWQuVG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgIC5SZXBsYWNlKFwie3t0aXRsZX19XCIsIEVzY2FwZShpdGVtLlRpdGxlKSlcclxuICAgICAgICAgICAgICAgIC5SZXBsYWNlKFwie3tjb21wbGV0ZWR9fVwiLCBjb21wbGV0ZWQpXHJcbiAgICAgICAgICAgICAgICAuUmVwbGFjZShcInt7Y2hlY2tlZH19XCIsIEBjaGVja2VkKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnRlcm5hbCBzdHJpbmcgQ2xlYXJDb21wbGV0ZWRCdXR0b24oaW50IGNvbXBsZXRlZENvdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChjb21wbGV0ZWRDb3VudCA+IDApXHJcbiAgICAgICAgICAgICAgICA/IFwiQ2xlYXIgY29tcGxldGVkXCJcclxuICAgICAgICAgICAgICAgIDogXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0cmluZyBJdGVtQ291bnRlcihpbnQgYWN0aXZlVG9kb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIFwiPHN0cm9uZz5cIlxyXG4gICAgICAgICAgICAgICAgKyBhY3RpdmVUb2Rvc1xyXG4gICAgICAgICAgICAgICAgKyBcIjwvc3Ryb25nPiBpdGVtXCJcclxuICAgICAgICAgICAgICAgICsgKGFjdGl2ZVRvZG9zID09IDEgPyBcIlwiIDogXCJzXCIpXHJcbiAgICAgICAgICAgICAgICArIFwiIGxlZnRcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG5cclxuXHJcbm5hbWVzcGFjZSBWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvblxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVmlld1xyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgVGVtcGxhdGUgdGVtcGxhdGU7XHJcbiAgICAgICAgY29uc3QgaW50IEVOVEVSX0tFWSA9IDEzO1xyXG4gICAgICAgIGNvbnN0IGludCBFU0NBUEVfS0VZID0gMjc7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfdG9kb0xpc3Q7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfdG9kb0l0ZW1Db3VudGVyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX2NsZWFyQ29tcGxldGVkO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX21haW47XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBIVE1MRWxlbWVudCBfZm9vdGVyO1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSFRNTEVsZW1lbnQgX3RvZ2dsZUFsbDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEhUTUxFbGVtZW50IF9uZXdUb2RvO1xyXG5cclxuICAgICAgICBwdWJsaWMgVmlldyhUZW1wbGF0ZSB0ZW1wbGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgX3RvZG9MaXN0ID0gSGVscGVycy5RcyhcIi50b2RvLWxpc3RcIik7XHJcbiAgICAgICAgICAgIF90b2RvSXRlbUNvdW50ZXIgPSBIZWxwZXJzLlFzKFwiLnRvZG8tY291bnRcIik7XHJcbiAgICAgICAgICAgIF9jbGVhckNvbXBsZXRlZCA9IEhlbHBlcnMuUXMoXCIuY2xlYXItY29tcGxldGVkXCIpO1xyXG4gICAgICAgICAgICBfbWFpbiA9IEhlbHBlcnMuUXMoXCIubWFpblwiKTtcclxuICAgICAgICAgICAgX2Zvb3RlciA9IEhlbHBlcnMuUXMoXCIuZm9vdGVyXCIpO1xyXG4gICAgICAgICAgICBfdG9nZ2xlQWxsID0gSGVscGVycy5RcyhcIi50b2dnbGUtYWxsXCIpO1xyXG4gICAgICAgICAgICBfbmV3VG9kbyA9IEhlbHBlcnMuUXMoXCIubmV3LXRvZG9cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW1vdmVJdGVtKGxvbmcgaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWxlbSA9IEhlbHBlcnMuUXMoXCJbZGF0YS1pZD1cXFwiXCIgKyBpZCArIFwiXFxcIl1cIik7XHJcbiAgICAgICAgICAgIGlmIChlbGVtICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBfdG9kb0xpc3QuUmVtb3ZlQ2hpbGQoZWxlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbGVhckNvbXBsZXRlZEJ1dHRvbihpbnQgY29tcGxldGVkQ291bnQsIGJvb2wgdmlzaWJsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jbGVhckNvbXBsZXRlZC5Jbm5lckhUTUwgPSB0ZW1wbGF0ZS5DbGVhckNvbXBsZXRlZEJ1dHRvbihjb21wbGV0ZWRDb3VudCk7XHJcbiAgICAgICAgICAgIF9jbGVhckNvbXBsZXRlZC5TdHlsZS5EaXNwbGF5ID0gdmlzaWJsZSA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0RmlsdGVyKGludD8gY3VycmVudFBhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIZWxwZXJzLlFzKFwiLmZpbHRlcnMgLnNlbGVjdGVkXCIpLkNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIEhlbHBlcnMuUXMoXCIuZmlsdGVycyBbaHJlZj1cXFwiIy9cIiArIGN1cnJlbnRQYWdlICsgXCJcXFwiXVwiKS5DbGFzc05hbWUgPSBcInNlbGVjdGVkXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbGVtZW50Q29tcGxldGUobG9uZyBpZCwgYm9vbCBjb21wbGV0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSBIZWxwZXJzLlFzKFwiW2RhdGEtaWQ9XFxcIlwiICsgaWQgKyBcIlxcXCJdXCIpO1xyXG4gICAgICAgICAgICBpZiAobGlzdEl0ZW0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGlzdEl0ZW0uQ2xhc3NOYW1lID0gY29tcGxldGVkID8gXCJjb21wbGV0ZWRcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIEhlbHBlcnMuUXMoXCJpbnB1dFwiLCBsaXN0SXRlbSkuQXM8SFRNTElucHV0RWxlbWVudD4oKS5DaGVja2VkID0gY29tcGxldGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRWRpdEl0ZW0obG9uZyBpZCwgc3RyaW5nIHRpdGxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3RJdGVtID0gSGVscGVycy5RcyhcIltkYXRhLWlkPVxcXCJcIiArIGlkICsgXCJcXFwiXVwiKTtcclxuICAgICAgICAgICAgaWYgKGxpc3RJdGVtID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxpc3RJdGVtLkNsYXNzTmFtZSA9IGxpc3RJdGVtLkNsYXNzTmFtZSArIFwiIGVkaXRpbmdcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IERvY3VtZW50LkNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgaW5wdXQuQ2xhc3NOYW1lID0gXCJlZGl0XCI7XHJcblxyXG4gICAgICAgICAgICBsaXN0SXRlbS5BcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgICAgIGlucHV0LkZvY3VzKCk7XHJcbiAgICAgICAgICAgIGlucHV0LkFzPEhUTUxJbnB1dEVsZW1lbnQ+KCkuVmFsdWUgPSB0aXRsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEVkaXRJdGVtRG9uZShsb25nIGlkLCBzdHJpbmcgdGl0bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSBIZWxwZXJzLlFzKFwiW2RhdGEtaWQ9XFxcIlwiICsgaWQgKyBcIlxcXCJdXCIpO1xyXG4gICAgICAgICAgICBpZiAobGlzdEl0ZW0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IEhlbHBlcnMuUXMoXCJpbnB1dC5lZGl0XCIsIGxpc3RJdGVtKTtcclxuICAgICAgICAgICAgbGlzdEl0ZW0uUmVtb3ZlQ2hpbGQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgbGlzdEl0ZW0uQ2xhc3NOYW1lID0gbGlzdEl0ZW0uQ2xhc3NOYW1lLlJlcGxhY2UoXCJlZGl0aW5nXCIsIFwiXCIpO1xyXG5TeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvTGlzdDxOb2RlPihcclxuICAgICAgICAgICAgSGVscGVycy5Rc2EoXCJsYWJlbFwiLCBsaXN0SXRlbSkpLkZvckVhY2goKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5Ob2RlPikobGFiZWwgPT4gbGFiZWwuVGV4dENvbnRlbnQgPSB0aXRsZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVuZGVyKHN0cmluZyB2aWV3Q21kLCBkeW5hbWljIHBhcmFtZXRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodmlld0NtZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNob3dFbnRyaWVzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgX3RvZG9MaXN0LklubmVySFRNTCA9IHRlbXBsYXRlLlNob3cocGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVJdGVtXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgUmVtb3ZlSXRlbShwYXJhbWV0ZXIuSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInVwZGF0ZUVsZW1lbnRDb3VudFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIF90b2RvSXRlbUNvdW50ZXIuSW5uZXJIVE1MID0gdGVtcGxhdGUuSXRlbUNvdW50ZXIocGFyYW1ldGVyLkFjdGl2ZVRvZG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjbGVhckNvbXBsZXRlZEJ1dHRvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIENsZWFyQ29tcGxldGVkQnV0dG9uKHBhcmFtZXRlci5Db21wbGV0ZWQsIHBhcmFtZXRlci5WaXNpYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjb250ZW50QmxvY2tWaXNpYmlsaXR5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgX21haW4uU3R5bGUuRGlzcGxheSA9IHBhcmFtZXRlci5WaXNpYmxlID8gXCJibG9ja1wiIDogXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Zvb3Rlci5TdHlsZS5EaXNwbGF5ID0gcGFyYW1ldGVyLlZpc2libGUgPyBcImJsb2NrXCIgOiBcIm5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b2dnbGVBbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICBfdG9nZ2xlQWxsLkFzPEhUTUxJbnB1dEVsZW1lbnQ+KCkuQ2hlY2tlZCA9IHBhcmFtZXRlci5DaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNldEZpbHRlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIFNldEZpbHRlcihwYXJhbWV0ZXIuQ3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNsZWFyTmV3VG9kb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIF9uZXdUb2RvLkFzPEhUTUxJbnB1dEVsZW1lbnQ+KCkuVmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImVsZW1lbnRDb21wbGV0ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIEVsZW1lbnRDb21wbGV0ZShwYXJhbWV0ZXIuSWQsIHBhcmFtZXRlci5Db21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImVkaXRJdGVtXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgRWRpdEl0ZW0ocGFyYW1ldGVyLklkLCBwYXJhbWV0ZXIuVGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImVkaXRJdGVtRG9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIEVkaXRJdGVtRG9uZShwYXJhbWV0ZXIuSWQsIHBhcmFtZXRlci5UaXRsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGxvbmcgSXRlbUlkKEhUTUxFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGkgPSBIZWxwZXJzLlBhcmVudChlbGVtZW50LCBcImxpXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbG9uZy5QYXJzZShsaS5EYXRhc2V0W1wiaWRcIl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSXRlbVRvZ2dsZURUT1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGxvbmcgSWQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBDb21wbGV0ZWQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgY2xhc3MgSXRlbUVkaXREb25lRHRvXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgbG9uZyBJZCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgICAgIHB1YmxpYyBzdHJpbmcgVGl0bGUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBCaW5kSXRlbUVkaXREb25lKEFjdGlvbjxJdGVtRWRpdERvbmVEdG8+IGhhbmRsZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIZWxwZXJzLkRlbGVnYXRlKF90b2RvTGlzdCwgXCJsaSAuZWRpdFwiLCBcImJsdXJcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5FdmVudD4pKChldm50KSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNDYW5jZWxlZCA9IEhlbHBlcnMuUGFyZW50KGV2bnQuVGFyZ2V0LkFzPEhUTUxFbGVtZW50PigpLCBcImxpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLkRhdGFzZXRbXCJpc2NhbmNlbGVkXCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZy5Jc051bGxPcldoaXRlU3BhY2UoaXNDYW5jZWxlZCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihuZXcgSXRlbUVkaXREb25lRHRvXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJZCA9IEl0ZW1JZChldm50LlRhcmdldC5BczxIVE1MRWxlbWVudD4oKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlID0gZXZudC5UYXJnZXQuQXM8SFRNTElucHV0RWxlbWVudD4oKS5WYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIEhlbHBlcnMuRGVsZWdhdGUoX3RvZG9MaXN0LCBcImxpIC5lZGl0XCIsIFwia2V5cHJlc3NcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5FdmVudD4pKChldm50KSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZudC5BczxLZXlib2FyZEV2ZW50PigpLktleUNvZGUgPT0gRU5URVJfS0VZKVxyXG4gICAgICAgICAgICAgICAgICAgIGV2bnQuVGFyZ2V0LkFzPEhUTUxJbnB1dEVsZW1lbnQ+KCkuQmx1cigpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBjbGFzcyBJdGVtRWRpdERUT1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIGxvbmcgSWQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgY2xhc3MgVG9nZ2xlQWxsRFRPXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgYm9vbCBDaGVja2VkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGNsYXNzIEl0ZW1SZW1vdmVEVE8gOiBJdGVtRWRpdERUT1xyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGNsYXNzIEl0ZW1FZGl0Q2FuY2VsRFRPIDogSXRlbUVkaXREVE9cclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEJpbmRJdGVtRWRpdENhbmNlbChBY3Rpb248SXRlbUVkaXRDYW5jZWxEVE8+IGhhbmRsZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0NvbnNvbGUuV3JpdGVMaW5lKFwiQmluZEl0ZW1FZGl0Q2FuY2VsXCIpO1xyXG4gICAgICAgICAgICBIZWxwZXJzLkRlbGVnYXRlKF90b2RvTGlzdCwgXCJsaSAuZWRpdFwiLCBcImtleXVwXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KSgoZXZudCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9Db25zb2xlLldyaXRlTGluZShcIkJpbmRJdGVtRWRpdENhbmNlbFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChldm50LkFzPEtleWJvYXJkRXZlbnQ+KCkuS2V5Q29kZSA9PSBFU0NBUEVfS0VZKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29uc29sZS5Xcml0ZUxpbmUoXCJCaW5kSXRlbUVkaXRDYW5jZWwtZXNjYXBlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEhlbHBlcnMuUGFyZW50KGV2bnQuVGFyZ2V0LkFzPEhUTUxFbGVtZW50PigpLCBcImxpXCIpLkRhdGFzZXRbXCJpc2NhbmNlbGVkXCJdID0gdHJ1ZS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2bnQuVGFyZ2V0LkFzPEhUTUxJbnB1dEVsZW1lbnQ+KCkuQmx1cigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKG5ldyBJdGVtRWRpdENhbmNlbERUTyB7IElkID0gSXRlbUlkKGV2bnQuVGFyZ2V0LkFzPEhUTUxFbGVtZW50PigpKSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQmluZDxUPihzdHJpbmcgQGV2ZW50LCBBY3Rpb248VD4gaGFuZGxlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoQGV2ZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibmV3VG9kb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIEhlbHBlcnMuT24oX25ld1RvZG8sIFwiY2hhbmdlXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KShldm50ID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaGFuZGxlci5BczxBY3Rpb248c3RyaW5nPj4oKSkoX25ld1RvZG8uQXM8SFRNTElucHV0RWxlbWVudD4oKS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlbW92ZUNvbXBsZXRlZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIEhlbHBlcnMuT24oX2NsZWFyQ29tcGxldGVkLCBcImNsaWNrXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KShldm50ID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGRlZmF1bHQoVCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b2dnbGVBbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICBIZWxwZXJzLk9uKF90b2dnbGVBbGwsIFwiY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5FdmVudD4pKChldm50KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGhhbmRsZXIuQXM8QWN0aW9uPFRvZ2dsZUFsbERUTz4+KCkpKG5ldyBUb2dnbGVBbGxEVE8geyBDaGVja2VkID0gZXZudC5UYXJnZXQuQXM8SFRNTElucHV0RWxlbWVudD4oKS5DaGVja2VkIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJpdGVtRWRpdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIEhlbHBlcnMuRGVsZWdhdGUoX3RvZG9MaXN0LCBcImxpIGxhYmVsXCIsIFwiZGJsY2xpY2tcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5FdmVudD4pKChldm50KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGhhbmRsZXIuQXM8QWN0aW9uPEl0ZW1FZGl0RFRPPj4oKSkobmV3IEl0ZW1FZGl0RFRPIHsgSWQgPSBJdGVtSWQoZXZudC5UYXJnZXQuQXM8SFRNTEVsZW1lbnQ+KCkpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJpdGVtUmVtb3ZlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgSGVscGVycy5EZWxlZ2F0ZShfdG9kb0xpc3QsIFwiLmRlc3Ryb3lcIiwgXCJjbGlja1wiLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkV2ZW50PikoKGV2bnQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaGFuZGxlci5BczxBY3Rpb248SXRlbVJlbW92ZURUTz4+KCkpKG5ldyBJdGVtUmVtb3ZlRFRPIHsgSWQgPSBJdGVtSWQoZXZudC5UYXJnZXQuQXM8SFRNTEVsZW1lbnQ+KCkpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJpdGVtVG9nZ2xlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgSGVscGVycy5EZWxlZ2F0ZShfdG9kb0xpc3QsIFwiLnRvZ2dsZVwiLCBcImNsaWNrXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpCcmlkZ2UuSHRtbDUuRXZlbnQ+KShldm50ID0+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaGFuZGxlci5BczxBY3Rpb248SXRlbVRvZ2dsZURUTz4+KCkpKG5ldyBJdGVtVG9nZ2xlRFRPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkID0gSXRlbUlkKGV2bnQuVGFyZ2V0LkFzPEhUTUxFbGVtZW50PigpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlZCA9IGV2bnQuVGFyZ2V0LkFzPEhUTUxJbnB1dEVsZW1lbnQ+KCkuQ2hlY2tlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiaXRlbUVkaXREb25lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQmluZEl0ZW1FZGl0RG9uZSgoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6VmFuaWxsYUpzLkJyaWRnZUNvbnZlcnNpb24uVmlldy5JdGVtRWRpdERvbmVEdG8+KWhhbmRsZXIuQXM8QWN0aW9uPEl0ZW1FZGl0RG9uZUR0bz4+KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIml0ZW1FZGl0Q2FuY2VsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQmluZEl0ZW1FZGl0Q2FuY2VsKChnbG9iYWw6OlN5c3RlbS5BY3Rpb248Z2xvYmFsOjpWYW5pbGxhSnMuQnJpZGdlQ29udmVyc2lvbi5WaWV3Lkl0ZW1FZGl0Q2FuY2VsRFRPPiloYW5kbGVyLkFzPEFjdGlvbjxJdGVtRWRpdENhbmNlbERUTz4+KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
