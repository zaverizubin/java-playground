function Constants(){}

Constants.CENTERBONE_VERTEX = "center-vertex";

Constants.SIDEBONE_VERTEX = "side-vertex";

Constants.CENTERBONE_EDGE =  "center-edge";

Constants.SIDEBONE_EDGE =  "side-edge";

Constants.LATERALBONE_EDGE =  "lateral-edge";


Constants.STYLE_MAP = new Map();

Constants.STYLE_MAP.set(Constants.CENTERBONE_VERTEX, 'movable=1;resizable=1;selectable=1;');

Constants.STYLE_MAP.set(Constants.SIDEBONE_VERTEX, 'movable=1;resizable=1;shape=ellipse;');

Constants.STYLE_MAP.set(Constants.CENTERBONE_EDGE, 'curved=1;endArrow=classic;html=1;movable=0;resizable=0;selectable=1;');

Constants.STYLE_MAP.set(Constants.SIDEBONE_EDGE, 'endArrow=classic;html=1;movable=0;resizable=0;selectable=1;');

Constants.STYLE_MAP.set(Constants.LATERALBONE_EDGE, 'endArrow=classic;html=1verticalAlign=bottom;verticalLabelPosition=bottom;movable=0;resizable=0;selectable=1;');


