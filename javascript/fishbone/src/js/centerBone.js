function CenterBone (graph) {
 
    this.graph = graph;
    
    this.mainVertex;
    
    this.mainEdge;
    
    this.parent = this.graph.getDefaultParent();
    
    this.lateralBones = [];
    
    this.canvasWidth;
    
    this.canvasHeight;
    
    this.spacerH = 20;
    
    this.spacerV = 150;
    
    this.vertexWidth = 150;
    
    this.vertexHeight = 50;
    
    this.vertexInitialX = 300;
    
    this.vertexInitialY;
    
    this.vertexIncrementX = this.spacerH + this.vertexWidth;
    
    this.edgeInitialX = 50;
    
    this.edgeInitialY;
    
    
    this.init = function (canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        this.vertexInitialY = (this.canvasHeight/2) - (this.vertexHeight/2);
        this.edgeInitialY = (this.canvasHeight/2);
        
        new mxRubberband(this.graph);
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone();
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    
    this.buildBone = function(){
        this.mainVertex = this.graph.insertVertex(this.parent, null, 'Hello World!', 
                                                    this.vertexInitialX, this.vertexInitialY, this.vertexWidth, this.vertexHeight);
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(this.edgeInitialX, this.edgeInitialY)
        this.mainEdge = new mxCell('', geometry, 'curved=1;endArrow=classic;html=1;strokeWidth=3');
        this.mainEdge.geometry.relative = true;
        this.mainEdge.edge = true;
        this.mainEdge.target = this.mainVertex;
        this.graph.addCell(this.mainEdge);
    }
    
    this.moveVertexToRight = function (){
        this.graph.resizeCell(this.mainVertex, new mxRectangle(this.mainVertex.geometry.x + this.vertexIncrementX,
                                                    this.mainVertex.geometry.y,
                                                    this.mainVertex.geometry.width,
                                                    this.mainVertex.geometry.height));
    };
    
    this.moveVertexToLeft = function (){
        this.graph.resizeCell(this.mainVertex, new mxRectangle(this.mainVertex.geometry.x - this.vertexIncrementX,
                                                       this. mainVertex.geometry.y,
                                                        this.mainVertex.geometry.width,
                                                        this.mainVertex.geometry.height));
    };
    
    this.addLateralBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildLateralBone();
            if(this.lateralBones.length > 2 && this.lateralBones.length % 2 !== 0){
                this.moveVertexToRight();	
            }
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.removeLateralBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.moveVertexToLeft();
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.buildLateralBone = function(){
        var x; var y;
        x = (this.lateralBones.length % 2 === 0)? 
                    this.edgeInitialX + (this.lateralBones.length/2)*(this.vertexWidth +  this.spacerH)
                    : this.lateralBones[this.lateralBones.length-1].getVertex().getGeometry().x;
        
        y = (this.lateralBones.length % 2 === 0)?
            this.edgeInitialY - this.spacerV - this.vertexHeight/2
            : this.edgeInitialY + this.spacerV - this.vertexHeight/2
        
        var lateralBone = new LateralBone(this.graph);
        var id = this.lateralBones.length+1;
        lateralBone.init(id, x, y);
        this.lateralBones.push(lateralBone);
    };
}
