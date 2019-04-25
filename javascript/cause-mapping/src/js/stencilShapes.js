class StencilShapes{
    constructor(){
        this.registerShapes();
    };
    
    registerShapes(){
         var req = mxUtils.load(GraphSettings.resourcesRoot() + 'stencils.xml');
        var root = req.getDocumentElement();
        var shape = root.firstChild;
        while (shape !== null)
        {
            if (shape.nodeType === mxConstants.NODETYPE_ELEMENT)
            {
                mxStencilRegistry.addStencil(shape.getAttribute('name'), new mxStencil(shape));
            }
            shape = shape.nextSibling;
        }
    };
}
