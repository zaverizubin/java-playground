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
        this.strokeWidth;
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
        shapeProperties.push({label: 'stroke-width', value: this.strokeWidth + 'px', color:'#fff'});

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
        this.fontSize =  (cell.getStyle().indexOf("fontSize") >=0)  
                                    ? cell.getStyle().split("fontSize=")[1].split(";")[0]
                                    :"-";

        this.fontColor = (cell.getStyle().indexOf("fontColor") >=0) 
                                    ? cell.getStyle().split("fontColor=")[1].substr(0,7)
                                    :"#fff";

        this.strokeColor = (cell.getStyle().indexOf("strokeColor") >=0)
                                    ? cell.getStyle().split("strokeColor=")[1].substr(0,7)
                                    : "#fff";

        this.fillColor = (cell.getStyle().indexOf("fillColor") >=0)
                                    ? cell.getStyle().split("fillColor=")[1].substr(0,7)  
                                    : "#fff";

        this.strokeWidth = (cell.getStyle().indexOf("strokeWidth") >=0)
                                    ? cell.getStyle().split("strokeWidth=")[1].substr(0,1)
                                    :"-";
    };
}


