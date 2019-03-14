function SideBone (canvas) {
   
    BaseBone.call(this, canvas);
    
    //The initial length of this bone.
    this.spacerV = function(){ return GraphSettings.SIDEBONE_SPACER_V;}; 
    
    //Increment distance by which the this bone grows or shrinks.
    this.boneSegmentLength = function(){ return GraphSettings.SIDEBONE_SEGMENT_LENGTH;}; 
    
    this.vertexWidth = function(){ return GraphSettings.SIDEBONE_VERTEX_WIDTH;};
    
    this.vertexHeight = function(){ return GraphSettings.SIDEBONE_VERTEX_HEIGHT;};
   
    this.edgeTheta = function(){ return GraphSettings.THETA * Math.PI/180;};
   
    this.init = function (parentBone, id) {
        BaseBone.prototype.init.call(this, parentBone);
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone(id);
            this.positionBone();
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };

    this.buildBone = function (id){
        this.buildVertex(id);
        this.buildEdge();
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildVertex = function(id){
        var counter  = this.parentBone.getChildBones().length + 1;
        var valueObject =   {
                                toString:function(){return 'Cause-' + counter;},
                                cellType:GraphSettings.SIDEBONE_VERTEX,
                                bone:this,
                                id:id
                            };
                
        this.vertex = this.graph.insertVertex(this.graphParent, null, 
                                            valueObject,
                                            0, 
                                            0,
                                            this.vertexWidth(),
                                            this.vertexHeight(),
                                            GraphSettings.STYLE_MAP.get(GraphSettings.SIDEBONE_VERTEX));
    };
   
    this.buildEdge = function(){
        var valueObject =   {
                                toString:function(){return ''},
                                cellType:GraphSettings.SIDEBONE_EDGE
                            };
      
        var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(0, 0);
       
        var cell = new mxCell(valueObject, geometry, GraphSettings.STYLE_MAP.get(GraphSettings.SIDEBONE_EDGE));
        cell.edge = true;
        cell.source = this.vertex;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
    };
   
    this.addChildBone = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildChildBone();
            this.positionBone();
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteSelectedChildBones = function(){
        var childBonesToDelete = this.getSelectedChildBones();
        
        this.graph.getModel().beginUpdate();
        try
        {   
            this.deleteChildBones(childBonesToDelete);
            this.compactChildBones();
            this.positionBone();
            this.sortBones(this.childBones);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteAllChildBones = function(){
        var childBonesToDelete = this.getChildBones();
        this.graph.getModel().beginUpdate();
        try
        {   
            this.deleteChildBones(childBonesToDelete);
            this.positionBone();
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.deleteChildBones = function(childBonesToDelete){
        for(var i = childBonesToDelete.length-1; i>=0; i--){
            childBonesToDelete[i].delete();
            Utils.removeFromArray(this.childBones, childBonesToDelete[i]);
        };
    };
   
    this.buildChildBone = function(){
        var childBone = new LateralBone(this.canvas);
        childBone.init(this, this.getNextChildId());
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
        var leftSideBones = this.getLeftChildBones();
        var rightSideBones = this.getRightChildBones();
        this.sortBones(leftSideBones);
        this.sortBones(rightSideBones);
        
        var dx = Math.ceil(this.boneSegmentLength()/Math.tan(this.edgeTheta()));
        var dy = this.isAboveParentBone()? this.boneSegmentLength() : - this.boneSegmentLength();
                
        var id=1;
        for(var i=0; i<leftSideBones.length ; i++){
            while(leftSideBones[i].getId() > id){
                for(var j=i; j<leftSideBones.length ; j++){
                    leftSideBones[j].moveBoneOnCompact(dx, dy);
                }
            }
            id += 2;
        };
        
        var id=2;
        for(var i=0; i<rightSideBones.length ; i++){
            while(rightSideBones[i].getId() > id){
                for(var j=i; j<rightSideBones.length ; j++){
                    rightSideBones[j].moveBoneOnCompact(dx, dy);
                }
            }
            id += 2;
        }        
    };
    
    this.getLeftChildBones = function(){
        var leftChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(childBone.isLeftOfParentBone()){
                leftChildBones.push(childBone); 
            };
        });
        return leftChildBones;
    };
    
    this.getRightChildBones = function(){
        var rightChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(!childBone.isLeftOfParentBone()){
                rightChildBones.push(childBone); 
            };
        });
        return rightChildBones;
    };
    
    this.getChildBonesCount = function(){
        var leftChildBonesCount = this.getLeftChildBones().length;
        var rightChildBonesCount = this.getRightChildBones().length;
        return leftChildBonesCount + rightChildBonesCount;
    };
    
    this.getMaxOfChildBoneCount = function(){
        var leftChildBonesCount = this.getLeftChildBones().length;
        var rightChildBonesCount = this.getRightChildBones().length;
        return Math.max(leftChildBonesCount, rightChildBonesCount);
    };
    
    this.positionBone = function (){
        var maxChildBonesCount = this.getMaxOfChildBoneCount();
        
        var xLoc =  this.parentBone.getEdge().getGeometry().sourcePoint.x +
                    this.parentBone.boneSegmentLength() * Math.ceil(this.getId()/2);
            
        var yLoc = this.parentBone.getEdge().getGeometry().sourcePoint.y;
        
        var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(xLoc, yLoc);
        this.graph.getModel().setGeometry(this.edge, geometry);
       
        
        var xLoc = this.getEdge().getGeometry().targetPoint.x 
                   - Math.floor((maxChildBonesCount * this.boneSegmentLength()) + this.spacerV() + this.vertexHeight()/2) / Math.tan(this.edgeTheta()) 
                   - this.vertexWidth()/2;
        var yLoc = (this.getId() % 2 !==0) 
                    ? this.getEdge().getGeometry().targetPoint.y  - (maxChildBonesCount * this.boneSegmentLength()) - this.spacerV() - this.vertexHeight() 
                    : this.getEdge().getGeometry().targetPoint.y  + (maxChildBonesCount * this.boneSegmentLength()) + this.spacerV();
        
        
        var geometry = new mxGeometry(xLoc, yLoc, this.vertex.getGeometry().width, this.vertex.getGeometry().height);
        this.graph.getModel().setGeometry(this.vertex, geometry);
        
    };
    
    this.flipChildBone = function (){
        var cell = this.graph.getSelectionCells()[0];
        if(!this.canFlipChildBone(cell)) return;
        
        this.graph.getModel().beginUpdate();
        try
        {
            var boneToFlip = this.getChildBoneFromCell(cell); 
            if(boneToFlip !== null){
                boneToFlip.flipBone();
                this.compactChildBones();
                this.positionBone();
                this.sortBones(this.childBones);
                this.graph.removeSelectionCells(cell);
            };
        }
        finally
        {
           this.graph.getModel().endUpdate();
        };
    };
    
    this.swapChildBones = function(){
        var cells = this.graph.getSelectionCells();
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
    
    this.canFlipChildBone = function(cell){
        for(var i = 0; i < this.childBones.length; i++)
        {
            var childbone = this.childBones[i];
            if(childbone.getVertex() !== cell){
                if(childbone.isLeftOfParentBone() && childbone.getId() === cell.getValue().id - 1){
                    Utils.showMessageDialog(Messages.FLIP_POSITION_NOT_EMPTY);
                    return false;
                }else if(!childbone.isLeftOfParentBone() && childbone.getId() === cell.getValue().id + 1){
                    Utils.showMessageDialog(Messages.FLIP_POSITION_NOT_EMPTY);
                    return false;
                };
            };
        };
        return true;
    };
    
    this.delete = function(){
       this.deleteAllChildBones(); 
       this.graph.removeCells([this.vertex]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.vertex);
    };
   
    this.isAboveParentBone = function(){
       return this.getId() %2 !== 0;
    };
   
    this.isRightOfSiblingBone = function(sideBone){
        return this.getId() > sideBone.getId();
    };
   
    this.moveBoneOnCompact = function(dx, dy){
       this.recursivelyMoveBones(this, dx, dy);
       this.setId(this.getId() - 2);
    };
    
    this.moveBoneByPosition = function(dx, dy){
        this.graph.moveCells([this.vertex, this.edge], dx, dy);
    };
   
    this.flipBone = function(){
        this.setId(this.getId() %2 !== 0 ? this.getId()+1 : this.getId()-1);
        this.recursivelyPositionBones(this);
    };
   
    this.swapBones = function(boneToSwap){
        var id1 = this.getId();
        var id2 = boneToSwap.getId();
       
        this.setId(id2);
        boneToSwap.setId(id1);
        
        this.recursivelyPositionBones(this);
        this.recursivelyPositionBones(boneToSwap);
    };
   
    
    
}

SideBone.prototype = Object.create(BaseBone.prototype);

