﻿
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":37,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"text":"Import Multiple PDF pages","preferredSize":[0,0],"margins":16,"orientation":"row","spacing":10,"alignChildren":["left","top"],"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"enabled":true}},"item-1":{"id":1,"type":"Panel","parentId":20,"style":{"text":"Page Selection","preferredSize":[0,205],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"enabled":true}},"item-2":{"id":2,"type":"StaticText","parentId":1,"style":{"text":"Import PDF Pages:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-3":{"id":3,"type":"EditText","parentId":6,"style":{"text":"1","preferredSize":[60,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-4":{"id":4,"type":"StaticText","parentId":6,"style":{"text":"thru","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":true,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-5":{"id":5,"type":"EditText","parentId":6,"style":{"text":"1","preferredSize":[60,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-6":{"id":6,"type":"Group","parentId":1,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-7":{"id":7,"type":"StaticText","parentId":1,"style":{"text":"Start Placing on Doc Page:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-8":{"id":8,"type":"Checkbox","parentId":1,"style":{"text":"Reverse Page Order","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"enabled":true}},"item-9":{"id":9,"type":"Panel","parentId":20,"style":{"text":"Sizing Options","preferredSize":[0,160],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"enabled":true}},"item-10":{"id":10,"type":"Checkbox","parentId":9,"style":{"text":"Fit to Page","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"enabled":true}},"item-11":{"id":11,"type":"Checkbox","parentId":9,"style":{"text":"Keep Proportions","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"enabled":true}},"item-12":{"id":12,"type":"Checkbox","parentId":9,"style":{"text":"Bleed the Fit Page","preferredSize":[0,0],"alignment":null,"checked":true,"varName":null,"helpTip":null,"enabled":true}},"item-13":{"id":13,"type":"StaticText","parentId":9,"style":{"text":"Scale of Imported Page","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-14":{"id":14,"type":"Group","parentId":9,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-15":{"id":15,"type":"EditText","parentId":14,"style":{"text":"100","preferredSize":[40,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-16":{"id":16,"type":"StaticText","parentId":14,"style":{"text":"Y%:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-17":{"id":17,"type":"EditText","parentId":14,"style":{"text":"100","preferredSize":[40,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-18":{"id":18,"type":"StaticText","parentId":14,"style":{"text":"X%:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-19":{"id":19,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null,"varName":null,"enabled":true}},"item-20":{"id":20,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null,"varName":null,"enabled":true}},"item-21":{"id":21,"type":"Panel","parentId":19,"style":{"text":"Positioning Options","preferredSize":[0,205],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"enabled":true}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"text":"Position on Page Aligned From:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-23":{"id":23,"type":"DropDownList","parentId":21,"style":{"listItems":"Top Left, Top Center, Top Right, Center Left, Center, Center Right, Bottom Left, Bottom Center, Bottom Right, -, Top - Relative to spine,  Center  - Relative to spine,  Right  - Relative to spine","preferredSize":[0,0],"alignment":null,"selection":0,"varName":null,"helpTip":null,"enabled":true}},"item-24":{"id":24,"type":"DropDownList","parentId":41,"style":{"listItems":"0, 90, 180, 270","preferredSize":[130,0],"alignment":null,"selection":0,"varName":null,"helpTip":null,"enabled":true}},"item-25":{"id":25,"type":"StaticText","parentId":21,"style":{"text":"Offset by:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-26":{"id":26,"type":"Group","parentId":21,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-27":{"id":27,"type":"StaticText","parentId":26,"style":{"text":"X:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-28":{"id":28,"type":"EditText","parentId":26,"style":{"text":"0","preferredSize":[40,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-29":{"id":29,"type":"StaticText","parentId":26,"style":{"text":"Y:","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-30":{"id":30,"type":"EditText","parentId":26,"style":{"text":"0","preferredSize":[40,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-31":{"id":31,"type":"Panel","parentId":19,"style":{"text":"Placement Options","preferredSize":[0,160],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"enabled":true}},"item-32":{"id":32,"type":"DropDownList","parentId":43,"style":{"listItems":"Art, Crop, Trim, Bleed, Media","preferredSize":[136,0],"alignment":null,"selection":0,"varName":null,"helpTip":null,"enabled":true}},"item-33":{"id":33,"type":"Checkbox","parentId":31,"style":{"text":"Place Pages on a New Layer","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"enabled":true}},"item-34":{"id":34,"type":"Checkbox","parentId":31,"style":{"text":"Ignore Font and Image Errors","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"enabled":true}},"item-35":{"id":35,"type":"Checkbox","parentId":31,"style":{"text":"Transparent PDF Background","preferredSize":[0,0],"alignment":null,"checked":true,"varName":null,"helpTip":null,"enabled":true}},"item-36":{"id":36,"type":"Group","parentId":0,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null,"varName":null,"enabled":true}},"item-37":{"id":37,"type":"Button","parentId":36,"style":{"text":"OK","justify":"center","preferredSize":[0,0],"alignment":null,"varName":"ok","helpTip":null,"enabled":true}},"item-38":{"id":38,"type":"Button","parentId":36,"style":{"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"varName":"cancel","helpTip":null,"enabled":true}},"item-39":{"id":39,"type":"EditText","parentId":1,"style":{"text":"1","preferredSize":[60,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-40":{"id":40,"type":"Checkbox","parentId":1,"style":{"text":"Map to Doc Pages","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"enabled":true}},"item-41":{"id":41,"type":"Group","parentId":21,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-42":{"id":42,"type":"StaticText","parentId":41,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Rotation:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-43":{"id":43,"type":"Group","parentId":31,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-44":{"id":44,"type":"StaticText","parentId":43,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Crop to:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,20,1,2,6,3,4,5,8,7,39,40,9,10,11,12,13,14,18,15,16,17,19,21,22,23,41,42,24,25,26,27,28,29,30,31,43,44,32,33,34,35,36,37,38],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"functionWrapper":false,"compactCode":false,"showDialog":true,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Import Multiple PDF pages"; 
    dialog.orientation = "row"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "column"; 
    group1.alignChildren = ["fill","top"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// PANEL1
// ======
var panel1 = group1.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.text = "Page Selection"; 
    panel1.preferredSize.height = 205; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["left","top"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 

var statictext1 = panel1.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Import PDF Pages:"; 

// GROUP2
// ======
var group2 = panel1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var edittext1 = group2.add('edittext {properties: {name: "edittext1"}}'); 
    edittext1.text = "1"; 
    edittext1.preferredSize.width = 60; 

var statictext2 = group2.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "thru"; 

var edittext2 = group2.add('edittext {properties: {name: "edittext2"}}'); 
    edittext2.text = "1"; 
    edittext2.preferredSize.width = 60; 

// PANEL1
// ======
var checkbox1 = panel1.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkbox1.text = "Reverse Page Order"; 

var statictext3 = panel1.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Start Placing on Doc Page:"; 

var edittext3 = panel1.add('edittext {properties: {name: "edittext3"}}'); 
    edittext3.text = "1"; 
    edittext3.preferredSize.width = 60; 

var checkbox2 = panel1.add("checkbox", undefined, undefined, {name: "checkbox2"}); 
    checkbox2.text = "Map to Doc Pages"; 

// PANEL2
// ======
var panel2 = group1.add("panel", undefined, undefined, {name: "panel2"}); 
    panel2.text = "Sizing Options"; 
    panel2.preferredSize.height = 160; 
    panel2.orientation = "column"; 
    panel2.alignChildren = ["left","top"]; 
    panel2.spacing = 10; 
    panel2.margins = 10; 

var checkbox3 = panel2.add("checkbox", undefined, undefined, {name: "checkbox3"}); 
    checkbox3.text = "Fit to Page"; 

var checkbox4 = panel2.add("checkbox", undefined, undefined, {name: "checkbox4"}); 
    checkbox4.text = "Keep Proportions"; 

var checkbox5 = panel2.add("checkbox", undefined, undefined, {name: "checkbox5"}); 
    checkbox5.text = "Bleed the Fit Page"; 
    checkbox5.value = true; 

var statictext4 = panel2.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "Scale of Imported Page"; 

// GROUP3
// ======
var group3 = panel2.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var statictext5 = group3.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext5.text = "X%:"; 

var edittext4 = group3.add('edittext {properties: {name: "edittext4"}}'); 
    edittext4.text = "100"; 
    edittext4.preferredSize.width = 40; 

var statictext6 = group3.add("statictext", undefined, undefined, {name: "statictext6"}); 
    statictext6.text = "Y%:"; 

var edittext5 = group3.add('edittext {properties: {name: "edittext5"}}'); 
    edittext5.text = "100"; 
    edittext5.preferredSize.width = 40; 

// GROUP4
// ======
var group4 = dialog.add("group", undefined, {name: "group4"}); 
    group4.orientation = "column"; 
    group4.alignChildren = ["fill","top"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

// PANEL3
// ======
var panel3 = group4.add("panel", undefined, undefined, {name: "panel3"}); 
    panel3.text = "Positioning Options"; 
    panel3.preferredSize.height = 205; 
    panel3.orientation = "column"; 
    panel3.alignChildren = ["fill","top"]; 
    panel3.spacing = 10; 
    panel3.margins = 10; 

var statictext7 = panel3.add("statictext", undefined, undefined, {name: "statictext7"}); 
    statictext7.text = "Position on Page Aligned From:"; 

var dropdown1_array = ["Top Left","Top Center","Top Right","Center Left","Center","Center Right","Bottom Left","Bottom Center","Bottom Right","-","Top - Relative to spine","Center  - Relative to spine","Right  - Relative to spine"]; 
var dropdown1 = panel3.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 0; 

// GROUP5
// ======
var group5 = panel3.add("group", undefined, {name: "group5"}); 
    group5.orientation = "row"; 
    group5.alignChildren = ["left","center"]; 
    group5.spacing = 10; 
    group5.margins = 0; 

var statictext8 = group5.add("statictext", undefined, undefined, {name: "statictext8"}); 
    statictext8.text = "Rotation:"; 

var dropdown2_array = ["0","90","180","270"]; 
var dropdown2 = group5.add("dropdownlist", undefined, undefined, {name: "dropdown2", items: dropdown2_array}); 
    dropdown2.selection = 0; 
    dropdown2.preferredSize.width = 130; 

// PANEL3
// ======
var statictext9 = panel3.add("statictext", undefined, undefined, {name: "statictext9"}); 
    statictext9.text = "Offset by:"; 

// GROUP6
// ======
var group6 = panel3.add("group", undefined, {name: "group6"}); 
    group6.orientation = "row"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 10; 
    group6.margins = 0; 

var statictext10 = group6.add("statictext", undefined, undefined, {name: "statictext10"}); 
    statictext10.text = "X:"; 

var edittext6 = group6.add('edittext {properties: {name: "edittext6"}}'); 
    edittext6.text = "0"; 
    edittext6.preferredSize.width = 40; 

var statictext11 = group6.add("statictext", undefined, undefined, {name: "statictext11"}); 
    statictext11.text = "Y:"; 

var edittext7 = group6.add('edittext {properties: {name: "edittext7"}}'); 
    edittext7.text = "0"; 
    edittext7.preferredSize.width = 40; 

// PANEL4
// ======
var panel4 = group4.add("panel", undefined, undefined, {name: "panel4"}); 
    panel4.text = "Placement Options"; 
    panel4.preferredSize.height = 160; 
    panel4.orientation = "column"; 
    panel4.alignChildren = ["fill","top"]; 
    panel4.spacing = 10; 
    panel4.margins = 10; 

// GROUP7
// ======
var group7 = panel4.add("group", undefined, {name: "group7"}); 
    group7.orientation = "row"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 10; 
    group7.margins = 0; 

var statictext12 = group7.add("statictext", undefined, undefined, {name: "statictext12"}); 
    statictext12.text = "Crop to:"; 

var dropdown3_array = ["Art","Crop","Trim","Bleed","Media"]; 
var dropdown3 = group7.add("dropdownlist", undefined, undefined, {name: "dropdown3", items: dropdown3_array}); 
    dropdown3.selection = 0; 
    dropdown3.preferredSize.width = 136; 

// PANEL4
// ======
var checkbox6 = panel4.add("checkbox", undefined, undefined, {name: "checkbox6"}); 
    checkbox6.text = "Place Pages on a New Layer"; 

var checkbox7 = panel4.add("checkbox", undefined, undefined, {name: "checkbox7"}); 
    checkbox7.text = "Ignore Font and Image Errors"; 

var checkbox8 = panel4.add("checkbox", undefined, undefined, {name: "checkbox8"}); 
    checkbox8.text = "Transparent PDF Background"; 
    checkbox8.value = true; 

// GROUP8
// ======
var group8 = dialog.add("group", undefined, {name: "group8"}); 
    group8.orientation = "column"; 
    group8.alignChildren = ["fill","top"]; 
    group8.spacing = 10; 
    group8.margins = 0; 

var ok = group8.add("button", undefined, undefined, {name: "ok"}); 
    ok.text = "OK"; 

var cancel = group8.add("button", undefined, undefined, {name: "cancel"}); 
    cancel.text = "Cancel"; 

dialog.show();

