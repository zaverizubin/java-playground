class DragNDrop {
    
    constructor (evt) {
        this.evt = evt;
        this.svg = evt.target;
        this.selectedElement;
        this.offset;
        this.makeDraggable();
    };
    
    makeDraggable () {
        var dnd = this;
        this.svg.addEventListener('mousedown', function(evt){dnd.startDrag(evt);});
        this.svg.addEventListener('mousemove', function(evt){dnd.drag(evt);});
        this.svg.addEventListener('mouseup', function(evt){dnd.endDrag(evt);});
        this.svg.addEventListener('mouseleave', function(evt){dnd.endDrag(evt);});
    };
    
    getMousePosition(evt) {
        var CTM = this.svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
    }
    
    startDrag(evt) {
        if (evt.target.parentNode.classList.contains('draggable')) {
          this.selectedElement = evt.target.parentNode;
          this.offset = this.getMousePosition(evt);

          // Make sure the first transform on the element is a translate transform
          var transforms = this.selectedElement.transform.baseVal;

          if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
            // Create an transform that translates by (0, 0)
            var translate = this.svg.createSVGTransform();
            translate.setTranslate(0, 0);
            this.selectedElement.transform.baseVal.insertItemBefore(translate, 0);
          }

          // Get initial translation
          this.transform = transforms.getItem(0);
          this.offset.x -= this.transform.matrix.e;
          this.offset.y -= this.transform.matrix.f;
        };
    };
    
    drag(evt) {
        if (this.selectedElement) {
            evt.preventDefault();
            var coord = this.getMousePosition(evt);
            var dx = coord.x - this.offset.x;
            var dy = coord.y - this.offset.y;

            this.transform.setTranslate(dx, dy);
        }
    };
    
    endDrag(evt) {
        this.selectedElement = false;
    }
};

