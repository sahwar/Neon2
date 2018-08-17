/**
 * Handle the dragging of musical elements and communicate actions.
 * @constructor
 * @param {NeonView} neonView - The NeonView parent object.
 */
function DragHandler (neonView) {
    var dragStartCoords;
    var dragEndCoords;

    /**
     * Initialize the dragging action and handler for selected elements.
     */
    function dragInit () {
        // Adding listeners
        var dragBehaviour = d3.drag().on("start", dragStarted)
            .on("drag", dragging)
            .on("end", dragEnded);

        var activeNc = d3.selectAll(".selected");
        var selection = Array.from(activeNc._groups[0]);

        dragStartCoords = new Array(activeNc.length);
        dragEndCoords = new Array(activeNc.length);

        activeNc.call(dragBehaviour);

        var editorAction;

        // Drag effects
        function dragStarted () {
            dragStartCoords = d3.mouse(this);
        }

        function dragging () {
            var relativeY = d3.event.y - dragStartCoords[1];
            var relativeX = d3.event.x - dragStartCoords[0];

            selection.forEach((el) => {
                d3.select(el).attr("transform", function() {
                    return "translate(" + [relativeX, relativeY] + ")"
                })
            })
        }

        function dragEnded () {
            dragEndCoords = [d3.event.x, d3.event.y];
            var xdiff = dragEndCoords[0] - dragStartCoords[0];
            var ydiff = dragEndCoords[1] - dragStartCoords[1];
            let paramArray = [];
            var intersect = false;
            var inEl = false;
            
            selection.forEach((el) => {
                let singleAction = { action: 'drag', param: { elementId: el.id,
                    x: parseInt(xdiff),
                    y: parseInt(ydiff * -1) }
                };
                paramArray.push(singleAction);

                //check for overlap of nc elements upon drag
                var bbox = el.getBBox();
                var l = bbox.x + xdiff;
                var r = bbox.x + bbox.width + xdiff;
                var t = bbox.y + ydiff;
                var b = bbox.y + bbox.height - (ydiff);
    
                var layerParent = $(el).closest(".layer");
            
                if(layerParent.length == 1){
                    var ncChildren = Array.from($(layerParent).find(".nc"));
                    ncChildren.forEach(nc => { 
                        if($(el).hasClass("nc")){
                            inEl = el.id == nc.id;
                        }
                        else{
                            var elNcs = Array.from($(el).find(".nc"));
                            elNcs.forEach(elNc => {
                                inEl = elNc.id == nc.id;
                            })
                        }
                        if(!inEl){
                            var ncBBox = nc.getBBox();
                            var ncL = ncBBox.x;
                            var ncR = ncBBox.x + ncBBox.width;
                            var ncT = ncBBox.y;
                            var ncB = ncBBox.y + ncBBox.height;
        
                            var horizIntersect = l < ncR && r > ncL;
                            var vertIntersect = t < ncB && b > ncT;
        
                            if(horizIntersect && vertIntersect) {
                                console.log("intersect!")
                                intersect=true;
                            }
                        }
                    })
                }
            });
            editorAction = {
                "action": "chain",
                "param": paramArray
            };

            if(Math.abs(xdiff) > 5 || Math.abs(ydiff) > 5){
                if(!intersect){
                    neonView.edit(editorAction);
                }
                neonView.refreshPage();
                endOptionsSelection();
            }
            else{
                neonView.refreshPage();
                endOptionsSelection();
            }
            
            dragInit();
        }
    }

    function endOptionsSelection () {
        $("#moreEdit").empty();
        $("#moreEdit").addClass("is-invisible");
    }

    function checkIntersection(selection) {
        var intersect = false;
        selection.forEach(el => {
            var bbox = el.getBBox();
            var l = bbox.x;
            var r = bbox.x + bbox.width;
            var t = bbox.y;
            var b = bbox.y + bbox.height;

            //console.log(l + ", " + r + ", " + t + ", " + b);

            var layerParent = $(el).closest(".layer");
        
            if(layerParent.length == 1){
                var ncChildren = Array.from($(layerParent).find(".nc"));
                
                ncChildren.map(nc => {
                    if(el.id != nc.id){
                        var ncBBox = nc.getBBox();
                        var ncL = ncBBox.x;
                        var ncR = ncBBox.x + ncBBox.width;
                        var ncT = ncBBox.y;
                        var ncB = ncBBox.y + ncBBox.height;
    
                        //console.log(ncL + ", " + ncR + ", " + ncT + ", " + ncB);
    
                        var horizIntersect = l < ncR && r > ncL;
                        var vertIntersect = t < ncB && b > ncT;
    
                        if(horizIntersect && vertIntersect) {
                            console.log("intersect!");
                        }
                    }
                })
            }
        
        })
    }

    DragHandler.prototype.dragInit = dragInit;
}

export {DragHandler as default};
