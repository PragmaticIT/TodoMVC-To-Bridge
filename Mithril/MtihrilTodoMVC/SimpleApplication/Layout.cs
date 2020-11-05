using PragmaticIt.BridgeNet.MithrilBridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SimpleApplication
{
    public class Layout : MithrilComponentBase
    {
        public override object ViewHandler(Vnode vnode)
        {
            return M.m("main.layout", null,
                M.m("nav.menu", null,
                    M.m(M.Route.Link(), new { href = "/list" }, "Users")
                    ),
                M.m("section", null, vnode.Children)
                );
        }
    }
}
