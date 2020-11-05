using Bridge;

namespace SimpleApplication
{

    [Convention(Notation = Notation.CamelCase)]
    [ObjectLiteral]
    public class User
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    [Convention(Notation = Notation.CamelCase)]
    [ObjectLiteral]
    public class UsersDto {
        public User[] Data { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public int Total { get; set; }
    }
}
