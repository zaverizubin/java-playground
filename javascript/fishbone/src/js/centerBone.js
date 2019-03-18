function CenterBone (canvas) {
    
    BaseBone.call(this, canvas);
    
    //The initial edge x position offset from left of canvas
    this.marginH; 
    //The initial edge y position offset from center of canvas
    this.marginV; 
    //The initial length of this bone.
    this.spacerH;
  //Increment distance by which the this bone grows or shrinks.
    this.boneSegmentLength;
    this.vertexWidth;
    this.vertexHeight;
    
    this.init = function () {
        BaseBone.prototype.init.call(this);
        this.applyGraphSettings();
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone();
            this.positionBone();
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
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', 'Main Cause');
        valueObject.setAttribute('cellType', GraphSettings.CENTERBONE_VERTEX);
        valueObject.setAttribute('parentCellId', 0);
        valueObject.setAttribute('cellId', 1);
       
        this.vertex = this.graph.insertVertex(this.graphParent, null,
                                                valueObject,
                                                0,
                                                0,
                                                this.vertexWidth, this.vertexHeight, 
                                                GraphSettings.STYLE_MAP.get(GraphSettings.CENTERBONE_VERTEX));
    };
    
    this.buildEdge = function(){
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', '');
        valueObject.setAttribute('cellType', GraphSettings.CENTERBONE_EDGE);
        valueObject.setAttribute('parentCellId', 0);
        valueObject.setAttribute('cellId', 1);
        
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(0,0);
        
        var cell = new mxCell(valueObject, geometry, GraphSettings.STYLE_MAP.get(GraphSettings.CENTERBONE_EDGE));
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
        var childBone = new SideBone(this.canvas);
        childBone.init(this, this.getNextChildId());
        this.childBones.push(childBone);
    };
    
    this.compactChildBones = function(){
        var topChildBones = this.getTopChildBones();
        var bottomChildBones = this.getBottomChildBones();
        this.sortBones(topChildBones);
        this.sortBones(bottomChildBones);
        
        var id=1;
        for(var i=0; i<topChildBones.length ; i++){
            while(topChildBones[i].getId() > id){
                for(var j=i; j<topChildBones.length ; j++){
                    topChildBones[j].moveBoneOnCompact(- this.boneSegmentLength, 0);
                }
            }
            id += 2;
        };
        
        var id=2;
        for(var i=0; i<bottomChildBones.length ; i++){
            while(bottomChildBones[i].getId() > id){
                for(var j=i; j<bottomChildBones.length ; j++){
                    bottomChildBones[j].moveBoneOnCompact(- this.boneSegmentLength, 0);
                }
            }
            id += 2;
        }
        
    };
    
    this.getTopChildBones = function(){
        var topChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(childBone.isAboveParentBone()){
                topChildBones.push(childBone); 
            };
        });
        return topChildBones;
    };
    
    this.getBottomChildBones = function(){
        var bottomChildBones = [];
        this.childBones.forEach(function(childBone) {
            if(!childBone.isAboveParentBone()){
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
    
    this.positionBone = function (){
       
        var topChildBonesCount = this.getTopChildBones().length;
        var bottomChildBonesCount = this.getBottomChildBones().length;
        var maxChildBonesCount = Math.max(topChildBonesCount, bottomChildBonesCount);
        
        var geometry = new mxGeometry(this.marginH + this.spacerH + maxChildBonesCount * this.boneSegmentLength,
                                      (this.marginV + this.canvasHeight/2) - (this.vertexHeight/2),
                                      this.vertexWidth, 
                                      this.vertexHeight);
        this.graph.getModel().setGeometry(this.vertex, geometry);
        
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(this.marginH, this.marginV + this.canvasHeight/2);
        this.graph.getModel().setGeometry(this.edge, geometry);
        
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
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
                if(childbone.isAboveParentBone() && childbone.getId() === Number(cell.getAttribute('cellId')) - 1){
                    Utils.showMessageDialog(Messages.FLIP_POSITION_NOT_EMPTY);
                    return false;
                }else if(!childbone.isAboveParentBone() && childbone.getId() === Number(cell.getAttribute('cellId')) + 1){
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

    this.applyGraphSettings = function(){
        this.marginH = GraphSettings.MARGIN_H;
        this.marginV = GraphSettings.MARGIN_V;
        this.spacerH = GraphSettings.CENTERBONE_SPACER_H;
        this.boneSegmentLength = GraphSettings.CENTERBONE_SEGMENT_LENGTH;
        this.vertexWidth = GraphSettings.CENTERBONE_VERTEX_WIDTH;
        this.vertexHeight = GraphSettings.CENTERBONE_VERTEX_HEIGHT;
    };
    
}

CenterBone.prototype = Object.create(BaseBone.prototype);