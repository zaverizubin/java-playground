function CenterBone (graph) {
 
    this.graph = graph;
    
    this.vertex;
    
    this.edge;
    
    this.parent = this.graph.getDefaultParent();
    
    this.sideBones = [];
    
    this.canvasWidth;
    
    this.canvasHeight;
    
    this.spacerH = 20;
    
    this.spacerV = 250;
    
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
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.edge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    
    this.buildBone = function(){
        this.buildVertex();
        this.buildEdge();
    };
    
    this.buildVertex = function(){
        this.vertex = this.graph.insertVertex(this.parent, null, 'Hello World!', 
                                                    this.vertexInitialX, this.vertexInitialY, 
                                                    this.vertexWidth, this.vertexHeight, 
                                                    Constants.VERTEX_STYLE);
    };
    
    this.buildEdge = function(){
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(this.edgeInitialX, this.edgeInitialY)
        var cell = new mxCell('', geometry, Constants.CENTERBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.target = this.vertex;
        this.edge = cell;
        this.graph.addCell(cell);
    }
    
    this.moveVertexToRight = function (){
        this.graph.resizeCell(this.vertex, new mxRectangle(this.vertex.geometry.x + this.vertexIncrementX,
                                                    this.vertex.geometry.y,
                                                    this.vertex.geometry.width,
                                                    this.vertex.geometry.height));
    };
    
    this.moveVertexToLeft = function (){
        this.graph.resizeCell(this.vertex, new mxRectangle(this.vertex.geometry.x - this.vertexIncrementX,
                                                       this. vertex.geometry.y,
                                                        this.vertex.geometry.width,
                                                        this.vertex.geometry.height));
    };
    
    this.addLateralBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildLateralBone();
            if(this.sideBones.length > 2 && this.sideBones.length % 2 !== 0){
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
        x = (this.sideBones.length % 2 === 0)? 
                    this.edgeInitialX + (this.sideBones.length/2)*(this.vertexWidth +  this.spacerH)
                    : this.sideBones[this.sideBones.length-1].getVertex().getGeometry().x;
        
        y = (this.sideBones.length % 2 === 0)?
            this.edgeInitialY - this.spacerV - this.vertexHeight/2
            : this.edgeInitialY + this.spacerV - this.vertexHeight/2;
        
        var sideBone = new SideBone(this.graph);
        var id = this.sideBones.length+1;
        sideBone.init(id, x, y, this.edge);
        this.sideBones.push(sideBone);
    };
}
