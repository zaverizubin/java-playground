function GraphSettings(){}

GraphSettings.CANVAS_WIDTH = 1220;
GraphSettings.CANVAS_HEIGHT = 700;

GraphSettings.DEFAULT_CENTERBONE_VERTEX_SHAPE = "rectangle";
GraphSettings.DEFAULT_SIDEBONE_VERTEX_SHAPE = "ellipse";
GraphSettings.DEFAULT_MARGIN_H = 75;
GraphSettings.DEFAULT_MARGIN_V = 0;
GraphSettings.DEFAULT_CENTERBONE_SPACER_H = 75;
GraphSettings.DEFAULT_CENTERBONE_SEGMENT_LENGTH = 175;
GraphSettings.DEFAULT_CENTERBONE_VERTEX_WIDTH = 100;
GraphSettings.DEFAULT_CENTERBONE_VERTEX_HEIGHT = 60;
GraphSettings.DEFAULT_SIDEBONE_SPACER_V = 50;
GraphSettings.DEFAULT_SIDEBONE_SEGMENT_LENGTH = 50;
GraphSettings.DEFAULT_SIDEBONE_VERTEX_WIDTH = 150;
GraphSettings.DEFAULT_SIDEBONE_VERTEX_HEIGHT = 35;
GraphSettings.DEFAULT_LATERALBONE_SPACER_H = 50;
GraphSettings.DEFAULT_LATERALBONE_SEGMENT_LENGTH = 50;
GraphSettings.DEFAULT_AUXILLARYBONE_SEGMENT_LENGTH = 35;
GraphSettings.DEFAULT_THETA = 60;


GraphSettings.CENTERBONE_VERTEX = "center-vertex";
GraphSettings.SIDEBONE_VERTEX = "side-vertex";
GraphSettings.CENTERBONE_EDGE =  "center-edge";
GraphSettings.SIDEBONE_EDGE =  "side-edge";
GraphSettings.LATERALBONE_EDGE =  "lateral-edge";
GraphSettings.AUXILLARYBONE_EDGE =  "auxillary-edge";

GraphSettings.buildStyleMap = function(){
    GraphSettings.STYLE_MAP = new Map();
    GraphSettings.STYLE_MAP.set(GraphSettings.CENTERBONE_VERTEX, 'movable=0;resizable=1;selectable=1;shape='+ GraphSettings.CENTERBONE_VERTEX_SHAPE+";");
    GraphSettings.STYLE_MAP.set(GraphSettings.SIDEBONE_VERTEX, 'movable=0;resizable=1;shape='+ GraphSettings.SIDEBONE_VERTEX_SHAPE+";");
    GraphSettings.STYLE_MAP.set(GraphSettings.CENTERBONE_EDGE, 'curved=1;endArrow=classic;html=1;movable=0;resizable=0;selectable=1;');
    GraphSettings.STYLE_MAP.set(GraphSettings.SIDEBONE_EDGE, 'endArrow=classic;html=1;movable=0;resizable=0;selectable=1;');
    GraphSettings.STYLE_MAP.set(GraphSettings.LATERALBONE_EDGE, 'startArrow=classic;endArrow=none;html=1;verticalAlign=bottom;movable=0;resizable=0;selectable=1;');
    GraphSettings.STYLE_MAP.set(GraphSettings.AUXILLARYBONE_EDGE, 'startArrow=none;endArrow=classic;html=1;movable=0;resizable=0;selectable=1;');
    
};

GraphSettings.restoreDefaults = function(){
    GraphSettings.CENTERBONE_VERTEX_SHAPE = GraphSettings.DEFAULT_CENTERBONE_VERTEX_SHAPE;
    GraphSettings.SIDEBONE_VERTEX_SHAPE = GraphSettings.DEFAULT_SIDEBONE_VERTEX_SHAPE;
    GraphSettings.MARGIN_V = GraphSettings.DEFAULT_MARGIN_V;
    GraphSettings.MARGIN_H = GraphSettings.DEFAULT_MARGIN_H;
    GraphSettings.CENTERBONE_SPACER_H = GraphSettings.DEFAULT_CENTERBONE_SPACER_H;
    GraphSettings.CENTERBONE_SEGMENT_LENGTH = GraphSettings.DEFAULT_CENTERBONE_SEGMENT_LENGTH;
    GraphSettings.CENTERBONE_VERTEX_WIDTH = GraphSettings.DEFAULT_CENTERBONE_VERTEX_WIDTH;
    GraphSettings.CENTERBONE_VERTEX_HEIGHT = GraphSettings.DEFAULT_CENTERBONE_VERTEX_HEIGHT;
    GraphSettings.SIDEBONE_SPACER_V = GraphSettings.DEFAULT_SIDEBONE_SPACER_V;
    GraphSettings.SIDEBONE_SEGMENT_LENGTH = GraphSettings.DEFAULT_SIDEBONE_SEGMENT_LENGTH;
    GraphSettings.SIDEBONE_VERTEX_WIDTH = GraphSettings.DEFAULT_SIDEBONE_VERTEX_WIDTH;
    GraphSettings.SIDEBONE_VERTEX_HEIGHT = GraphSettings.DEFAULT_SIDEBONE_VERTEX_HEIGHT;
    GraphSettings.LATERALBONE_SPACER_H = GraphSettings.DEFAULT_LATERALBONE_SPACER_H;
    GraphSettings.LATERALBONE_SEGMENT_LENGTH = GraphSettings.DEFAULT_LATERALBONE_SEGMENT_LENGTH;
    GraphSettings.AUXILLARYBONE_SEGMENT_LENGTH = GraphSettings.DEFAULT_AUXILLARYBONE_SEGMENT_LENGTH;
    GraphSettings.THETA = GraphSettings.DEFAULT_THETA;
    
    GraphSettings.buildStyleMap();
};
