function CenterBone (canvas) {
    
    BaseBone.call(this, canvas);
        
    this.spacerH = 20;
    
    this.spacerV = 250;
    
    this.vertexInitialX = 150;
    
    this.vertexInitialY;
    
    this.vertexIncrementX = this.spacerH + this.vertexWidth;
    
    this.edgeInitialX = 50;
    
    this.edgeInitialY;
    
    
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
    
    this.addSideBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildSideBone();
            this.moveVertex();
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteSideBone = function(){
        var selectedSideBones = this.getSelectedSideBones();
        
        if(selectedSideBones.length === 0){
            Utils.showAlertDialog(Messages.DELETE_SELECT_SINGLE_SHAPE);
            return;
        };
        
        this.graph.getModel().beginUpdate();
        try
        {   
            for(var i=0;i<selectedSideBones.length;i++){
                selectedSideBones[i].delete();
                Utils.removeFromArray(this.childBones, selectedSideBones[i]);
                this.moveSideBonesOnDelete(selectedSideBones[i]);
                this.moveVertex();
                this.sortChildBones();
            }
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
        
    this.buildSideBone = function(){
        var coordinates = this.getLocationForNewSideBone();
        var sideBone = new SideBone(this.canvas);
        sideBone.init(coordinates.id, coordinates.x, coordinates.y, this.edge);
        this.childBones.push(sideBone);
    };
    
    this.getLocationForNewSideBone = function(){
        var coordinates = {id:0,x:0,y:0};
        var topSideBonesCount = this.getCountOfTopSideBones();
        var bottomSideBonesCount = this.getCountOfBottomSideBones();
        
        if(topSideBonesCount <= bottomSideBonesCount){
            coordinates.id = 1 + topSideBonesCount*2;
            coordinates.x = this.edgeInitialX + topSideBonesCount * this.vertexIncrementX;
            coordinates.y = this.edgeInitialY - this.spacerV;
        }else if(bottomSideBonesCount < topSideBonesCount){
            coordinates.id = 2 + bottomSideBonesCount*2; 
            coordinates.x = this.edgeInitialX + bottomSideBonesCount * this.vertexIncrementX;
            coordinates.y = this.edgeInitialY + this.spacerV - this.vertexHeight;
        };
        return coordinates;
    };
    
    this.getSelectedSideBones = function(){
        var selectedBones = [];
        this.childBones.forEach(function(sideBone) {
            if(sideBone.isSelected()){
                selectedBones.push(sideBone);
            }
        });
        
        return selectedBones;
    };
    
    this.moveSideBonesOnDelete = function(deletedSideBone){
        var dx = this.vertexIncrementX;
        this.childBones.forEach(function(sideBone) {
            if(deletedSideBone.isAboveCenterBone()){
                if(sideBone.isAboveCenterBone() && sideBone.isRightOfBone(deletedSideBone)){
                    sideBone.moveToLeft(dx);
                }
            }else{
                if(!sideBone.isAboveCenterBone() && sideBone.isRightOfBone(deletedSideBone)){
                    sideBone.moveToLeft(dx);
                }
            };
        });
    };
    
    this.getCountOfTopSideBones = function(){
        var bones =0;
        this.childBones.forEach(function(sideBone) {
            if(sideBone.isAboveCenterBone()){
                bones += 1; 
            };
        });
        return bones;
    };
    
    this.getCountOfBottomSideBones = function(){
        var bones =0;
        this.childBones.forEach(function(sideBone) {
            if(!sideBone.isAboveCenterBone()){
                bones += 1; 
            }
        });
        return bones;
    };
    
    this.moveVertex = function (){
        var topSideBones = this.getCountOfTopSideBones(true);
        var bottomSideBones = this.getCountOfBottomSideBones(true);
        var maxSideBones = Math.max(topSideBones, bottomSideBones);
        
        var geometry = new mxGeometry(this.vertexInitialX + (maxSideBones)*this.vertexIncrementX,
                                      this.vertexInitialY,
                                      this.vertex.getGeometry().width, 
                                      this.vertex.getGeometry().height);
       
        this.graph.getModel().setGeometry(this.vertex, geometry);
    };
    
    this.flipSelectedBone = function (cells){
        if(!this.canFlipBone(cells)) return;
        
        this.graph.getModel().beginUpdate();
        try
        {
            var cell = cells[0]; 
            for(var i = 0; i < this.childBones.length; i++) {
                if(this.childBones[i].getVertex() === cell){
                    this.childBones[i].flipBone();
                    this.moveSideBonesOnDelete(this.childBones[i]);
                    this.moveVertex();
                    this.sortChildBones();
                    break;
                };
            };
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.canFlipBone = function(cells){
        if(cells.length !== 1 || cells[0].getValue().cellType !== Constants.SIDEBONE_VERTEX){
            Utils.showAlertDialog(Messages.VERTEX_FLIP_SELECT_SHAPE);
            return false;
        };
        
        var cell = cells[0]; 
        if(cell.getValue().cellType ===  Constants.SIDEBONE_VERTEX){
            for(var i = 0; i < this.childBones.length; i++) {
                var childbone = this.childBones[i];
                if(childbone.getVertex() !== cell){
                    if(childbone.isAboveCenterBone() && childbone.getVertex().getValue().id === cell.getValue().id - 1){
                        Utils.showAlertDialog(Messages.VERTEX_FLIP_SHAPE_EXISTS);
                        return false;
                    }else if(!childbone.isAboveCenterBone() && childbone.getVertex().getValue().id === cell.getValue().id + 1){
                        Utils.showAlertDialog(Messages.VERTEX_FLIP_SHAPE_EXISTS);
                        return false;
                    };
                };
            };
        };
        return true;
    };
    
    
    this.getVertex = function(){
       return this.vertex;
    };

}

CenterBone.prototype = Object.create(BaseBone.prototype);