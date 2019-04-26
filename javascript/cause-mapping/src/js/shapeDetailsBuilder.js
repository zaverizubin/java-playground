class ShapeDetailsBuilder{
    
    constructor(graph){
        this.graph = graph;
        this.properties = ShapeDetailsBuilder.Properties();
        this.notesList = [];
        this.actionsList = [];
        this.evidenceList = [];
        this.notesGrid;
        this.actionsGrid;
        this.evidenceGrid;
        this.initComplete = false;
    };
    
    addNote(){
        var note = ShapeDetailsBuilder.Note();
        note.id = this.notesList.length + 1;
        this.notesList.push(note);
        this.notesGrid.clearCache();
    }
    
    addAction(){
        var action = ShapeDetailsBuilder.Action();
        action.id = this.actionsList.length + 1;
        this.actionsList.push(action);
        this.actionsGrid.clearCache();
    }
    
    addEvidence(){
        var evidence = ShapeDetailsBuilder.Evidence();
        evidence.id = this.evidenceList.length + 1;
        this.evidenceList.push(evidence);
        this.evidenceGrid.clearCache();
    }
    
    buildDetails(cell){
        this.cell = cell;
        
        this.openDialog();
        this.getElements();
        this.showPropertiesTab();
        this.getShapeDetails(this.cell);
        this.getStyleDetails(this.cell);
        this.setShapePropertiesToUI();
        this.bindGrids();
        
        var shapeDetailsBuilder = this;
        setTimeout(function(){
            shapeDetailsBuilder.assignEventHandlers();
            shapeDetailsBuilder.initComplete = true;
        }, 500);
        
        
    };
    
    openDialog(){
        var dialog = Utils.$("#shape-details").get(0);
        dialog.opened = true;
        Utils.$('#overlay').addClass("shape-details");
    };
    
    getElements(){
    	this.vsProperties = $(this.getElementFromSelector("#vertical-layout-properties"));
    	this.vsNotes = $(this.getElementFromSelector("#vertical-layout-notes"));
    	this.vsActions =$(this.getElementFromSelector("#vertical-layout-actions"));
    	this.vsEvidence = $(this.getElementFromSelector("#vertical-layout-evidence"));
    	
    	this.notesGrid = this.getElementFromSelector("#shape-notes-grid");
        this.actionsGrid = this.getElementFromSelector("#shape-actions-grid");
        this.evidenceGrid = this.getElementFromSelector("#shape-evidence-grid");
        
        this.btnProperties = this.getElementFromSelector("#shape-properties-button");
        this.btnNotes = this.getElementFromSelector("#shape-notes-button");
        this.btnActions = this.getElementFromSelector("#shape-actions-button");
        this.btnEvidence = this.getElementFromSelector("#shape-evidence-button");
        
        this.btnAddNote = this.getElementFromSelector("#add-shape-note");
        this.btnAddAction = this.getElementFromSelector("#add-shape-action");
        this.btnAddEvidence = this.getElementFromSelector("#add-shape-evidence");
      
        this.btnClose = this.getElementFromSelector("#shape-details-close-button");
    };
    
    showPropertiesTab(){
    	this.vsProperties.toggle(true);
    	this.vsNotes.toggle(false);
    	this.vsActions.toggle(false);
    	this.vsEvidence.toggle(false);
    };
    
    bindGrids(){
        this.notesGrid.items = this.notesList;
        this.notesGrid.clearCache();
                
        this.actionsGrid.items = this.actionsList;
        this.actionsGrid.clearCache();
                
        this.evidenceGrid.items = this.evidenceList;
        this.evidenceGrid.clearCache();
    };
    
    assignEventHandlers(){
        var shapeDetailsBuilder = this;
        
        var dialog = Utils.$("#shape-details").get(0);
        if(!this.initComplete){
            dialog.addEventListener('opened-changed', function(event){
                if(event.detail.value === false){
                    shapeDetailsBuilder.getShapePropertiesFromUI();
                    shapeDetailsBuilder.updateShapeDetails();
                    shapeDetailsBuilder.showCellOverlays(shapeDetailsBuilder.cell);
                };
            });
        }
        
        
        if(this.btnClose.onclick === null){
           this.btnClose.onclick = function(){
              dialog.opened = false; 
           };
        }
        
        this.assignShowUnitClickHandler(this.btnProperties);
        this.assignShowUnitClickHandler(this.btnNotes);
        this.assignShowUnitClickHandler(this.btnActions);
        this.assignShowUnitClickHandler(this.btnEvidence);
        
        this.assignAddDetailClickHandler(this.btnAddNote, "#shape-notes-grid", shapeDetailsBuilder.addNote);
        this.assignAddDetailClickHandler(this.btnAddAction, "#shape-actions-grid", shapeDetailsBuilder.addAction);
        this.assignAddDetailClickHandler(this.btnAddEvidence, "#shape-evidence-grid", shapeDetailsBuilder.addEvidence);
        
        this.assignDeleteGridItemHandler("#shape-notes-grid");
        this.assignDeleteGridItemHandler("#shape-actions-grid");
        this.assignDeleteGridItemHandler("#shape-evidence-grid");
        
    };
    
    assignShowUnitClickHandler(button){
        
        var btnProperties = this.btnProperties;
        var btnNotes = this.btnNotes;
        var btnActions = this.btnActions;
        var btnEvidence = this.btnEvidence;
         
        var vsProperties = this.vsProperties;
        var vsNotes = this.vsNotes;
        var vsActions = this.vsActions;
        var vsEvidence = this.vsEvidence;
        
        if(button.onclick === null){
            button.onclick = function(){
                btnProperties.removeAttribute('theme');
                btnNotes.removeAttribute('theme');
                btnActions.removeAttribute('theme');
                btnEvidence.removeAttribute('theme');
                button.setAttribute('theme', 'primary');
                
                vsProperties.toggle(false);
                vsNotes.toggle(false);
                vsActions.toggle(false);
                vsEvidence.toggle(false);
                
                if(button ===  btnProperties){
                    vsProperties.toggle(true);
                }else if (button ===  btnNotes){
                    vsNotes.toggle(true);
                }else if (button ===  btnActions){
                   vsActions.toggle(true); 
                }else if (button ===  btnEvidence){
                    vsEvidence.toggle(true);
                }
            };
        }
    };
    
    assignAddDetailClickHandler(button, selector, addDetailFunction){
        
        var grid = this.getElementFromSelector(selector);
        var shapeDetailsBuilder = this;
        
        if(button.onclick === null){
           button.onclick = function(){
               var button = this;
               button.disabled = true;
               addDetailFunction.apply(shapeDetailsBuilder); 
               grid.clearCache();
               setTimeout(function(){
                   button.disabled = false;
                   var index = grid.items.length-1;
                   shapeDetailsBuilder.assignDeleteHandler(index, selector);
               }, 500);
           };
        }
    };
    
    assignDeleteGridItemHandler(selector){
        var grid = this.getElementFromSelector(selector); 
        for(let i = 0; i < grid.items.length; i++){
            this.assignDeleteHandler(i, selector);
        };
    };
    
    assignDeleteHandler(index,  selector){
        
        var grid = this.getElementFromSelector(selector); 
        var shapeDetailsBuilder = this;
        var deleteButton = Utils.$('#overlay ' + selector + ' #delete-' + index).get(0);
        if(deleteButton !== undefined && deleteButton.onclick === null){
            deleteButton.onclick = function() {
                grid.items.splice(index, 1);
                shapeDetailsBuilder.renumberList(grid.items);
                grid.clearCache();
            };
        }
    };
    
    renumberList(list){
        for(var i=0; i<list.length; i++){
            list[i].id = i + 1;
        };
    };
    
    getShapeDetails(cell){
        var valueObject =  cell.getValue();
       
        if(valueObject.getAttribute('notes') !== null){
            this.notesList = JSON.parse(valueObject.getAttribute('notes'));
        }else{
            this.notesList = [];
        }
        if(valueObject.getAttribute('actions') !== null){
            this.actionsList = JSON.parse(valueObject.getAttribute('actions'));
        }else{
            this.actionsList = [];
        }
        if(valueObject.getAttribute('evidence') !== null){
            this.evidenceList = JSON.parse(valueObject.getAttribute('evidence'));
        }else{
            this.evidenceList = [];
        }
    };
    
    getStyleDetails(cell){
        var valueObject =  cell.getValue();
        var style = this.graph.getCellStyle(cell) ;
        this.properties.text = valueObject.getAttribute('label');
        this.properties.description = valueObject.getAttribute('description');
        this.properties.fontFamily = style.fontFamily;
        this.properties.fontSize = style.fontSize;
        this.properties.strokeColor = style.strokeColor;
        this.properties.fillColor = style.fillColor;
        this.properties.fontColor = style.fontColor;
        switch(Number(style.fontStyle)){
            case 1:
                this.properties.fontBold = true;
                break;
            case 2:
                this.properties.fontItalic = true;
                break;
            case 4:
                this.properties.fontUnderline = true;
                break;
            case 3:
                this.properties.fontBold = true;
                this.properties.fontItalic = true;
                break;
            case 5:
                this.properties.fontBold = true;
                this.properties.fontUnderline = true;
                break;
            case 6:
                this.properties.fontItalic = true;
                this.properties.fontUnderline = true;
                break;    
            case 7:
                this.properties.fontBold = true;
                this.properties.fontItalic = true;
                this.properties.fontUnderline = true;
                break;    
        }
    }
    
    setShapePropertiesToUI(){
        this.getElementFromSelector(".shape-label").value = this.properties.text;
    	this.getElementFromSelector(".shape-description").value  = this.properties.description;
    	this.getElementFromSelector(".shape-font-family").value = this.properties.fontFamily;
    	this.getElementFromSelector(".shape-font-size").value = String(this.properties.fontSize);
    	this.getElementFromSelector(".shape-stroke-color").value = this.properties.strokeColor;
    	this.getElementFromSelector(".shape-fill-color").value = this.properties.fillColor;
    	this.getElementFromSelector(".shape-font-color").value = this.properties.fontColor;
    	this.getElementFromSelector(".shape-text-bold").checked = this.properties.fontBold;
    	this.getElementFromSelector(".shape-text-italic").checked = this.properties.fontItalic;
    	this.getElementFromSelector(".shape-text-underline").checked = this.properties.fontUnderline;
    };
    
    getShapePropertiesFromUI(){
        this.properties.text = this.getElementFromSelector(".shape-label").value;
        this.properties.description = this.getElementFromSelector(".shape-description").value;
        this.properties.fontFamily = this.getElementFromSelector(".shape-font-family").value;
        this.properties.fontSize = Number(this.getElementFromSelector(".shape-font-size").value);
        this.properties.strokeColor = this.getElementFromSelector(".shape-stroke-color").value;
        this.properties.fillColor = this.getElementFromSelector(".shape-fill-color").value;
        this.properties.fontColor = this.getElementFromSelector(".shape-font-color").value;
        this.properties.fontBold = this.getElementFromSelector(".shape-text-bold").checked;
        this.properties.fontItalic = this.getElementFromSelector(".shape-text-italic").checked;
        this.properties.fontUnderline = this.getElementFromSelector(".shape-text-underline").checked;
    };
    
    updateShapeDetails(){
       var valueObject =  this.cell.getValue();
       valueObject.setAttribute('label', this.properties.text);
       valueObject.setAttribute('description', this.properties.description);
       valueObject.setAttribute('notes', JSON.stringify(this.notesList));
       valueObject.setAttribute('actions', JSON.stringify(this.actionsList));
       valueObject.setAttribute('evidence', JSON.stringify(this.evidenceList));
       
       var fontStyle = 0;
       if(this.properties.fontBold){
           fontStyle += 1;
       }
       if(this.properties.fontItalic){
           fontStyle += 2;
       }
       if(this.properties.fontUnderline){
           fontStyle += 4;
       }
       
        var style = this.cell.getStyle();
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTFAMILY, this.properties.fontFamily);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTSIZE, this.properties.fontSize);
        style = mxUtils.setStyle(style, mxConstants.STYLE_STROKECOLOR, this.properties.strokeColor);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FILLCOLOR, this.properties.fillColor);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTCOLOR, this.properties.fontColor);
        style = mxUtils.setStyle(style, mxConstants.STYLE_FONTSTYLE, fontStyle);
      
        this.graph.getModel().beginUpdate();
        try
        { 
            this.graph.model.setValue(this.cell, valueObject); 
            this.graph.setCellStyle(style,[this.cell]);
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    showCellOverlays(cell){
        var shapeDetailsBuilder = this;
        var overlay1 = new mxCellOverlay(new mxImage(GraphSettings.imagesRoot() + 'notes.png', 16, 16), 'Click for Notes');
        var overlay2 = new mxCellOverlay(new mxImage(GraphSettings.imagesRoot() + 'actions.png', 16, 16), 'Click for Actions');
        var overlay3 = new mxCellOverlay(new mxImage(GraphSettings.imagesRoot() + 'evidence.png', 16, 16), 'Click for Evidence');
        
        overlay1.verticalAlign = mxConstants.ALIGN_BOTTOM;
        overlay2.verticalAlign = mxConstants.ALIGN_MIDDLE;
        overlay3.verticalAlign = mxConstants.ALIGN_TOP;
        
        overlay1.addListener(mxEvent.CLICK, function(sender, evt)
        {
            shapeDetailsBuilder.buildDetails(cell);
        });
        overlay2.addListener(mxEvent.CLICK, function(sender, evt)
        {
            shapeDetailsBuilder.buildDetails(cell);
        });
        overlay3.addListener(mxEvent.CLICK, function(sender, evt)
        {
             shapeDetailsBuilder.buildDetails(cell);
        });
        
        this.graph.getModel().beginUpdate();
        try
        { 
            this.graph.removeCellOverlays(cell);
            if(this.notesList.length > 0){
                this.graph.addCellOverlay(cell, overlay1);
            };
            if(this.actionsList.length > 0){
                this.graph.addCellOverlay(cell, overlay2);
            };
            if(this.evidenceList.length > 0){
                this.graph.addCellOverlay(cell, overlay3);
            };
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    }
    
    getElementFromSelector(selector){
    	return Utils.$('#overlay ' + selector).get(0);
    };
    
    static Properties() {
        return {
            text : "",
            description : "",
            fontFamily : "",
            fontSize : "",
            strokeColor : "",
            fillColor : "",
            fontColor : "",
            fontBold : false,
            fontItalic : false,
            fontUnderline : false
        };
    };
    
    static Note() {
        return {
            id : "",
            description : "",
            comments : ""
        };
    };
    
    static Action() {
        return {
            id : "",
            description : "",
            assignedTo : "",
            resources : "",
            startDate : "",
            endDate : ""
        };
    };
    
    static Evidence() {
        return {
            id : "",
            description : "",
            documentType : "",
            people : "",
            date : ""
        };
    };
}






