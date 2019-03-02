function CenterBone (canvas) {
    
    BaseBone.call(this, canvas);
        
    this.spacerH = 20;
    
    this.spacerV = 250;
    
    this.vertexInitialX = 150;
    
    this.vertexInitialY;
    
    this.vertexIncrementX = this.spacerH + this.vertexWidth;
    
    this.edgeInitialX = 50;
    
    this.edgeInitialY;
    
    this.vertextMoveCount = 0;
    
    this.init = function () {
        BaseBone.prototype.init.call(this);
        
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
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
    
    this.buildVertex = function(){
        this.vertex = this.graph.insertVertex(this.parent, null,
                                            {toString:function(){return 'Main Cause'},cellType:Constants.CENTERBONE_VERTEX}, 
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
        cell.value = {toString:function(){return ''},cellType:Constants.CENTERBONE_EDGE};
        this.edge = cell;
        this.graph.addCell(cell);
    };
    
    this.moveVertex = function (moveToRight){
        this.vertextMoveCount = moveToRight? this.vertextMoveCount + 1 : this.vertextMoveCount-1;
        moveToRight ?  this.graph.moveCells([this.vertex], this.vertexIncrementX, 0):
                this.graph.moveCells([this.vertex], -this.vertexIncrementX, 0);
    };
    
    this.addSideBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildSideBone();
            if(this.childBones.length % 2 !== 0){
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
            Utils.removeFromArray(this.childBones, selectedSideBone);
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
        x = (this.childBones.length % 2 === 0)? 
                    this.edgeInitialX + (this.childBones.length/2)*(this.vertexIncrementX)
                    : this.edgeInitialX + ((this.childBones.length-1)/2)*(this.vertexIncrementX);
        
        y = (this.childBones.length % 2 === 0)?
            this.edgeInitialY - this.spacerV - this.vertexHeight/2
            : this.edgeInitialY + this.spacerV - this.vertexHeight/2;
        
        var sideBone = new SideBone(this.canvas);
        var id = this.childBones.length+1;
        sideBone.init(id, x, y, this.edge);
        this.childBones.push(sideBone);
    };
    
    this.getSelectedSideBone = function(){
        var selectedBones = [];
        this.childBones.forEach(function(sideBone) {
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
        this.childBones.forEach(function(sideBone) {
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
        this.childBones.forEach(function(sideBone) {
             if(sideBone.isAboveCenterBone()){
                topBones += 1; 
             }else{
                bottomBones +=1; 
             }
        });
        
        var maxBones =  topBones > bottomBones ? topBones : bottomBones;
        return maxBones < this.vertextMoveCount;
        
    };
    
    this.getVertex = function(){
       return this.vertex;
    };
};

CenterBone.prototype = Object.create(BaseBone.prototype);