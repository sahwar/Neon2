export default function ViewControls (zoomHandler) {

    setZoomControls();
    setOpacityControls();
    setBackgroundOpacityControls();

    function setZoomControls() {
        $("#reset-zoom").click( function() {
            $("#zoomOutput").val(100);
            $("#zoomSlider").val(100);
            zoomHandler.resetZoomAndPan();
        });

        $(document).on('input change', '#zoomSlider', function () {
            zoomHandler.zoomTo($("#zoomOutput").val() / 100.0)
        })
    }

    // TODO: Potentially separate opacity into its own js file as well? similar to zoom
    // Though as it stands its pretty small so it might be fine here
    function setOpacityControls() {
        $("#reset-opacity").click( function() {
            // Definition scale is the root element of what is generated by verovio
            $(".definition-scale").css("opacity", 1);

            $("#opacitySlider").val(100);
            $("#opacityOutput").val(100);
        })

        $(document).on('input change', '#opacitySlider', setOpacityFromSlider);
    }

    function setBackgroundOpacityControls() {
        $("#reset-bg-opacity").click( function() {
            $("#bgimg").css("opacity", 1);

            $("#bgOpacitySlider").val(100);
            $("#bgOpacityOutput").val(100);
        })

        $(document).on('input change', '#bgOpacitySlider', function () {
            $("#bgimg").css("opacity", $("#bgOpacityOutput").val() / 100.0);
        });
    }

    function shouldHideText() {
        return (!$("#displayText").is(":checked"));
    }

    function setSylControls(view) {
        $("#displayText").click( function () {
            view.refreshPage();
        });
    }

    function setOpacityFromSlider() {
        $(".definition-scale").css("opacity", $("#opacityOutput").val() / 100.0);
    };

    ViewControls.prototype.constructor = ViewControls;
    ViewControls.prototype.setZoomControls = setZoomControls;
    ViewControls.prototype.setOpacityControls = setOpacityControls;
    ViewControls.prototype.setBackgroundOpacityControls = setBackgroundOpacityControls;
    ViewControls.prototype.shouldHideText = shouldHideText;
    ViewControls.prototype.setSylControls = setSylControls;
    ViewControls.prototype.setOpacityFromSlider = setOpacityFromSlider;
}
