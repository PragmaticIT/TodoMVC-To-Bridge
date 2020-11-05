using PragmaticIt.BridgeNet.MithrilBridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleApplication
{
    public class UserForm : MithrilComponentBase<UserFormAttributes>, IHasOnInit<UserFormAttributes>
    {
        public Func<Vnode<UserFormAttributes>, object> OnInit
        {
            get
            {
                return (Vnode<UserFormAttributes> vnode) =>
                {
                    UserModel.Load(vnode.Attrs.Id);
                    return null;
                };
            }
        }

        public override object ViewHandler(Vnode<UserFormAttributes> vnode)
        {
            if (UserModel.Current == null)
                return null;
            var user = UserModel.Current ?? new User();
            return M.m("form", new HandlerBuilder()
                .Add<UIEvent>("onsubmit", (evt) =>
                {
                    evt.PreventDefault();
                    UserModel.Save().Then(()=> { M.Route.Set("/list",null,null); });
                })
                .Build(),
                M.m("label.label", null, "First name"),
                M.m("input.input[type=text][placeholder=First name]", new HandlerBuilder()
                    .Add<UIEvent<HTMLInputElement>>("oninput", (UIEvent<HTMLInputElement> evt) => { UserModel.Current.FirstName = evt.CurrentTarget.Value; })
                    .Add("value", user.FirstName)
                    .Build(), null),
                M.m("label.label", null, "Last name"),
                M.m("input.input[type=text][placeholder=Last name]", new HandlerBuilder()
                    .Add<UIEvent<HTMLInputElement>>("oninput", (UIEvent<HTMLInputElement> evt) => { UserModel.Current.LastName = evt.CurrentTarget.Value; })
                    .Add("value", user.LastName)
                    .Build(), null),
                M.m("button.button[type=submit]", null, "Save")
                );
        }
    }
}
