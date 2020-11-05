using Bridge;
namespace SimpleApplication
{
    [ObjectLiteral]
    [Convention(Notation =Notation.CamelCase)]
    public class UserFormAttributes
    {
        public long Id { get; set; }
    }
}