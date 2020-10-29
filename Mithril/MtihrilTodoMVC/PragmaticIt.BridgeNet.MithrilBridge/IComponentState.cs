using Bridge;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    // [External]
    [IgnoreCast]
    [IgnoreGeneric]
    [Convention(Notation = Notation.CamelCase)]
    public interface IComponentState<TState> : IMithrilComponent where TState : IComponentState<TState>
    {
    }
}
