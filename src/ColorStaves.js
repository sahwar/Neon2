// Color staff lines and their children so it's easy to see which components belong to which staff

export default class ColorStaves {
    setColor() {
        let staves = Array.from(document.getElementsByClassName("staff"));
        for (var i = 0; i < staves.length; i++) {
            let staffColor = ColorStaves.Colors[i % ColorStaves.Colors.length];
            let children = Array.from($("#" + staves[i].id).children());
            children.forEach(child => {
                if (child.tagName === "path") {
                    child.setAttribute("stroke", staffColor);
                } else {
                    child.setAttribute("fill", staffColor);
                }
                child.setAttribute("class", child.getAttribute("class") + " highlighted");
            });
        }
    }
    unsetColor() {
        let highlighted = Array.from(document.getElementsByClassName("highlighted"));
        highlighted.forEach(elem => {
            if (elem.tagName === "path") {
                elem.setAttribute("stroke", "#000000");
            } else {
                elem.removeAttribute("fill");
            }
        });
        $(".highlighted").removeClass("highlighted");
    }
}

// Color palette from Figure 2 (Colors optimized for color-blind
// individuals) from "Points of view: Color blindness" by Bang Wong
// published in Nature Methods volume 8 on 27 May 2011
// https://www.nature.com/articles/nmeth.1618?WT.ec_id=NMETH-201106
ColorStaves.Colors = [
    "rgb(0,0,0)",
    "rgb(230, 159, 0)",
    "rgb(86, 180, 233)",
    "rgb(0, 158, 115)",
    "rgb(240, 228, 66)",
    "rgb(0, 114, 178)",
    "rgb(213, 94, 0)",
    "rgb(204, 121, 167)"
];
