function LateralBone (canvas) {
   
    BaseBone.call(this, canvas);
   
    //The initial length of this bone.
    this.spacerH; 
    //Increment distance by which the this bone grows or shrinks.
    this.boneSegmentLength;  
    
    this.init = function (parentBone, id) {
        BaseBone.prototype.init.call(this, parentBone);
        this.applyGraphSettings();
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
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', 'Detail-' + counter);
        valueObject.setAttribute('cellType', GraphSettings.LATERALBONE_EDGE);
        valueObject.setAttribute('parentCellId', this.parentBone.getParentId() + "|" + this.parentBone.getId());
        valueObject.setAttribute('cellId', id);
                            
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(0, 0);
        geometry.targetPoint = new mxPoint(0, 0);
        
        var cell = new mxCell(valueObject, geometry, GraphSettings.STYLE_MAP.get(GraphSettings.LATERALBONE_EDGE));
        cell.edge = true;
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
        var childBone = new AuxillaryBone(this.canvas);
        childBone.init(this, this.getNextChildId());
        this.childBones.push(childBone);
    };
            
    this.compactChildBones = function(){
        var topAuxillaryBones = this.getTopChildBones();
        var bottomAuxillaryBones = this.getBottomChildBones();
        this.sortBones(topAuxillaryBones);
        this.sortBones(bottomAuxillaryBones);
        
        var dx = this.isLeftOfParentBone()? this.boneSegmentLength : -this.boneSegmentLength;
        var dy = 0;
                
        var id=1;
        for(var i=0; i<topAuxillaryBones.length ; i++){
            while(topAuxillaryBones[i].getId() > id){
                for(var j=i; j<topAuxillaryBones.length ; j++){
                    topAuxillaryBones[j].moveBoneOnCompact(dx, dy);
                }
            }
            id += 2;
        };
        
        var id=2;
        for(var i=0; i<bottomAuxillaryBones.length ; i++){
            while(bottomAuxillaryBones[i].getId() > id){
                for(var j=i; j<bottomAuxillaryBones.length ; j++){
                    bottomAuxillaryBones[j].moveBoneOnCompact(dx, dy);
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
    
    this.getMaxOfChildBoneCount = function(){
        var topChildBonesCount = this.getTopChildBones().length;
        var bottomChildBonesCount = this.getBottomChildBones().length;
        return Math.max(topChildBonesCount, bottomChildBonesCount);
    };
    
    this.positionBone = function (){
        
        var geometry = new mxGeometry();
        
        var sourceX =  this.parentBone.getEdge().getGeometry().targetPoint.x 
                        - Math.floor(this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2)/ Math.tan(this.parentBone.edgeTheta));
        
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
    
    this.canSwapChildBones = function(cells){
        
    };
    
    this.delete = function(){
       this.deleteAllChildBones();
       this.graph.removeCells([this.edge]);
    };
   
    this.isLeftOfParentBone = function(){
       return this.getId() %2 !== 0;
    };
   
    this.isAboveSiblingBone = function(lateralBone){
        return this.getId() > lateralBone.getId();
    };
   
    this.moveBoneOnCompact = function(dx, dy){
        this.moveBonesInHierarchy(this, dx, dy);
        this.setId(this.getId()-2);
    };
   
    this.flipBone = function(){
        this.setId(this.getId() %2 !== 0 ? this.getId()+1 : this.getId()-1);
        this.positionBonesInHierarchy(this);
    };
   
    this.swapBones = function(boneToSwap){
        var id1 = this.getId();
        var id2 = boneToSwap.getId();
        
        this.setId(id2);
        boneToSwap.setId(id1);
        
        this.positionBonesInHierarchy(this);
        this.positionBonesInHierarchy(boneToSwap);
    };
   
    this.applyGraphSettings = function(){
        this.spacerH = GraphSettings.LATERALBONE_SPACER_H;
        this.boneSegmentLength = GraphSettings.LATERALBONE_SEGMENT_LENGTH;
    };
    
    this.restoreGraphSettingsFromValueObject = function(){
        var graphSettings = this.getValue().getAttribute("graphSettings");
        var arr = graphSettings.split(',');
        var map = new Map();
        arr.forEach(function(item){
           var key = item.split(':')[0];
           var value = item.split(':')[1];
           map.set(key, value);
        });
       
        this.spacerH = Number(map.get("spacerH"));
        this.boneSegmentLength = Number(map.get("boneSegmentLength"));
        this.getValue().setAttribute("graphSettings", null);
    };
    
    this.saveGraphSettingsToValueObject = function(){
        var graphSettings = "spacerH:" + this.spacerH + ","
                        +  "boneSegmentLength:" + this.boneSegmentLength;
        this.getValue().setAttribute("graphSettings", graphSettings);
    };
    
}

LateralBone.prototype = Object.create(BaseBone.prototype);

