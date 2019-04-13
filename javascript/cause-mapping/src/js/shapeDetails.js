class ShapeDetails{
    
    notes;
    actions;
    evidence;
    initComplete;
    
    constructor(){
      this.notes = [];
      this.actions = [];
      this.evidence = [];
      this.initComplete = false;
    };
    
    addNote(){
        this.notes.push(new ShapeDetails.Note());
    }
    
    addAction(){
        this.actions.push(new ShapeDetails.Action());
    }
    
    addEvidence(){
        this.evidence.push(new ShapeDetails.Evidence());
    }
    
    buildDetails(){
        var dialog = $("#shape-details").get(0);
        dialog.opened = true;
        $('#overlay').addClass("shape-details");
        
        this.bindGrids();
        if(!this.initComplete){
            this.assignEventHandlers();
            this.initComplete = true;
        }
        
    };
    
    bindGrids(){
        var notesGrid = $('#overlay #shape-notes-grid').get(0);
        notesGrid.items = this.notes;
        notesGrid.clearCache();
        
        var actionsGrid = $('#overlay #shape-actions-grid').get(0);
        actionsGrid.items = this.actions;
        actionsGrid.clearCache();
        
        var evidenceGrid = $('#overlay #shape-evidence-grid').get(0);
        evidenceGrid.items = this.evidence;
        evidenceGrid.clearCache();
    };
    
    assignEventHandlers(){
        var notesGrid = $('#overlay #shape-notes-grid').get(0);
        var actionsGrid = $('#overlay #shape-actions-grid').get(0);
        var evidenceGrid = $('#overlay #shape-evidence-grid').get(0);
        
        var vsNotes = $('#overlay #vertical-layout-notes');
        var vsActions = $('#overlay #vertical-layout-actions');
        var vsEvidence = $('#overlay #vertical-layout-evidence');
        
        var btnNotes = $('#overlay #shape-notes-button');
        var btnActions = $('#overlay #shape-actions-button');
        var btnEvidence = $('#overlay #shape-evidence-button');
        
        var btnAddNote = $('#overlay #add-shape-note');
        var btnAddAction = $('#overlay #add-shape-action');
        var btnAddEvidence = $('#overlay #add-shape-evidence');
        
        
        btnNotes.click(function(){
            vsNotes.toggle(true);
            vsActions.toggle(false);
            vsEvidence.toggle(false);
        });
        
        btnActions.click(function(){
            vsNotes.toggle(false);
            vsActions.toggle(true);
            vsEvidence.toggle(false);
        });
        
        btnEvidence.click(function(){
            vsNotes.toggle(false);
            vsActions.toggle(false);
            vsEvidence.toggle(true);
        });
        
        var shapeDetails = this;
        
        btnAddNote.click(function(){
            var button = this;
            button.disabled = true;
            shapeDetails.addNote();
            notesGrid.clearCache();
            setTimeout(function(){
                button.disabled = false;
                var index = notesGrid.items.length-1;
                var deleteButton = $('#overlay #shape-notes-grid #delete-note-' + index).get(0);
                shapeDetails.assignDeleteHandler(index, deleteButton, notesGrid);
            }, 500);
        });
        
        btnAddAction.click(function(){
            var button = this;
            button.disabled = true;
            shapeDetails.addAction();
            actionsGrid.clearCache();
            setTimeout(function(){
                button.disabled = false;
                var index = actionsGrid.items.length-1;
                var deleteButton = $('#overlay #shape-actions-grid #delete-action-' + index).get(0);
                shapeDetails.assignDeleteHandler(index, deleteButton, actionsGrid);
            }, 500);
        });
        
        btnAddEvidence.click(function(){
            var button = this;
            button.disabled = true;
            shapeDetails.addEvidence();
            evidenceGrid.clearCache();
            setTimeout(function(){
                button.disabled = false;
                var index = evidenceGrid.items.length-1;
                var deleteButton = $('#overlay #shape-evidence-grid #delete-evidence-' + index).get(0);
                shapeDetails.assignDeleteHandler(index, deleteButton, evidenceGrid);
            }, 500);
            
        });
        
        vsActions.toggle(false);
        vsEvidence.toggle(false);
        
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
        deleteButton.addEventListener('click', function() {
            grid.items.splice(index, 1);
            grid.clearCache();
        });
    }
}

ShapeDetails.Note = class Note{
    id = "";
    description = "";
    comments = "";
};

ShapeDetails.Action = class Action{
    id = "";
    description = "";
    assignTo = "";
    resources = "";
    startDate = "";
    endDate = "";
};

ShapeDetails.Evidence =  class Evidence{
    id = "";
    description = "";
    documentType = "";
    people = "";
    date = "";
};




