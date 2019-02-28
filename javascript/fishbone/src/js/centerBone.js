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
    
    this.vertexInitialX = 150;
    
    this.vertexInitialY;
    
    this.vertexIncrementX = this.spacerH + this.vertexWidth;
    
    this.edgeInitialX = 50;
    
    this.edgeInitialY;
    
    this.vertextMoveCount = 0;
    
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
                                                    Constants.CENTERBONE_VERTEX_STYLE);
    };
    
    this.buildEdge = function(){
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(this.edgeInitialX, this.edgeInitialY);
        var cell = new mxCell('', geometry, Constants.CENTERBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.target = this.vertex;
        this.edge = cell;
        this.graph.addCell(cell);
    };
    
        
    this.moveVertex = function (moveToRight){
        this.vertextMoveCount = moveToRight? this.vertextMoveCount + 1 : this.vertextMoveCount-1;
        moveToRight ?  this.graph.moveCells([this.vertex], this.vertexIncrementX, 0):
                this.graph.moveCells([this.vertex], -this.vertexIncrementX, 0)
    };
    
    this.addSideBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildSideBone();
            if(this.sideBones.length % 2 !== 0){
                this.moveVertex(true);	
            };
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteSideBone = function(){
        var selectedSideBone = this.getSelectedSideBone();
        
        if(selectedSideBone === null){
            return;
        };
        
        this.graph.getModel().beginUpdate();
        try
        {
            selectedSideBone.delete();
            Utils.removeFromArray(this.sideBones, selectedSideBone);
            this.moveSideBones(selectedSideBone);
            if(this.moveVertexRequired()){
                this.moveVertex(false);     
            }
            
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
       
        
    this.buildSideBone = function(){
        var x; var y;
        x = (this.sideBones.length % 2 === 0)? 
                    this.edgeInitialX + (this.sideBones.length/2)*(this.vertexIncrementX)
                    : this.edgeInitialX + ((this.sideBones.length-1)/2)*(this.vertexIncrementX);
        
        y = (this.sideBones.length % 2 === 0)?
            this.edgeInitialY - this.spacerV - this.vertexHeight/2
            : this.edgeInitialY + this.spacerV - this.vertexHeight/2;
        
        var sideBone = new SideBone(this.graph);
        var id = this.sideBones.length+1;
        sideBone.init(id, x, y, this.edge);
        this.sideBones.push(sideBone);
    };
    
    this.getSelectedSideBone = function(){
        var selectedBones = [];
        this.sideBones.forEach(function(sideBone) {
            if(sideBone.isSelected()){
                selectedBones.push(sideBone);
            }
        });
        if(selectedBones.length ===0 || selectedBones.length>1){
            alert(Messages.DELETE_SELECT_SINGLE_SHAPE);
            return null;
        }
        return selectedBones[0];
    };
    
    this.moveSideBones = function(selectedSideBone){
        var dx = this.vertexIncrementX;
        this.sideBones.forEach(function(sideBone) {
            if(selectedSideBone.isAboveCenterBone()){
                if(sideBone.isAboveCenterBone() && sideBone.isRightOfBone(selectedSideBone)){
                    sideBone.moveToLeft(dx);
                }
            }else{
                if(!sideBone.isAboveCenterBone() && sideBone.isRightOfBone(selectedSideBone)){
                    sideBone.moveToLeft(dx);
                }
            }
            
        });
    };
    
    this.moveVertexRequired = function(){
        var topBones = 0; var bottomBones = 0;
        this.sideBones.forEach(function(sideBone) {
             if(sideBone.isAboveCenterBone()){
                topBones += 1; 
             }else{
                bottomBones +=1; 
             }
        });
        
        var maxBones =  topBones > bottomBones ? topBones : bottomBones;
        return maxBones < this.vertextMoveCount;
        
    };
}
