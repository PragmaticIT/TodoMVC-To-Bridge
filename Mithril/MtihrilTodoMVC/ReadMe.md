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
4.  You can create proper classes to handle all your options or use handler builder in this scenario. 
for example:
```c#
M.m("select"),new { selectedIndex = 0 },
	M.m("option",null,"Option A"),
	M.m("option",null,"option B")
);
```
or
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
or
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
The last one is the most flexible, but not as readable as original one. Unfortunately, C# doeas not allow to add delegates to anonymous object, so this is the only workaround I've found.

5. 