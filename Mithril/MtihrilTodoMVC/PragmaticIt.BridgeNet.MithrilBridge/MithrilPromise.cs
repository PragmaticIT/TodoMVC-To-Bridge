using Bridge;
using System;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    [External]
    [Convention(Notation = Notation.CamelCase)]
    public class MithrilPromise
    {
        public static MithrilPromise Resolve(object value) { return null; }
        public static MithrilPromise Reject(object value) { return null; }
        public static MithrilPromise All(params MithrilPromise[] promises) { return null; }
        public static MithrilPromise Race(params MithrilPromise[] promises) { return null; }
        //public MithrilPromise Then<T>(Action<Bridge.Union<T, MithrilPromise>> onFullfilled) { return null; }
        //public MithrilPromise Then<T>(Func<Bridge.Union<T, MithrilPromise>, MithrilPromise> onFullfilled) { return null; }
        //public MithrilPromise Then<T>(Func<T,  onFullfilled) { return null; }
        //public MithrilPromise Then<T>(Bridge.Union<T, MithrilPromise> onFullfilled, Bridge.Union<T, MithrilPromise> onRejected) { return null; }
        //public MithrilPromise Catch(Bridge.Union<T, MithrilPromise> onRejected) { return null; }
        public MithrilPromise Then(Action onFullfilled) { return null; }
        public MithrilPromise Then<T>(Action<T> onFullfilled) { return null; }
    }
}
