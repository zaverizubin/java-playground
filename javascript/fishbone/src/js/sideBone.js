function SideBone (canvas) {
   
    BaseBone.call(this, canvas);
    //The initial length of this bone.
    this.spacerV; 
    //Increment distance by which the this bone grows or shrinks.
    this.boneSegmentLength; 
    this.vertexWidth;
    this.vertexHeight;
    this.edgeTheta;
   
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
        this.buildVertex(id);
        this.buildEdge(id);
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildVertex = function(id){
        var counter  = this.parentBone.getChildBones().length + 1;
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', 'Cause-' + counter);
        valueObject.setAttribute('cellType', GraphSettings.SIDEBONE_VERTEX);
        valueObject.setAttribute('parentCellId',  this.parentBone.getParentId() + "|" + this.parentBone.getId());
        valueObject.setAttribute('cellId', id);
                
        this.vertex = this.graph.insertVertex(this.graphParent, null, 
                                            valueObject,
                                            0, 
                                            0,
                                            this.vertexWidth,
                                            this.vertexHeight,
                                            GraphSettings.STYLE_MAP.get(GraphSettings.SIDEBONE_VERTEX));
    };
   
    this.buildEdge = function(id){
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', '');
        valueObject.setAttribute('cellType', GraphSettings.SIDEBONE_EDGE);
        valueObject.setAttribute('parentCellId',  this.parentBone.getParentId() + "|" + this.parentBone.getId());
        valueObject.setAttribute('cellId', id);
       
        var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(0, 0);
       
        var cell = new mxCell(valueObject, geometry, GraphSettings.STYLE_MAP.get(GraphSettings.SIDEBONE_EDGE));
        cell.edge = true;
        this.edge = cell;
        this.graph.addEdge(cell, this.graphParent, this.vertex);
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
    
    this.compactChildBones = function(){
        var leftSideBones = this.getLeftChildBones();
        var rightSideBones = this.getRightChildBones();
        this.sortBones(leftSideBones);
        this.sortBones(rightSideBones);
        
        var dx = Math.ceil(this.boneSegmentLength/Math.tan(this.edgeTheta));
        var dy = this.isAboveParentBone()? this.boneSegmentLength : - this.boneSegmentLength;
                
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
        
        var xLocEdge =  this.parentBone.getEdge().getGeometry().sourcePoint.x +
                    this.parentBone.boneSegmentLength * Math.ceil(this.getId()/2);
            
        var yLocEdge = this.parentBone.getEdge().getGeometry().sourcePoint.y;
        
        var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(xLocEdge, yLocEdge);
        this.graph.getModel().setGeometry(this.edge, geometry);
       
        
        var xLocVertex = xLocEdge 
                   - Math.floor(((maxChildBonesCount * this.boneSegmentLength) + this.spacerV + this.vertexHeight/2) / Math.tan(this.edgeTheta)) 
                   - this.vertexWidth/2;
        var yLocVertex = (this.getId() % 2 !==0) 
                    ? yLocEdge  - (maxChildBonesCount * this.boneSegmentLength) - this.spacerV - this.vertexHeight 
                    : yLocEdge  + (maxChildBonesCount * this.boneSegmentLength) + this.spacerV;
        
        var geometry = new mxGeometry(xLocVertex, yLocVertex, this.vertexWidth, this.vertexHeight);
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
                if(childbone.isLeftOfParentBone() && childbone.getId() === Number(cell.getAttribute('cellId')) - 1){
                    Utils.showMessageDialog(Messages.FLIP_POSITION_NOT_EMPTY);
                    return false;
                }else if(!childbone.isLeftOfParentBone() && childbone.getId() === Number(cell.getAttribute('cellId')) + 1){
                    Utils.showMessageDialog(Messages.FLIP_POSITION_NOT_EMPTY);
                    return false;
                };
            };
        };
        return true;
    };
    
    this.delete = function(){
       this.deleteAllChildBones(); 
       this.graph.removeCells([this.vertex, this.edge]);
    };
   
    this.isAboveParentBone = function(){
       return this.getId() %2 !== 0;
    };
   
    this.isRightOfSiblingBone = function(sideBone){
        return this.getId() > sideBone.getId();
    };
   
    this.moveBoneOnCompact = function(dx, dy){
       this.moveBonesInHierarchy(this, dx, dy);
       this.setId(this.getId() - 2);
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
   
    this.getGraphSettings = function(){
        var bone = this;
        var map = new Map();
        map.set(GraphSettings.SIDEBONE_VERTEX, {
            spacerV : bone.spacerV,
            boneSegmentLength : bone.boneSegmentLength,
            vertexWidth : bone.vertexWidth,
            vertexHeight : bone.vertexHeight,
            edgeTheta : bone.edgeTheta
        });
        return map;
       
    };

    this.applyGraphSettingsFromClipboard = function(graphSettingsObj){
        var graphSettings = graphSettingsObj.get(GraphSettings.SIDEBONE_VERTEX);
        if( graphSettings === undefined){
            return;
        };
       
        if(graphSettings.spacerV !== undefined){
            this.spacerV = graphSettings.spacerV;
        };
        if(graphSettings.boneSegmentLength !== undefined){
            this.boneSegmentLength = graphSettings.boneSegmentLength;
        };
        if(graphSettings.vertexWidth !== undefined){
            this.vertexWidth = graphSettings.vertexWidth;
        };
        if(graphSettings.vertexHeight !== undefined){
            this.vertexHeight = graphSettings.vertexHeight;
        };
        if(graphSettings.edgeTheta !== undefined){
            this.edgeTheta = graphSettings.edgeTheta;
        };
        
    };
   
    this.applyGraphSettings = function(){
        this.spacerV = GraphSettings.SIDEBONE_SPACER_V;
        this.boneSegmentLength = GraphSettings.SIDEBONE_SEGMENT_LENGTH;
        this.vertexWidth = GraphSettings.SIDEBONE_VERTEX_WIDTH;
        this.vertexHeight = GraphSettings.SIDEBONE_VERTEX_HEIGHT;
        this.edgeTheta = Math.round(GraphSettings.THETA * (Math.PI/180) * 100) / 100;
        
        if(this.vertex !== undefined){
            var style = this.vertex.getStyle();
            if(style.toLowerCase().indexOf('ellipse') !== -1){
                style = style.replace('ellipse', GraphSettings.SIDEBONE_VERTEX_SHAPE)
            }else if (style.toLowerCase().indexOf('rectangle') !== -1){
                style = style.replace('rectangle', GraphSettings.SIDEBONE_VERTEX_SHAPE)
            }else{
                style = style.replace('triangle', GraphSettings.SIDEBONE_VERTEX_SHAPE)
            };
            this.graph.setCellStyle(style,[this.vertex]);
        };
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
       
        this.spacerV= Number(map.get("spacerV"));
        this.boneSegmentLength = Number(map.get("boneSegmentLength"));
        this.vertexWidth = Number(map.get("vertexWidth"));
        this.vertexHeight = Number(map.get("vertexHeight"));
        this.edgeTheta = Number(map.get("edgeTheta"));
        this.getValue().setAttribute("graphSettings", null);
    };
    
    this.saveGraphSettingsToValueObject = function(){
        var graphSettings = "spacerV:" + this.spacerV + ","
            +  "boneSegmentLength:" + this.boneSegmentLength + ","
            +  "vertexWidth:" + this.vertexWidth + ","
            +  "vertexHeight:" + this.vertexHeight + ","
            + "edgeTheta:" + this.edgeTheta;
        this.getValue().setAttribute("graphSettings", graphSettings);
    };
    
}

SideBone.prototype = Object.create(BaseBone.prototype);

