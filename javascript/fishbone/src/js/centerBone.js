function CenterBone (canvas) {
    
    BaseBone.call(this, canvas);
        
    this.spacerH = 50; //The initial vertex x position.
    
    this.boneSegmentLength = 175; //Increment distance by which vertext moves subsequently.
        
    this.marginH = 75; //The initial edge x position
    
    this.vertexWidth = 130;
    
    this.vertexHeight = 50;
    
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
        
        var valueObject =   {
                                toString:function(){return 'Main Cause';},
                                cellType:Constants.CENTERBONE_VERTEX 
                            };
                
        this.vertex = this.graph.insertVertex(this.graphParent, null,
                                                valueObject,
                                                this.marginH + this.spacerH,
                                                (this.canvasHeight/2) - (this.vertexHeight/2),
                                                this.vertexWidth, this.vertexHeight, 
                                                Constants.STYLE_MAP.get(Constants.CENTERBONE_VERTEX));
    };
    
    this.buildEdge = function(){
        var valueObject =   {
                                toString:function(){return ''},
                                cellType:Constants.CENTERBONE_EDGE
                            };
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(this.marginH, this.canvasHeight/2);
        
        var cell = new mxCell(valueObject, geometry, Constants.STYLE_MAP.get(Constants.CENTERBONE_EDGE));
        cell.geometry.relative = true;
        cell.edge = true;
        cell.target = this.vertex;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
    };
    
    this.addChildBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildChildBone();
            this.positionVertex();
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteChildBones = function(){
        var selectedChildBones = this.getSelectedChildBones();
        
        if(selectedChildBones.length === 0){
            Utils.showAlertDialog(Messages.SELECT_ONE_OR_MORE_SHAPE);
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
            this.positionVertex();
            this.sortBones(this.childBones);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.buildChildBone = function(){
        var childBone = new SideBone(this.canvas);
        childBone.init(this, this.getNextChildId());
        this.childBones.push(childBone);
    };
    
    this.getNextChildId = function(){
        this.sortBones(this.childBones);
        var id = 1;
        for(var i = 0; i<this.childBones.length; i++){
            if(id < this.childBones[i].getVertex().getValue().id){
                return id;
            }
            id += 1;
        };
        return id;
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
                    topSideBones[j].moveBoneByUnitPosition(- this.boneSegmentLength);
                }
            }
            id += 2;
        };
        
        var id=2;
        for(var i=0; i<bottomSideBones.length ; i++){
            while(bottomSideBones[i].getVertex().getValue().id > id){
                for(var j=i; j<bottomSideBones.length ; j++){
                    bottomSideBones[j].moveBoneByUnitPosition(- this.boneSegmentLength);
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
    
    this.getChildBonesCount = function(){
        var topChildBonesCount = this.getTopChildBones().length;
        var bottomChildBonesCount = this.getBottomChildBones().length;
        return topChildBonesCount + bottomChildBonesCount;
    };
    
    this.positionVertex = function (){
       
        var topChildBonesCount = this.getTopChildBones().length;
        var bottomChildBonesCount = this.getBottomChildBones().length;
        var maxChildBonesCount = Math.max(topChildBonesCount, bottomChildBonesCount);
        
        var geometry = new mxGeometry(this.marginH + this.spacerH + maxChildBonesCount * this.boneSegmentLength,
                                      (this.canvasHeight/2) - (this.vertexHeight/2),
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
                this.positionVertex();
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