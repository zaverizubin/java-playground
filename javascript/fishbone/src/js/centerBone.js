function CenterBone (graph) {
 
    this.graph = graph;
    
    this.mainVertex;
    
    this.mainEdge;
    
    this.parent = this.graph.getDefaultParent();
    
    this.lateralBones = [];
    
    this.vertexWidth = 80;
    
    this.vertexHeight = 30;
    
    this.vertexInitialX = 300;
    
    this.vertexInitialY = 135;
    
    this.vertexIncrementX = 50;
    
    this.edgeInitialX = 50;
    
    this.edgeInitialY = 50;
    
    this.edgeInitialMirrorY = 250;
    
    this.init = function () {
        new mxRubberband(this.graph);
        this.graph.getModel().beginUpdate();
        try
        {
            this.mainVertex = this.graph.insertVertex(this.parent, null, 'Hello World!', 
                                                    this.vertexInitialX, this.vertexInitialY, this.vertexWidth, this.vertexHeight);
            this.mainEdge = new mxCell('your text', new mxGeometry(150, 150, 100, 0), 'curved=1;endArrow=classic;html=1;');
            this.mainEdge.geometry.setTerminalPoint(new mxPoint(150, 150), true);
            this.mainEdge.geometry.relative = true;
            this.mainEdge.edge = true;
            this.mainEdge.target = this.mainVertex;
            this.graph.addCell(this.mainEdge);
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
        
    this.expandEdge = function (){
        this.graph.resizeCell(mainVertex, new mxRectangle(mainVertex.geometry.x + this.vertexIncrementX,
                                                    mainVertex.geometry.y,
                                                    mainVertex.geometry.width,
                                                    mainVertex.geometry.height));
    };
    
    this.contractEdge = function (){
        this.graph.resizeCell(mainVertex, new mxRectangle(mainVertex.geometry.x - this.vertexIncrementX,
                                                        mainVertex.geometry.y,
                                                        mainVertex.geometry.width,
                                                        mainVertex.geometry.height));
    };
    
    this.addVertex = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.addLateralBone();
            if(this.causeVertices.length > 2 && this.causeVertices.length % 2 !== 0){
                this.expandEdge();	
            }
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteVertex = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.contractEdge();
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.addLateralBone = function(){
        var x; var y;
        if(this.lateralBones.length % 2 === 0){
            x = this.edgeInitialX + (this.lateralBones.length/2)*(this.vertexWidth + 20);
            y = this.edgeInitialY;
        }else{
            x = this.lateralBones[this.lateralBones.length-1].getVertex().getGeometry().x;
            y = this.edgeInitialMirrorY;
        }
        var lateralBone = new LateralBone(this.graph);
        var id = this.lateralBones.length+1;
        lateralBone.addVertex(id, x, y, this.vertexWidth, this.vertexHeight);
        this.lateralBones.push(lateralBone);
    };
}
