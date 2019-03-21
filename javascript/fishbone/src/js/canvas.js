function Canvas () {
    
    this.clipboard;
    
    this.toolbar;
    
    this.graph;
    
    this.graphListeners;
    
    this.graphConfiguration;
    
    this.centerBone;
    
    this.canvasWidth = GraphSettings.CANVAS_WIDTH;
    
    this.canvasHeight = GraphSettings.CANVAS_HEIGHT;
    
    this.init = function (graphElement, toolbar) {
        this.clipboard = new Clipboard();
        this.toolbar = toolbar;
        this.buildGraph(graphElement);
        this.buildCenterBone();
    };
    
    this.getToolbar =function(){
        return this.toolbar;
    };
    
    this.getCanvasWidth =function(){
        return this.canvasWidth;
    };
    
    this.getCanvasHeight =function(){
        return this.canvasHeight;
    };
    
    this.getCenterBone =function(){
        return this.centerBone;
    };
    
    this.getGraph =function(){
        return this.graph;
    };
    
    this.onContextMenuDeleteClick = function(){
        this.onDeleteSubDetailClick();
        this.onDeleteDetailClick();
        this.onDeleteCauseClick();
    };
    
    this.onSwapClick = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length !== 2 ){
            Utils.showMessageDialog(Messages.SWAP_SELECT_SHAPE);
            return false;
        };
        var bone1 = this.centerBone.getBoneFromCell(cells[0]);
        var bone2 = this.centerBone.getBoneFromCell(cells[1]);
        if(cells[0].getValue().cellType !== cells[1].getValue().cellType
            || bone1.getParentBone() !== bone2.getParentBone()){
            Utils.showMessageDialog(Messages.SWAP_SELECT_SHAPE);
            return false;
        }
        
        bone1.getParentBone().swapChildBones();
    };
    
    this.onFlipClick = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length !== 1){
            Utils.showMessageDialog(Messages.FLIP_SELECT_SHAPE);
            return false;
        };
        var bone = this.centerBone.getBoneFromCell(cells[0]);
        bone.getParentBone().flipChildBone();
    };
    
    this.onReorderClick = function(sendToBack){
        var cells = this.graph.getSelectionCells();
        this.graph.orderCells(sendToBack, cells);
    };
    
    this.onAddCauseClick = function(){
        this.centerBone.addChildBone();
    };
    
    this.onDeleteCauseClick = function(){
        this.centerBone.deleteSelectedChildBones();
    };
    
    this.onAddDetailClick = function(){
        var selectedSideBones = this.centerBone.getSelectedChildBones();
        
        if(selectedSideBones.length === 0){
            Utils.showMessageDialog(Messages.SELECT_ONE_OR_MORE_CAUSE);
            return;
        };
        selectedSideBones.forEach(function(sideBone){
           sideBone.addChildBone(); 
        });
    };
    
    this.onDeleteDetailClick = function(){
        var sideBones = this.centerBone.getChildBones();
        sideBones.forEach(function(sideBone){
            if(sideBone.getSelectedChildBones().length > 0){
                sideBone.deleteSelectedChildBones();
            }
        });
    };
    
    this.onAddSubDetailClick = function(){
        var sideBones = this.centerBone.getChildBones();
        var selectedLateralBones=[];
        
        sideBones.forEach(function(sideBone){
            selectedLateralBones.push.apply(selectedLateralBones, sideBone.getSelectedChildBones());
        });
        
        if(selectedLateralBones.length === 0){
            Utils.showMessageDialog(Messages.SELECT_ONE_OR_MORE_DETAIL);
            return;
        };
        selectedLateralBones.forEach(function(lateralBone){
           lateralBone.addChildBone(); 
        });
    };
    
    this.onDeleteSubDetailClick = function(){
        var sideBones = this.centerBone.getChildBones();
        var lateralBones=[];
        sideBones.forEach(function(sideBone){
            lateralBones.push.apply(lateralBones, sideBone.getChildBones());
        });
        lateralBones.forEach(function(lateralBone){
            if(lateralBone.getSelectedChildBones().length > 0){
                lateralBone.deleteSelectedChildBones();
            }
        });
    };
    
    this.onZoomChange = function(value){
        this.graph.zoomTo(1 + (value/100), false);
    };
    
    this.onZoomReset = function(){
        this.graph.zoomActual();
    };
    
    this.onApplyGraphSettings = function(){
        this.graph.getModel().beginUpdate();
        try
        {
            var cells = this.graph.getSelectionCells();
            var bones = [];
            if(cells.length >= 1){
                this.centerBone.getAllSelectedBones(this.centerBone, bones);
            }else{
                this.centerBone.getAllBones(this.centerBone, bones);
            };
            var centerBone = this.centerBone;
            bones.forEach(function(bone){
                bone.applyGraphSettings();
                bone.positionBonesInHierarchy(bone);
            });
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
    this.onClearDiagramClick = function(){
        var canvas = this;
        var graph = this.graph;
        Utils.showConfirmationBox(Messages.CLEAR_GRAPH, function(){
            canvas.clearGraph();
            canvas.buildCenterBone();
        });
    };
    
    this.onSaveDiagramClick = function(){
        this.graph.refresh(this.centerBone.getVertex());
        this.centerBone.saveGraphSettingsToValueObjectInHierarchy(this.centerBone);
        
        var codec = new mxCodec();
        codec.lookup = function(id){return model.getCell(id);}
        var node = codec.encode(this.graph.getModel());
        var content = mxUtils.getXml(node);
        
        Utils.showMessageDialog(content, 400, 400);
    };
    
    this.onLoadDiagram = function(xmlContent){
        this.graph.getModel().beginUpdate();
        try
        {   
            this.clearGraph();
            var doc = mxUtils.parseXml(xmlContent);
            var codec = new mxCodec(doc);
            codec.lookup = function(id){return model.getCell(id);}
            codec.decode(doc.documentElement, this.graph.getModel());

            var objectGraphBuilder = new ObjectGraphBuilder(this);
            var cells = this.graph.getChildCells(this.graph.getDefaultParent(), true, true);
            objectGraphBuilder.buildObjectGraphFromCells(cells);
            this.centerBone = objectGraphBuilder.getCenterBone();
            
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.clearGraph = function(){
        this.graph.removeCells(this.graph.getChildCells(this.graph.getDefaultParent(), true, true));
        this.graph.getModel().clear();
        this.centerBone = undefined;
    };
    
    this.buildGraph = function(graphElement){
        this.graphConfiguration = new GraphConfiguration(graphElement);
        this.graph = new mxGraph(graphElement);
        this.graphConfiguration.init(this.graph, this);
    };
    
    this.buildCenterBone = function(){
        this.centerBone = new CenterBone(this);
        this.centerBone.init();
    };
        
    this.onCopyStylesContextMenuClick = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length> 1){
             Utils.showMessageDialog(Messages.SELECT_SINGLE_GRAPH_ELEMENT);
             return;
        }
        var cell = cells[0];
        var bone = this.centerBone.getBoneFromCell(cell);
        if(bone !== undefined){
           var styles = bone.getCellStyle(cell);
           this.clipboard.setStyles(styles);
        }
    };
    
    this.onPasteStylesContextMenuClick = function(){
        if(this.clipboard.getStyles() === undefined){
             Utils.showMessageDialog(Messages.NO_STYLE_IN_CLIPBOARD);
        }
        var cells = this.graph.getSelectionCells();
        var centerBone = this.centerBone;
        var clipboard = this.clipboard;
        var bones = [];
        cells.forEach(function(cell){
             var bone = centerBone.getBoneFromCell(cell); 
             bones.push(bone);
        });
        bones.forEach(function(bone){
            bone.applyStyles(clipboard.getStyles()); 
        });
    };
    
    this.onCopyGraphSettingsContextMenuClick = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length> 1){
             Utils.showMessageDialog(Messages.SELECT_SINGLE_GRAPH_ELEMENT);
             return;
        }
        var cell = cells[0];
        var bone = this.centerBone.getBoneFromCell(cell);
        if(bone !== undefined){
           var settings = bone.getGraphSettings();
           this.clipboard.setSettings(settings);
        }
    };
    
    this.onPasteGraphSettingsContextMenuClick = function(){
         if(this.clipboard.getSettings() === undefined){
             Utils.showMessageDialog(Messages.NO_SETTING_IN_CLIPBOARD);
        }
        var cells = this.graph.getSelectionCells();
        var centerBone = this.centerBone;
        var clipboard = this.clipboard;
        var bones = [];
        cells.forEach(function(cell){
             var bone = centerBone.getBoneFromCell(cell); 
             bones.push(bone);
        });
        this.graph.getModel().beginUpdate();
        try
        { 
            bones.forEach(function(bone){
                bone.applyGraphSettingsFromClipboard(clipboard.getSettings());
                bone.positionBone();
            });
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.onApplyStylesContextMenuClick = function(){
        var styleAttributes = this.toolbar.getStyleAttributes();
        this.applyStyleAttributes(styleAttributes);
    };
    
    this.onResetStylesContextMenuClick = function(){
        var styleAttributes = this.toolbar.getDefaultStyleAttributes();
        this.applyStyleAttributes(styleAttributes);
    };
    
    this.applyStyleAttributes = function(styleAttributes){
        var bones = [];
        this.centerBone.getAllSelectedBones(this.centerBone, bones);
        if(bones.length === 0){
           this.centerBone.getAllBones(this.centerBone, bones);
        };
            
        this.graph.getModel().beginUpdate();
        var graph = this.graph;
        try
        {
           bones.forEach(function(bone){
               bone.applyStyles(styleAttributes);
           }) ;
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.onHelpWindowOpen = function(dialogExtendOptions){
        $("#help-window").dialog({}).dialogExtend(dialogExtendOptions);
    };
    
    this.onPropertiesWindowOpen = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length > 1 || cells.length ===0){
            Utils.showMessageDialog(Messages.SELECT_SINGLE_GRAPH_ELEMENT);
            return;
        };
        var cell = cells[0];
        $("#properties-window").dialog("open");
        this.showProperties(cell);
    };
    
    this.showProperties = function(cell){
        
        if(!$('#properties-window').dialog('isOpen')){
            return;
        }
        
        var cellGeometry;
        if(cell.isEdge()){
            cellGeometry = this.graph.getView().getState(cell,false).cellBounds;
        }else{
            cellGeometry = cell.getGeometry();
        }
        $("#x-location").html(Math.round(cellGeometry.x)  + "px");
        $("#y-location").html(Math.round(cellGeometry.y)  + "px");
        $("#width").html(Math.round(cellGeometry.width)  + "px");
        $("#height").html(Math.round(cellGeometry.height)  + "px");
        
        if(cell.getStyle().indexOf("fontSize") >=0){
            $("#font-size").html(cell.getStyle().split("fontSize=")[1].substr(0,1) +"px");
        }else{
            $("#font-size").html("-");
        };
        if(cell.getStyle().indexOf("fontColor") >=0){
            $("#font-color > .colorbox").css("background-color", cell.getStyle().split("fontColor=")[1].substr(0,7));
        }else{
            $("#font-color > .colorbox").css("background-color", "#fff");
        };    
        if(cell.getStyle().indexOf("strokeColor") >=0){
            $("#stroke-color > .colorbox").css("background-color", cell.getStyle().split("strokeColor=")[1].substr(0,7));
        }else{
            $("#stroke-color > .colorbox").css("background-color", "#fff");
        };
        if(cell.getStyle().indexOf("fillColor") >=0){
            $("#fill-color > .colorbox").css("background-color", cell.getStyle().split("fillColor=")[1].substr(0,7));
        }else{
            $("#fill-color > .colorbox").css("background-color", "#fff");
        };
        if(cell.getStyle().indexOf("strokeWidth") >=0){
            $("#stroke-width").html(cell.getStyle().split("strokeWidth=")[1].substr(0,1) +"px");
        }else{
            $("#stroke-width").html("-");
        };
    };
}

