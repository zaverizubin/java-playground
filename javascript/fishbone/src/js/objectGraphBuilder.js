function ObjectGraphBuilder(canvas){
   
    this.canvas = canvas;
    
    this.centerBoneVertex;
    
    this.centerBoneEdge;
    
    this.sideBoneVertices = [];
    
    this.sideBoneEdges = [];
    
    this.lateralBoneEdges = [];
    
    this.auxillaryBoneEdges = [];
    
    this.centerBone;
    
    this.sideBones = [];
    
    this.lateralBones = [];
    
    this.auxillaryBones = [];
    
    this.getCenterBone = function(){
        return this.centerBone;
    };
    
    this.buildObjectGraphFromCells = function(cells){
        this.triageCells(cells);
        this.buildCenterBone();
        this.buildSideBones();
        this.buildLateralBones();
        this.buildAuxillaryBones();
        this.sortBones();
        this.buildAssociation(this.lateralBones, this.auxillaryBones);
        this.buildAssociation(this.sideBones, this.lateralBones);
        this.buildAssociation([this.centerBone], this.sideBones);
    };
    
    this.triageCells = function(cells){
        for(var i = 0; i < cells.length; i++){
            var cell = cells[i];
            switch(cell.getValue().getAttribute('cellType')){
                case GraphSettings.CENTERBONE_VERTEX:
                    this.centerBoneVertex = cell;
                    break;
                case GraphSettings.CENTERBONE_EDGE:
                    this.centerBoneEdge = cell;
                    break;    
                case GraphSettings.SIDEBONE_VERTEX:
                    this.sideBoneVertices.push(cell);
                    break;
                case GraphSettings.SIDEBONE_EDGE:
                    this.sideBoneEdges.push(cell);
                    break; 
                case GraphSettings.LATERALBONE_EDGE:
                    this.lateralBoneEdges.push(cell);
                    break;
                case GraphSettings.AUXILLARYBONE_EDGE:
                    this.auxillaryBoneEdges.push(cell);
                    break; 
            };
        };
    };
    
    this.buildCenterBone = function(){
        this.centerBone = new CenterBone(this.canvas);
        this.centerBone.setVertex(this.centerBoneVertex);
        this.centerBone.setEdge(this.centerBoneEdge);
        this.centerBone.restoreGraphSettingsFromValueObject();
    };
    
    this.buildSideBones = function(){
        for(var i = 0; i < this.sideBoneVertices.length; i++)
        {
            var sideBone = new SideBone(this.canvas);
            sideBone.setVertex(this.sideBoneVertices[i]);
            for(var j = 0; j < this.sideBoneEdges.length; j++){
                if(Number(this.sideBoneEdges[j].getAttribute('cellId')) ===  Number(sideBone.getVertex().getAttribute('cellId'))){
                    sideBone.setEdge(this.sideBoneEdges[j]);
                    break;
                }
            };
            sideBone.restoreGraphSettingsFromValueObject();
            this.sideBones.push(sideBone);
        }
    };
    
    this.buildLateralBones = function(){
        for(var i = 0; i < this.lateralBoneEdges.length; i++)
        {
            var lateralBone = new LateralBone(this.canvas);
            lateralBone.setEdge(this.lateralBoneEdges[i]);
            lateralBone.restoreGraphSettingsFromValueObject();
            this.lateralBones.push(lateralBone);
        }
        
    };
    
    this.buildAuxillaryBones = function(){
        for(var i = 0; i < this.auxillaryBoneEdges.length; i++)
        {
            var auxillaryBone = new AuxillaryBone(this.canvas);
            auxillaryBone.setEdge(this.auxillaryBoneEdges[i]);
            auxillaryBone.restoreGraphSettingsFromValueObject();
            this.auxillaryBones.push(auxillaryBone);
        }
    };
 
    this.sortBones = function(){
        this.centerBone.sortBones(this.sideBones);
        this.centerBone.sortBones(this.lateralBones);
        this.centerBone.sortBones(this.auxillaryBones);
    };
 
    this.buildAssociation = function(parentBones, childBones){
        for(var i=0; i< parentBones.length; i++){
            for(var j=0; j< childBones.length; j++){
                var parentBone = parentBones[i];
                var childBone = childBones[j];
                if(childBone.getParentId() === parentBone.getParentId() + "|" + parentBone.getId()){
                    childBone.setParentBone(parentBone);
                    parentBone.getChildBones().push(childBone);
                };
            }
        }
    };
    
}
