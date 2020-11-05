using PragmaticIt.BridgeNet.MithrilBridge;
using System;
using System.Collections.Generic;

namespace SimpleApplication
{
    public static class UserModel
    {
        private static List<User> _list = new List<User>();
        public static List<User> List { get { return _list; } set { _list = value; } }

        public static void LoadList()
        {
            var promise = M.Request(new RequestOptionsBuilder()
                .WithMethod("GET")
                .WithUrl("https://rem-rest-api.herokuapp.com/api/users")
                .WithCredentials(true)
                .Build());
            promise.Then<UsersDto>((usersDto) => { UserModel.List = new List<User>(usersDto.Data); });
        }


        public static User Current { get; set; }
        public static void Load(long id)
        {
            var promise = M.Request(new RequestOptionsBuilder()
                .WithMethod("GET")
                .WithUrl("https://rem-rest-api.herokuapp.com/api/users/" + id)
                .WithCredentials(true)
                .Build());
            promise.Then<User>(user => { UserModel.Current = user; });
        }
        public static MithrilPromise Save()
        {
            var promise= M.Request(new RequestOptionsBuilder()
                .WithMethod("PUT")
                .WithUrl("https://rem-rest-api.herokuapp.com/api/users/" + UserModel.Current.Id)
                .WithBody(UserModel.Current)
                .WithCredentials(true)
                .Build());
            return promise.Then(() => { Current = null; });
        }

    }
}
