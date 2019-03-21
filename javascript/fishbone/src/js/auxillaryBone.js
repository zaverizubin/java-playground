function AuxillaryBone (canvas) {
   
    BaseBone.call(this, canvas);
    
    //Increment distance by which the this bone grows or shrinks.
    this.boneSegmentLength;  
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
        this.buildEdge(id);
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildEdge = function(id){
        var counter  = this.parentBone.getChildBones().length + 1;
        
        var doc = mxUtils.createXmlDocument();
        var valueObject = doc.createElement('node')
        valueObject.setAttribute('label', 'Sub-' + counter);
        valueObject.setAttribute('cellType', GraphSettings.AUXILLARYBONE_EDGE);
        valueObject.setAttribute('parentCellId', this.parentBone.getParentId() + "|" + this.parentBone.getId());
        valueObject.setAttribute('cellId', id);
                            
        var geometry = new mxGeometry();
        geometry.sourcePoint = new mxPoint(0, 0);
        geometry.targetPoint = new mxPoint(0, 0);
       
        
        var style = GraphSettings.STYLE_MAP.get(GraphSettings.AUXILLARYBONE_EDGE);
        var cell = new mxCell(valueObject, geometry, style);
        cell.edge = true;
        this.edge = cell;
        this.graph.addEdge(cell, this.graphParent);
        
        
    };
    
    this.positionBone = function (){
        
        var geometry = new mxGeometry();
        
        var sourceX =  (this.parentBone.getId() % 2 !== 0)
                        ?   this.parentBone.getEdge().getGeometry().sourcePoint.x 
                            - this.parentBone.spacerH - this.parentBone.boneSegmentLength  * (Math.ceil(this.getId()/2)-1)
                        : this.parentBone.getEdge().getGeometry().sourcePoint.x 
                            + this.parentBone.spacerH + this.parentBone.boneSegmentLength  * (Math.ceil(this.getId()/2)-1);
        
        var sourceY = this.parentBone.getEdge().getGeometry().sourcePoint.y;  
        
        geometry.sourcePoint = new mxPoint(sourceX, sourceY);
        
        var targetX = (this.parentBone.getId() % 2 !== 0)
                    ? geometry.sourcePoint.x  - Math.ceil(this.boneSegmentLength/Math.tan(this.edgeTheta))
                    : geometry.sourcePoint.x  + Math.ceil(this.boneSegmentLength/Math.tan(this.edgeTheta));
        var targetY = (this.getId() % 2 !== 0)
                    ? geometry.sourcePoint.y - this.boneSegmentLength
                    : geometry.sourcePoint.y + this.boneSegmentLength;
       
        geometry.targetPoint = new mxPoint(targetX, targetY);
        
        geometry.relative = true;
        geometry.x = 1;
        geometry.y = 1;
        
        this.graph.getModel().setGeometry(this.edge, geometry);
    };
    
    this.delete = function(){
       this.graph.removeCells([this.edge]);
    };
       
    this.isAboveParentBone = function(){
       return this.getId() %2 !== 0;
    };
   
    this.isRightOfSiblingBone = function(lateralBone){
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
    
    this.getGraphSettings = function(){
        var bone = this;
        var map = new Map();
        map.set(GraphSettings.AUXILLARYBONE_EDGE, {
            boneSegmentLength : bone.boneSegmentLength,
            edgeTheta : bone.edgeTheta
        });
        return map;
    };

    this.applyGraphSettingsFromClipboard = function(graphSettingsObj){
        var graphSettings = graphSettingsObj.get(GraphSettings.AUXILLARYBONE_EDGE);
        if( graphSettings === undefined){
            return;
        };
        
        if(graphSettings.boneSegmentLength !== undefined){
            this.boneSegmentLength = graphSettings.boneSegmentLength;
        };
        if(graphSettings.edgeTheta !== undefined){
            this.edgeTheta = graphSettings.edgeTheta;
        };
    };
    
    this.applyGraphSettings = function(){
        this.boneSegmentLength = GraphSettings.AUXILLARYBONE_SEGMENT_LENGTH;  
        this.edgeTheta = Math.round(GraphSettings.THETA * (Math.PI/180) * 100) / 100 ;
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
       
        this.boneSegmentLength = Number(map.get("boneSegmentLength"));
        this.edgeTheta = Number(map.get("edgeTheta"));
        this.getValue().setAttribute("graphSettings", null);
    };
    
    this.saveGraphSettingsToValueObject = function(){
        var graphSettings = "boneSegmentLength:" + this.boneSegmentLength + ","
                            +  "edgeTheta:" + this.edgeTheta;
        this.getValue().setAttribute("graphSettings", graphSettings);
    };
}

AuxillaryBone.prototype = Object.create(BaseBone.prototype);

