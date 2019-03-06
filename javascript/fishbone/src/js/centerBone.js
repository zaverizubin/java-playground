function CenterBone (canvas) {
    
    BaseBone.call(this, canvas);
        
    this.spacerH = 20;
    
    this.vertexWidth = 150;
    
    this.vertexHeight = 50;
    
    this.vertexX = 150;
    
    this.vertexY = (this.canvasHeight/2) - (this.vertexHeight/2);
    
    this.edgeX = 50;
    
    this.edgeY = (this.canvasHeight/2);
    
    
    this.init = function () {
        BaseBone.prototype.init.call(this);
        
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
        this.vertex = this.graph.insertVertex(this.graphParent, null,
                                            {
                                                toString:function(){return 'Main Cause'},
                                                cellType:Constants.CENTERBONE_VERTEX 
                                            },
                                            this.vertexX, this.vertexY, 
                                            this.vertexWidth, this.vertexHeight, 
                                            Constants.CENTERBONE_VERTEX_STYLE);
    };
    
    this.buildEdge = function(){
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(this.edgeX, this.edgeY);
        var cell = new mxCell('', geometry, Constants.CENTERBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.target = this.vertex;
        cell.value = {toString:function(){return ''},cellType:Constants.CENTERBONE_EDGE};
        this.edge = cell;
        this.graph.addCell(cell);
    };
    
    this.addChildBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildChildBone();
            this.moveVertex();
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteChildBones = function(){
        var selectedChildBones = this.getSelectedChildBones();
        
        if(selectedChildBones.length === 0){
            Utils.showAlertDialog(Messages.DELETE_SELECT_SINGLE_SHAPE);
            return;
        };
        
        this.graph.getModel().beginUpdate();
        try
        {   
            for(var i = 0; i<selectedChildBones.length; i++){
                selectedChildBones[i].delete();
                Utils.removeFromArray(this.childBones, selectedChildBones[i]);
            };
            this.compactChildBones();
            this.moveVertex();
            this.sortBones(this.childBones);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.buildChildBone = function(){
        var childBone = new SideBone(this.canvas);
        childBone.init(this);
        this.childBones.push(childBone);
    };
    
    this.getSelectedChildBones = function(){
        var selectedBones = [];
        this.childBones.forEach(function(childBone) {
            if(childBone.isSelected()){
                selectedBones.push(childBone);
            }
        });
        return selectedBones;
    };
  
    this.compactChildBones = function(){
        var topSideBones = this.getTopChildBones();
        var bottomSideBones = this.getBottomChildBones();
        this.sortBones(topSideBones);
        this.sortBones(bottomSideBones);
        
        var id=1;
        for(var i=0; i<topSideBones.length ; i++){
            while(topSideBones[i].getVertex().getValue().id > id){
                for(var j=i; j<topSideBones.length ; j++){
                    topSideBones[j].moveBoneByUnitPosition();
                }
            }
            id += 2;
        };
        
        var id=2;
        for(var i=0; i<bottomSideBones.length ; i++){
            while(bottomSideBones[i].getVertex().getValue().id > id){
                for(var j=i; j<bottomSideBones.length ; j++){
                    bottomSideBones[j].moveBoneByUnitPosition();
                }
            }
            id += 2;
        }
        
    };
    
    this.getTopChildBones = function(){
        var topChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(childBone.isAboveCenterBone()){
                topChildBones.push(childBone); 
            };
        });
        return topChildBones;
    };
    
    this.getBottomChildBones = function(){
        var bottomChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(!childBone.isAboveCenterBone()){
                bottomChildBones.push(childBone); 
            };
        });
        return bottomChildBones;
    };
    
    this.moveVertex = function (){
        var topSideBonesCount = this.getTopChildBones().length;
        var bottomSideBonesCount = this.getBottomChildBones().length;
        var maxSideBonesCount = Math.max(topSideBonesCount, bottomSideBonesCount);
        
        var geometry = new mxGeometry(this.vertexX + maxSideBonesCount * (this.spacerH + this.vertexWidth),
                                      this.vertexY,
                                      this.vertex.getGeometry().width, 
                                      this.vertex.getGeometry().height);
       
        this.graph.getModel().setGeometry(this.vertex, geometry);
    };
    
    this.flipChildBone = function (){
        var cells = this.graph.getSelectionCells();
        if(!this.canFlipChildBone(cells)) return;
        
        this.graph.getModel().beginUpdate();
        try
        {
            var boneToFlip = this.getChildBoneFromCell(cells[0]); 
            if(boneToFlip !== null){
                boneToFlip.flipBone();
                this.compactChildBones();
                this.moveVertex();
                this.sortBones(this.childBones);
                this.graph.removeSelectionCells(cells);
            };
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.swapChildBones = function(){
        var cells = this.graph.getSelectionCells();
        if(!this.canSwapChildBones(cells)) return;
        
        this.graph.getModel().beginUpdate();
        try
        {
            var childBoneToSwap1 = this.getChildBoneFromCell(cells[0]); 
            var childBoneToSwap2 = this.getChildBoneFromCell(cells[1]); 
            if(childBoneToSwap1 !== null && childBoneToSwap2 !== null){
                childBoneToSwap1.swapBones(childBoneToSwap2);
            };
            this.graph.removeSelectionCells(cells);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
        
    };
    
    this.canFlipChildBone = function(cells){
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
    
    this.canSwapChildBones = function(cells){
        if(cells.length !== 2 ){
            Utils.showAlertDialog(Messages.VERTEX_SWAP_SELECT_SHAPE);
            return false;
        };
        cells.forEach(function(cell){
            if(cell.isEdge() || cell.getValue().cellType === Constants.CENTERBONE_VERTEX){
               Utils.showAlertDialog(Messages.VERTEX_SWAP_SELECT_SHAPE); 
               return false;
            }
        });
        
        return true;
    };
    
    

}

CenterBone.prototype = Object.create(BaseBone.prototype);