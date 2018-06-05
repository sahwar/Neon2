function NavbarController(filename) { 
   
    // setup navbar listeners 
    $("#revert").on("click", function(){
        if (confirm("Reverting will cause all changes to be lost. Press OK to continue.")) {
            $.ajax({ 
                url: "/revert/" + filename, 
                type: "POST"
            })
        }
    });

    //mei download link
    $("#getmei").attr("href", '/../uploads/mei/' + filename);

    //png download setup
    var pngFile = filename.split('.', 2)[0] + ".png";
    $("#getpng").attr("href", '/../uploads/png/' + pngFile);
}
