class ShapeProperty{
    
    constructor(){
        this.xLocation;
        this.yLocation;
        this.width;
        this.height;
        this.fontSize;
        this.fontColor;
        this.strokeColor;
        this.fillColor;
    };
    
    getShapeProperties(){
        var shapeProperties = [];

        shapeProperties.push({label: 'x-location', value: this.xLocation + 'px', color:'#fff'});
        shapeProperties.push({label: 'y-location', value: this.yLocation + 'px', color:'#fff'});
        shapeProperties.push({label: 'width', value: this.width + 'px', color:'#fff'});
        shapeProperties.push({label: 'height', value: this.height + 'px', color:'#fff'});
        shapeProperties.push({label: 'font-size', value: this.fontSize + 'px', color:'#fff'});
        shapeProperties.push({label: 'font-color', value: this.fontColor, color:this.fontColor});
        shapeProperties.push({label: 'stroke-color', value: this.strokeColor, color:this.strokeColor});
        shapeProperties.push({label: 'fill-color', value: this.fillColor, color:this.fillColor});
     
        return shapeProperties;
    };

    setShapeProperties(graph, cell){
        var cellGeometry;
        
        if(cell.isEdge()){
            cellGeometry = graph.getView().getState(cell,false).cellBounds;
        }else{
            cellGeometry = cell.getGeometry();
        }
        
        this.xLocation = Math.round(cellGeometry.x);
        this.yLocation = Math.round(cellGeometry.y);
        this.width = Math.round(cellGeometry.width);
        this.height = Math.round(cellGeometry.height);
       
        var styleComponents = cell.getStyle().split(";");
        for(var i=0;i<styleComponents.length;i++){
            var styleName = ""; var styleValue = "-";
            if(styleComponents[i].indexOf('=') > 0){
                styleName = styleComponents[i].split('=')[0];
                styleValue = styleComponents[i].split('=')[1].split(";")[0];
            };
            switch(styleName){
                case "fontSize":
                    this.fontSize = styleValue;
                    break; 
                case "fontColor":
                    this.fontColor = styleValue;
                    break; 
                case "strokeColor":
                    this.strokeColor = styleValue;
                    break; 
                case "fillColor":
                    this.fillColor = styleValue;
                    break; 
            };
        };
    };
}


