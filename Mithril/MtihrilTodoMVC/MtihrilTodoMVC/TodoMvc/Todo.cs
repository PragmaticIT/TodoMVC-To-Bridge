using Bridge;
using PragmaticIt.BridgeNet.MithrilBridge;

namespace PragmaticIt.MtihrilTodoMVC.TodoMvc
{
    [Convention(Notation = Notation.CamelCase)]
    //[IgnoreCast]
    //[Namespace(false)]
    public class Todo:IMithrilComponent
    {
        public string Title { get; set; }
        public bool Completed { get; set; }
    }
}
