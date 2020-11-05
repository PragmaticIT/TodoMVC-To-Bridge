using PragmaticIt.BridgeNet.MithrilBridge;
using System;
using System.Linq;

namespace SimpleApplication
{
    public class UserList : MithrilComponentBase, IHasOnInit
    {
        public Func<Vnode, object> OnInit { get { return vnode => { UserModel.LoadList(); return null; }; } }

        public override object ViewHandler(Vnode vnode)
        {
            return M.m(".user-list", null, UserModel.List.Select(user => {
                return M.m(M.Route.Link(), new { href = "/edit/" + user.Id, selector = "a.user-list-item" }, user.FirstName + " " + user.LastName);
                //return M.m("a.user-list-item", new HandlerBuilder()
                //    .Add("href", "/edit/" + user.Id)
                //    .Add("oncreate",M.Route)
                //    .Build(), user.FirstName + " " + user.lastName);
            }).ToArray());
                //return m("a.user-list-item", { href: "/edit/" + user.id, oncreate: m.route.link}, user.firstName + " " + user.lastName)
     
        }
    }
}
