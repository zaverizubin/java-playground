function LateralBone (canvas) {
   
    BaseBone.call(this, canvas);
   
    this.spacerH = 70; //The initial length of this bone.
    
    this.boneSegmentLength = 100; //Increment distance by which the this bone grows or shrinks.
    
    this.edgeX;
   
    this.edgeY;
    
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
        this.buildEdge(id);
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildEdge = function(id){
        var counter  = this.parentBone.getChildBones().length + 1;
        
        var valueObject =   {
                                toString:function(){return 'Detail-' + counter;},
                                cellType:Constants.LATERALBONE_EDGE,
                                id:id
                            };
                            
        var geometry = new mxGeometry();
        
        geometry.sourcePoint = new mxPoint(0, 0);
        geometry.targetPoint = new mxPoint(0, 0);
        
        var cell = new mxCell(valueObject, geometry, Constants.STYLE_MAP.get(Constants.LATERALBONE_EDGE));
        cell.geometry.relative = true;
        cell.edge = true;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
        
        
    };
   
    this.addChildBone = function(){
        
    };
    
    this.deleteSelectedChildBones = function(){
        var childBonesToDelete = this.getSelectedChildBones();
        if(childBonesToDelete.length === 0){
            Utils.showMessageDialog(Messages.SELECT_ONE_OR_MORE_SHAPE);
            return;
        };
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
        
    };
    
    this.getSelectedChildBones = function(){
        
    };
    
    this.compactChildBones = function(){
        
    };
    
    this.getTopChildBones = function(){
        var topChildBones = [];
        return topChildBones;
    };
    
    this.getBottomChildBones = function(){
        var bottomChildBones = [];
        return bottomChildBones;
    };
    
    this.getChildBonesCount = function(){
        
    };
    
    this.getMaxOfChildBoneCount = function(){
        var topChildBonesCount = this.getTopChildBones().length;
        var bottomChildBonesCount = this.getBottomChildBones().length;
        return Math.max(topChildBonesCount, bottomChildBonesCount);
    };
    
    this.positionBone = function (){
        
        var geometry = new mxGeometry();
        
        var sourceX =  this.parentBone.getEdge().getGeometry().targetPoint.x 
                        - Math.ceil((this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2))/ Math.tan(this.parentBone.edgeTheta));
        
        var sourceY = (this.parentBone.getId() % 2 !== 0)
                    ? this.parentBone.getEdge().getGeometry().targetPoint.y 
                         - (this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2))
                    : this.parentBone.getEdge().getGeometry().targetPoint.y 
                         + (this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2));
                        
        geometry.sourcePoint = new mxPoint(sourceX, sourceY);
        
        
        var targetX = (this.getId() % 2 !== 0)
                    ? geometry.sourcePoint.x - this.spacerH - this.getMaxOfChildBoneCount() * this.boneSegmentLength
                    : geometry.sourcePoint.x + this.spacerH + this.getMaxOfChildBoneCount() * this.boneSegmentLength;
        var targetY =  geometry.sourcePoint.y;
        
        geometry.targetPoint = new mxPoint(targetX, targetY);
        
        this.graph.getModel().setGeometry(this.edge, geometry);
    };
    
    this.flipChildBone = function (){
        
    };
    
    this.swapChildBones = function(){
        
    };
    
    this.canFlipChildBone = function(cells){
        
    };
    
    this.canSwapChildBones = function(cells){
        
    };
    
    this.delete = function(){
       this.deleteAllChildBones();
       this.graph.removeCells([this.edge]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.edge);
    };
   
    this.isLeftOfParentBone = function(){
       return this.edge.getValue().id %2 !== 0;
    };
   
    this.isAboveSiblingBone = function(lateralBone){
        return this.edge.getValue().id > lateralBone.getEdge().getValue().id;
    };
   
    this.moveBoneByUnitPosition = function(dy){
       this.graph.moveCells([this.edge], Math.ceil(dy/Math.tan(this.parentBone.edgeTheta)), dy);
        this.vertex.getValue().id = dy < 0? this.vertex.getValue().id-2 : this.vertex.getValue().id+2;
    };
   
    this.flipBone = function(){
       
        
    };
   
    this.swapBones = function(boneToSwap){
        
        
    };
   
    this.getVertex = function(){
        return this.vertex;
    };
   
    this.getEdge = function(){
        return this.edge;
    };
}

LateralBone.prototype = Object.create(BaseBone.prototype);

