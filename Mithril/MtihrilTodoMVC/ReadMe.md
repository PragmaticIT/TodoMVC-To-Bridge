# Mithril TodoMVC conversion to Bridge.NET

### Conversion notes



I was surprised how easy it was. Due to clean and simplified API, Mithril was pretty quickly mapped to Bridge interfaces so I could start playing with TodoMVC. 

Most important differences between original (js) and .NET version:

1. _m_ become _M.m_. It's fairly obvious as C# does not allow non-rooted methods. 
```javascript
m("select", {selectedIndex: 0}, [
    m("option", "Option A"),
    m("option", "Option B"),
])
```
2. in _m_ parameters you don't have to formulate children into array - it's declared as _param_ in .NET. So instead of `m({selector},[child1, child2])` you have `M.m({selector},child1, child2)`

```javascript
m("select", { selectedIndex: 0 }, [
    m("option", "Option A"),
    m("option", "Option B"),
])
```
becomes
```c#
M.m("select"),new { selectedIndex = 0 },
	M.m("option",null,"Option A"),
	M.m("option",null,"option B")
);
```
3. Mithril uses anonymous objects to pass attributes. In C# you can keep using anonymous objects, prepare own typed classes to handle repetitive scenarios or use HandlerBuilder.
for example:

- anonymous object
```c#
M.m("select"),new { selectedIndex = 0 },
	M.m("option",null,"Option A"),
	M.m("option",null,"option B")
);
```

- custom class
```c#
[Convention(Notation = Notation.CamelCase)]
public class SelectOptions{
	public int SelectedIndex {get; set;}
}

//and later in code:
M.m("select"),new SelectOptions{ SelectedIndex = 0 },
	M.m("option",null,"Option A"),
	M.m("option",null,"option B")
);
```

- using HandlerBuilder
```c#
M.m("select"),new HandlerBuilder()
		.Add("selectedIndex",0)
		.Add("class",model.Flag?"":"required") //you can put here any code to evaluate
		.Add("change",SelectChanged), //you can point to the method being event handler
		.Add("blur",()=>Model.Save()) //you can add anonymous functions, with or without params
		.Build(),
	M.m("option",null,"Option A"),
	M.m("option",null,"option B")
);
```
The last one is the most flexible, but not as readable as original one. 
As C# does not allow to add delegates to anonymous objects, this is a workaround I've found useful to not create specified class every time.
To make things easier, it's possible to create some enum with common attributes or class holding all the magic strings for future re-use.

5. **Routing.** Due to naming limitation, method name for routing declaration had to be changed. 
```javascript
m.route(document.body, "/home", {
    "/home": Home, // defines `https://localhost/#!/home`
})
```
become
```c#
var routes = new RouteBuilder()
	.Add("/").Component<TodoMvc.TodosComponent>()
	.Add("/:status").Component<TodoMvc.TodosComponent>()
	.Build();
M.Routes(Document.GetElementById("todoapp"), "/", routes);
```
Similarly to HandlerBuilder, Routebuilder lets you declare the routing handler in form of a delegate.

6. **Strong types** For the convenience of having stringly typed Vnode attributes and state, numerous generic overrides were provided.

7. **Lifecycle methods** Lifecycle methods (https://mithril.js.org/lifecycle-methods.html) are prepared in form of interfaces to be freely composed into any component.

8. **m.request** and **m.jsonp** are currently not implemented.
