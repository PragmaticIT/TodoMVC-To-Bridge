using Bridge;

namespace PragmaticIt.MtihrilTodoMVC.TodoMvc
{
    [Convention(Notation = Notation.CamelCase)]
   // [Namespace(false)]
    public class TodoAttrs
    {
        public string Status { get; set; }
    }
}
