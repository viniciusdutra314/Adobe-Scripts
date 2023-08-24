function fontresizer(string) {
    var comprimento = string.length;
    if (comprimento <= 12) {return 80;} 
    else if (comprimento <= 24) {return 70;} 
    else if (comprimento <= 36) {return 60;} 
    else if (comprimento <= 48) {return 50;} 
    else if (comprimento <= 60) {return 40;}}



var compWidth = 1920;  var compHeight = 1080;
var compDuration = 10; var compFrameRate = 30; 
var compName = "yt_"
var mycomp = app.project.items.addComp(compName, compWidth, compHeight, 1.0, compDuration, compFrameRate);
var BgFile=app.project.importFile(new ImportOptions(File("assets\\night_sky_background.mp4")))
var BgLayer=mycomp.layers.add(BgFile)
var text_title_layer=mycomp.layers.addText("After Effects Scripting Tutorial: All About Text")
var text_title=text_title_layer.property("Source Text").value
text_title.fontSize=fontresizer(text_title.text)
text_title.font="Hey Comic"
text_title_layer.property("Source Text").setValue(text_title);