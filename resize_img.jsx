//importar imagem
var img_path = File.openDialog("Selecione uma imagem");
var img_nome=img_path.name.split(".")[0]
//criando composição
var compWidth = 1920;  var compHeight = 1080;
var compDuration = 5; var compFrameRate = 30; 
var compName = "resize_"+img_nome
var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1.0, compDuration, compFrameRate);
var img = app.project.importFile(new ImportOptions(File(img_path)))
var BgImg = myComp.layers.add(img)
var FrontImg = BgImg.duplicate()
//nomes da layers
BgImg.name="Background"
FrontImg.name="Image"
//vamos agora calcular o fator de escala
var sx=compWidth/BgImg.width; var sy=compHeight/BgImg.height
S_bg=Math.max(sx,sy)
S_fr=Math.min(sx,sy)
//vamos aplicar-lo
BgImg.property("Transform").property("Scale").setValue([S_bg,S_bg]*100)
FrontImg.property("Transform").property("Scale").setValue([S_fr,S_fr]*100)
//blur
var blurEffect = BgImg.property("Effects").addProperty("Gaussian Blur")
blurEffect.property("Blurriness").setValue(30)
//zoom animation
myComp.layers.precompose([1,2], "Zoom");
var PreComp= myComp.layer("Zoom")
PreComp.scale.setValueAtTime(0,[120,120])
PreComp.scale.setValueAtTime(2,[100,100])