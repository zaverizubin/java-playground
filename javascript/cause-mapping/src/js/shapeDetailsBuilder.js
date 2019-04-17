class ShapeDetailsBuilder{
    
    properties;
    
    notesList;
    actionsList;
    evidenceList;
    
    notesGrid;
    actionsGrid;
    evidenceGrid;
    
    graph;
    cell;
    
    constructor(graph){
        this.graph = graph;
        this.properties = new ShapeDetailsBuilder.Properties();
        this.notesList = [];
        this.actionsList = [];
        this.evidenceList = [];
        this.initComplete = false;
    };
    
    addNote(){
        var note = new ShapeDetailsBuilder.Note();
        note.id = this.notesList.length + 1;
        this.notesList.push(note);
        this.notesGrid.clearCache();
    }
    
    addAction(){
        var action = new ShapeDetailsBuilder.Action();
        action.id = this.actionsList.length + 1;
        this.actionsList.push(action);
        this.actionsGrid.clearCache();
    }
    
    addEvidence(){
        var evidence = new ShapeDetailsBuilder.Evidence();
        evidence.id = this.evidenceList.length + 1;
        this.evidenceList.push(evidence);
        this.evidenceGrid.clearCache();
    }
    
    buildDetails(cell){
        this.cell = cell;
        
        this.openDialog();
        this.getShapeDetails(this.cell);
        this.getStyleDetails(this.cell);
        this.setShapePropertiesToUI();
        this.bindGrids();
        
        var shapeDetailsBuilder = this;
        setTimeout(function(){
            shapeDetailsBuilder.assignEventHandlers();
        }, 500);
        
    };
    
    openDialog(){
        var dialog = $("#shape-details").get(0);
        dialog.opened = true;
        $('#overlay').addClass("shape-details");
        
        var vsProperties = $('#overlay #vertical-layout-properties');
        var vsNotes = $('#overlay #vertical-layout-notes');
        var vsActions = $('#overlay #vertical-layout-actions');
        var vsEvidence = $('#overlay #vertical-layout-evidence');
        
        vsProperties.toggle(true);
        vsNotes.toggle(false);
        vsActions.toggle(false);
        vsEvidence.toggle(false);
    };
    
    bindGrids(){
        this.notesGrid = $('#overlay #shape-notes-grid').get(0);
        this.actionsGrid = $('#overlay #shape-actions-grid').get(0);
        this.evidenceGrid = $('#overlay #shape-evidence-grid').get(0);
        
        this.notesGrid.items = this.notesList;
        this.notesGrid.clearCache();
                
        this.actionsGrid.items = this.actionsList;
        this.actionsGrid.clearCache();
                
        this.evidenceGrid.items = this.evidenceList;
        this.evidenceGrid.clearCache();
       
    };
    
    assignEventHandlers(){
        var shapeDetailsBuilder = this;
        
        var dialog = $("#shape-details").get(0);
        dialog.addEventListener('opened-changed', function(event){
            if(event.detail.value === false){
                shapeDetailsBuilder.getShapePropertiesFromUI();
                shapeDetailsBuilder.updateShapeDetails();
                shapeDetailsBuilder.showCellOverlays(shapeDetailsBuilder.cell);
            };
        });
        
        var btnClose = $('#shape-details-close-button').get(0);
        if(btnClose.onclick === null){
           btnClose.onclick = function(){
              dialog.opened = false; 
           };
        }
        
        var btnProperties = $('#overlay #shape-properties-button').get(0);
        var btnNotes = $('#overlay #shape-notes-button').get(0);
        var btnActions = $('#overlay #shape-actions-button').get(0);
        var btnEvidence = $('#overlay #shape-evidence-button').get(0);
        
        var btnAddNote = $('#overlay #add-shape-note').get(0);
        var btnAddAction = $('#overlay #add-shape-action').get(0);
        var btnAddEvidence = $('#overlay #add-shape-evidence ').get(0);
        
        
        this.assignShowUnitClickHandler(btnProperties);
        this.assignShowUnitClickHandler(btnNotes);
        this.assignShowUnitClickHandler(btnActions);
        this.assignShowUnitClickHandler(btnEvidence);
        
        this.assignAddDetailClickHandler(btnAddNote, "#shape-notes-grid", shapeDetailsBuilder.addNote);
        this.assignAddDetailClickHandler(btnAddAction, "#shape-actions-grid", shapeDetailsBuilder.addAction);
        this.assignAddDetailClickHandler(btnAddEvidence, "#shape-evidence-grid", shapeDetailsBuilder.addEvidence);
        
        this.assignDeleteGridItemHandler("#shape-notes-grid");
        this.assignDeleteGridItemHandler("#shape-actions-grid");
        this.assignDeleteGridItemHandler("#shape-evidence-grid");
        
    }
    
    assignShowUnitClickHandler(button){
        
        var btnProperties = $('#overlay #shape-properties-button').get(0);
        var btnNotes = $('#overlay #shape-notes-button').get(0);
        var btnActions = $('#overlay #shape-actions-button').get(0);
        var btnEvidence = $('#overlay #shape-evidence-button').get(0);
         
        var vsProperties = $('#overlay #vertical-layout-properties');
        var vsNotes = $('#overlay #vertical-layout-notes');
        var vsActions = $('#overlay #vertical-layout-actions');
        var vsEvidence = $('#overlay #vertical-layout-evidence');
        
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
    }
    
    assignAddDetailClickHandler(button, selector, addDetailFunction){
        
        var grid = $('#overlay ' + selector).get(0);
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
        var grid = $('#overlay ' + selector).get(0);
        for(let i = 0; i < grid.items.length; i++){
            this.assignDeleteHandler(i, selector);
        };
    };
    
    assignDeleteHandler(index,  selector){
        
        var grid = $('#overlay ' + selector).get(0);
        var shapeDetailsBuilder = this;
        var deleteButton = $('#overlay ' + selector + ' #delete-' + index).get(0);
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
        $('#overlay .shape-label').get(0).value = this.properties.text;
        $('#overlay .shape-description').get(0).value  = this.properties.description;
        $('#overlay .shape-font-family').get(0).value = this.properties.fontFamily;
        $('#overlay .shape-font-size').get(0).value = String(this.properties.fontSize);
        $('#overlay .shape-stroke-color').get(0).value = this.properties.strokeColor;
        $('#overlay .shape-fill-color').get(0).value = this.properties.fillColor;
        $('#overlay .shape-font-color').get(0).value = this.properties.fontColor;
        $('#overlay .shape-text-bold').get(0).checked = this.properties.fontBold;
        $('#overlay .shape-text-italic').get(0).checked = this.properties.fontItalic;
        $('#overlay .shape-text-underline').get(0).checked = this.properties.fontUnderline;
    };
    
    getShapePropertiesFromUI(){
        this.properties.text = $('#overlay .shape-label').get(0).value;
        this.properties.description = $('#overlay .shape-description').get(0).value;
        this.properties.fontFamily = $('#overlay .shape-font-family').get(0).value;
        this.properties.fontSize = Number($('#overlay .shape-font-size').get(0).value);
        this.properties.strokeColor = $('#overlay .shape-stroke-color').get(0).value;
        this.properties.fillColor = $('#overlay .shape-fill-color').get(0).value;
        this.properties.fontColor = $('#overlay .shape-font-color').get(0).value;
        this.properties.fontBold = $('#overlay .shape-text-bold').get(0).checked;
        this.properties.fontItalic = $('#overlay .shape-text-italic').get(0).checked;
        this.properties.fontUnderline = $('#overlay .shape-text-underline').get(0).checked;
    };
    
    updateShapeDetails(){
       var valueObject =  this.cell.getValue();
       valueObject.setAttribute('label', this.properties.text);
       valueObject.setAttribute('description', this.properties.description);
       valueObject.setAttribute('notes', JSON.stringify(this.notesList));
       valueObject.setAttribute('actions', JSON.stringify(this.actionsList));
       valueObject.setAttribute('evidence', JSON.stringify(this.evidenceList));
       this.cell.setValue(valueObject);
       
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
       
       this.graph.setCellStyle(style,[this.cell]);
    };
    
    showCellOverlays(cell){
        var shapeDetailsBuilder = this;
        var overlay1 = new mxCellOverlay(new mxImage('images/notes.png', 16, 16), 'Click for Notes');
        var overlay2 = new mxCellOverlay(new mxImage('images/actions.png', 16, 16), 'Click for Actions');
        var overlay3 = new mxCellOverlay(new mxImage('images/evidence.png', 16, 16), 'Click for Evidence');
        
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
}

ShapeDetailsBuilder.Properties = class Properties{
    text = "";
    description = "";
    fontFamily = "";
    fontSize = "";
    strokeColor = "";
    fillColor = "";
    fontColor = "";
    fontBold = false;
    fontItalic = false;
    fontUnderline = false;
};

ShapeDetailsBuilder.Note = class Note{
    id = "";
    description = "";
    comments = "";
};

ShapeDetailsBuilder.Action = class Action{
    id = "";
    description = "";
    assignedTo = "";
    resources = "";
    startDate = "";
    endDate = "";
};

ShapeDetailsBuilder.Evidence =  class Evidence{
    id = "";
    description = "";
    documentType = "";
    people = "";
    date = "";
};




