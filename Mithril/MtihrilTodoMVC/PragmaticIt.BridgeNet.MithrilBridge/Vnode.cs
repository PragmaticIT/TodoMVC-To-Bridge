using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    public class Vnode
    {
       public HTMLElement Dom { get; }
    }

    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreCast]
    [IgnoreGeneric]
    public class Vnode<TAttrs>:Vnode {
        public TAttrs Attrs{ get; }
    }

    [External]
    [Convention(Notation = Notation.CamelCase)]
    [IgnoreGeneric]
    [IgnoreCast]
    public class Vnode<TState, TAttrs> : Vnode<TAttrs> where TState:IComponentState<TState> {
        public TState State { get; }
    }

}
