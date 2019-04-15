class ShapeDetailsBuilder{
    
    notesList;
    actionsList;
    evidenceList;
    
    initComplete;
    
    notesGrid;
    actionsGrid;
    evidenceGrid;
    
    graph;
    cell;
    
    constructor(graph){
        this.graph = graph;
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
        
        var shapeDetailsBuilder = this;
        var dialog = $("#shape-details").get(0);
        dialog.opened = true;
        $('#overlay').addClass("shape-details");
        
        this.getShapeDetails();
        this.bindGrids();
        if(!this.initComplete){
            
        }
        setTimeout(function(){
            shapeDetailsBuilder.assignEventHandlers();
            shapeDetailsBuilder.initComplete = true;
        }, 500);
        
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
        
        var vsNotes = $('#overlay #vertical-layout-notes');
        var vsActions = $('#overlay #vertical-layout-actions');
        var vsEvidence = $('#overlay #vertical-layout-evidence');
        
        vsNotes.toggle(true);
        vsActions.toggle(false);
        vsEvidence.toggle(false);
    };
    
    assignEventHandlers(){
        var shapeDetailsBuilder = this;
        
        var dialog = $("#shape-details").get(0);
        dialog.addEventListener('opened-changed', function(event){
            if(event.detail.value === false){
                shapeDetailsBuilder.updateShapeDetails();
            };
        });
        
        var vsNotes = $('#overlay #vertical-layout-notes');
        var vsActions = $('#overlay #vertical-layout-actions');
        var vsEvidence = $('#overlay #vertical-layout-evidence');
        
        var notesGrid = $('#overlay #shape-notes-grid').get(0);
        var actionsGrid = $('#overlay #shape-actions-grid').get(0);
        var evidenceGrid = $('#overlay #shape-evidence-grid').get(0);
        
        var btnNotes = $('#overlay #shape-notes-button').get(0);
        var btnActions = $('#overlay #shape-actions-button').get(0);
        var btnEvidence = $('#overlay #shape-evidence-button').get(0);
        
        var btnAddNote = $('#overlay #add-shape-note').get(0);
        var btnAddAction = $('#overlay #add-shape-action').get(0);
        var btnAddEvidence = $('#overlay #add-shape-evidence ').get(0);
        
        if(btnNotes.onclick === null){
            btnNotes.onclick = function(){
                vsNotes.toggle(true);
                vsActions.toggle(false);
                vsEvidence.toggle(false);
            };
        }
        
        if(btnActions.onclick === null){
            btnActions.onclick = function(){
                vsNotes.toggle(false);
                vsActions.toggle(true);
                vsEvidence.toggle(false);
            };
        };
        
        if(btnEvidence.onclick === null){
            btnEvidence.onclick = function(){
                vsNotes.toggle(false);
                vsActions.toggle(false);
                vsEvidence.toggle(true);
            };
        };
        
    
        
        if(btnAddNote.onclick === null){
            btnAddNote.onclick = function(){
                var button = this;
                button.disabled = true;
                shapeDetailsBuilder.addNote();
                notesGrid.clearCache();
                setTimeout(function(){
                    button.disabled = false;
                    var index = notesGrid.items.length-1;
                    var deleteButton = $('#overlay #shape-notes-grid #delete-note-' + index).get(0);
                    shapeDetailsBuilder.assignDeleteHandler(index, deleteButton, notesGrid);
                }, 500);
            };
        }
        
        if(btnAddAction.onclick === null){
            btnAddAction.onclick = function(){
                var button = this;
                button.disabled = true;
                shapeDetailsBuilder.addAction();
                actionsGrid.clearCache();
                setTimeout(function(){
                    button.disabled = false;
                    var index = actionsGrid.items.length-1;
                    var deleteButton = $('#overlay #shape-actions-grid #delete-action-' + index).get(0);
                    shapeDetailsBuilder.assignDeleteHandler(index, deleteButton, actionsGrid);
                }, 500);
            };
        };
        
        if(btnAddEvidence.onclick === null){
            btnAddEvidence.onclick = function(){
                var button = this;
                button.disabled = true;
                shapeDetailsBuilder.addEvidence();
                evidenceGrid.clearCache();
                setTimeout(function(){
                    button.disabled = false;
                    var index = evidenceGrid.items.length-1;
                    var deleteButton = $('#overlay #shape-evidence-grid #delete-evidence-' + index).get(0);
                    shapeDetailsBuilder.assignDeleteHandler(index, deleteButton, evidenceGrid);
                }, 500);

            };
        };
        
        
        for(let i = 0; i < notesGrid.items.length; i++){
            var deleteButton = $('#overlay #shape-notes-grid #delete-note-' + i).get(0);
            this.assignDeleteHandler(i, deleteButton, notesGrid);
        };
        for(let i = 0; i < actionsGrid.items.length; i++){
            var deleteButton = $('#overlay #shape-actions-grid #delete-action-' + i).get(0);
            this.assignDeleteHandler(i, deleteButton, actionsGrid);
        };
        for(let i = 0; i < evidenceGrid.items.length; i++){
            var deleteButton = $('#overlay #shape-evidence-grid #delete-evidence-' + i).get(0);
            this.assignDeleteHandler(i, deleteButton, evidenceGrid);
        };
    }
    
    assignDeleteHandler(index, deleteButton,  grid){
        var shapeDetailsBuilder = this;
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
    
    getShapeDetails(){
        var valueObject =  this.cell.getValue();
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
    }
    
    updateShapeDetails(){
       var valueObject =  this.cell.getValue();
       valueObject.setAttribute('notes', JSON.stringify(this.notesList));
       valueObject.setAttribute('actions', JSON.stringify(this.actionsList));
       valueObject.setAttribute('evidence', JSON.stringify(this.evidenceList));
       this.cell.setValue(valueObject);
    };
}

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




