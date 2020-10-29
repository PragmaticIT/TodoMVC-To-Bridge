using Bridge;

namespace PragmaticIt.BridgeNet.MithrilBridge
{
    /// <summary>
    /// Marker interface for component state. Component need to implement 
    /// the state properties. This is shared to Vnode. Please inherit for component implementation 
    /// </summary>
    //[External]
    [IgnoreCast]
    [IgnoreGeneric]
    [Convention(Notation = Notation.CamelCase)]
    public interface IMithrilComponent { }
}
