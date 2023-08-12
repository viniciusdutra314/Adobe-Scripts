//importar imagem
var img_path = File.openDialog("Selecione a IMAGE");
var hightlight_path = File.openDialog("Selecione o HIGHLIGHT")
var img_name=img_path.name.split(".")[0]
//criando composição
var compWidth = 1920;  var compHeight = 1080;
var compDuration = 5; var compFrameRate = 30; 
var compName = "citation_"+img_name
var myComp = app.project.items.addComp(compName, compWidth, compHeight, 1.0, compDuration, compFrameRate);
var img = app.project.importFile(new ImportOptions(File(img_path)))
var highlight_img=app.project.importFile(new ImportOptions(File(hightlight_path)))
var paper_img=app.project.importFile(new ImportOptions(File("assets\\paper_texture.png")))
var BgImg = myComp.layers.add(img)
var HLImg = myComp.layers.add(highlight_img)
var FrontImg = BgImg.duplicate()
var Stroke = BgImg.duplicate()
var PaperTexture = myComp.layers.add(paper_img)
//nomes da layers
BgImg.name="Background"
FrontImg.name="Image"
HLImg.name="Highlight"
PaperTexture.name="Paper Texture"
Stroke.name="Stroke"
//vamos agora calcular o fator de escala
var sx=compWidth/BgImg.width; var sy=compHeight/BgImg.height
S_bg=Math.max(sx,sy)
S_fr=Math.min(sx,sy)
S_paper=Math.max(compWidth/PaperTexture.width,compHeight/PaperTexture.height)
//vamos aplicar-lo
BgImg.property("Transform").property("Scale").setValue([S_bg,S_bg]*100*2)
HLImg.property("Transform").property("Scale").setValue([S_fr,S_fr]*100)
FrontImg.property("Transform").property("Scale").setValue([S_fr,S_fr]*100)
Stroke.property("Transform").property("Scale").setValue([S_fr,S_fr]*100)
PaperTexture.property("Transform").property("Scale").setValue([S_paper,S_paper]*100)
//blur
var blurEffect = BgImg.property("Effects").addProperty("Gaussian Blur")
blurEffect.property("Blurriness").setValue(30)
//adding stroke
Stroke.property("Effects").addProperty("Simple Choker")
Stroke.property("Effects").property("Simple Choker").property("Choke Matte").setValue(5)
Stroke.property("Effects").property("Simple Choker").property("View").setValue(2)
//highlight reveling    
HLImg.property("Transform").property("Opacity").setValue(70)
var revelingEffect=HLImg.property("Effects").addProperty("Linear Wipe")
revelingEffect.property("Transition Completion").setValueAtTime(0,100)
revelingEffect.property("Transition Completion").setValueAtTime(2,0)
//paper texture
PaperTexture.blendingMode=BlendingMode.MULTIPLY
PaperTexture.property("Transform").property("Opacity").setValue(70)
//zoom animation
myComp.layers.precompose([1,2,3,4,5], "precomp-"+img_name);
var PreComp= myComp.layer("precomp-"+img_name)
PreComp.scale.setValueAtTime(0,[120,120])
PreComp.scale.setValueAtTime(2,[100,100])
//organize files
var folder=app.project.items.addFolder(img_name)
