var index=10000000;
function getFocus(obj)
{
       if(obj.style.zIndex!=index)
       {
               index = index + 83;
               var idx = index;
               obj.style.zIndex=idx;
       }
}

var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false
if (ie||ns6)
var obj=document.all? document.all["dhtmltooltip"] : document.getElementById? document.getElementById("dhtmltooltip") : ""

function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function ShowMsg(theText, theColor, theWidth){
	if (ns6||ie){
		if (typeof theWidth!="undefined") obj.style.width=theWidth+"px"
		if (typeof theColor!="undefined" && theColor!="") obj.style.backgroundColor=theColor
		obj.innerHTML=theText
		enabletip=true
		return false
	}
}

function positiontip(e){
	if (enabletip){
        const offsetxpoint=-60 //Customize x offset of tooltip
        const offsetypoint=20 //Customize y offset of tooltip
		var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
		var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
		var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
		var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20
		var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000
		if (rightedge<obj.offsetWidth)
			obj.style.left=ie? ietruebody().scrollLeft+event.clientX-obj.offsetWidth+"px" : window.pageXOffset+e.clientX-obj.offsetWidth+"px"
		else if (curX<leftedge)
			obj.style.left="5px"
		else
			obj.style.left=curX+offsetxpoint+"px"
		if (bottomedge<obj.offsetHeight)
			obj.style.top=ie? ietruebody().scrollTop+event.clientY-obj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-obj.offsetHeight-offsetypoint+"px"
		else
			obj.style.top=curY+offsetypoint+"px"
			obj.style.visibility="visible"
	}
}
function HideMsg(){
	if (ns6||ie){
		enabletip=false
		obj.style.visibility="hidden"
		obj.style.left="-1000px"
		obj.style.backgroundColor=''
		obj.style.width=''
	}
}
document.onmousemove=positiontip

function expandingWindow(website) {
var heightspeed = 6; // vertical scrolling speed (higher = slower)
var widthspeed = 9;  // horizontal scrolling speed (higher = slower)
if (document.all) {
var winwidth = 516;
var winheight = 416;
var xx=(window.screen.width-winwidth)/2;
var yy=(window.screen.height-winheight)/2;
var sizer = window.open("","","height=1,width=1,left="+xx+",top="+yy+",toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=yes");
for (sizeheight = 1; sizeheight < winheight; sizeheight += heightspeed) {
sizer.resizeTo("1", sizeheight);
}
for (sizewidth = 1; sizewidth < winwidth; sizewidth += widthspeed) {
sizer.resizeTo(sizewidth, sizeheight);
}
sizer.location = website;
}
else
window.location = website;
}
//  End -->


function glowit(which){
if (document.all.glowtext[which].filters[0].strength==3)
document.all.glowtext[which].filters[0].strength=1
else
document.all.glowtext[which].filters[0].strength=3
}
function glowit2(which){
if (document.all.glowtext.filters[0].strength==3)
document.all.glowtext.filters[0].strength=1
else
document.all.glowtext.filters[0].strength=3
}
function startglowing(){
if (document.all.glowtext&&glowtext.length){
for (i=0;i<glowtext.length;i++)
eval('setInterval("glowit('+i+')",800)')
}
else if (glowtext)
setInterval("glowit2(0)",800)
}
if (document.all)
window.onload=startglowing


$(function(){
	var tmp;
	var index=0;

	const nets={
		testnet:{
			dappAdderss:"",
			callback:"https://pay.nebulas.io/api/pay"
		},
		mainnet:{
			dappAdderss:"n1nqAWVsDt4pBwUpxg6vBvg7AiWhFfm8Ggt",
			callback:"https://pay.nebulas.io/api/mainnet/pay",
			hash:"74a7e8fd9548443c6c5c0c18f1dabe4fde96993a15bb1fb333743834761a444f"
		}
	};
	const net="mainnet";

	var NebPay = require("nebpay");
	var nebPay = new NebPay();
	var nebulas = require("nebulas");

	var Utils = nebulas.Utils,
		Unit = nebulas.Unit;
	var neb = new nebulas.Neb();

	var tmpNote=null;
	var curNote={};
	var addTmpNote=function(index){
		var str = 
			'<div id="tmpNote" style="position:absolute;z-index:'+index+';pointer-events:none;" onmousedown="getFocus(this)">'+
				'<table class="note" border="0" cellspacing="0" cellpadding="0" background="images/tiao0.gif">'+
					'<tbody><tr><td height="17" colspan="3"></td></tr>'+
						'<tr><td width="20" height="60" align="center" style="padding-left:1px;">'+
						'</td>'+
					'</tr>'+
					'<tr><td height="20" colspan="3" align="center"><img src="images/wei0.gif"></td></tr>'+
					'</tbody>'+
				'</table>'+
			'</div>';
		$("#tree").append(str);
	}

	var removeTmpNote = function() {
		$("#tmpNote").remove();
		tmpNote=null;
	}

	var addNote=function(note){
		var noteTime = new Date(note.time);
		var strTime = noteTime.getFullYear().toString()+'-'+
			(noteTime.getMonth()+1).toString()+'-'+
			noteTime.getDate().toString();
		var str = 
			'<div style="position:absolute;left:'+note.x+'px;top:'+note.y+'px;z-index:'+note.index+';" onmousedown="getFocus(this)">'+
				'<table class="note" border="0" cellspacing="0" cellpadding="0" background="images/tiao0.gif">'+
					'<tbody><tr><td height="17" colspan="3"></td></tr>'+
						'<tr><td width="20" height="60" align="center" style="padding-left:1px;">'+
							'<a target="_blank" onmouseover="ShowMsg(\'第['+note.index+']条愿望:<br><br>　　'+note.text+'<br><br>此愿望由［'+note.name+'］在［'+strTime+'］许下\',\''+note.color+'\',250);" onmouseout="HideMsg();">'+
								'<font color="#FFFF00" class="vindex">'+note.name+'</font>'+
							'</a>'+
						'</td>'+
					'</tr>'+
					'<tr><td height="20" colspan="3" align="center"><img src="images/wei0.gif"></td></tr>'+
					'</tbody>'+
				'</table>'+
			'</div>';
		$("#tree").append(str);
	}

	var initNotes = function(resp) {
		var notes = JSON.parse(resp.result);
		for(;index <notes.length; ++index){
			var note = notes[index];
			addNote(note);
		}
	}

	nebPay.simulateCall(nets[net].dappAdderss,0,"listNotes","[0,1000]",{
		qrcode: {
			showQRCode: false
		},
		goods: {
			name: "listNotes"
		},
		callback: nets[net].callBack,
		listener: initNotes  //set listener for extension transaction result
	});

	/*neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io/"));

	var param = {
		from: nets[net].dappAdderss,
		to: nets[net].dappAdderss,
		value: Unit.nasToBasic(Utils.toBigNumber("0")),
		nonce: 0,
		gasPrice: 1000000,
		gasLimit: 2000000,
		contract: {"function":"listNotes","args":JSON.stringify([0,1000])}
	};
	neb.api.call(param)
		.then(function(tx) {
			console.log(JSON.stringify(tx));
		});*/

	var color = $("#color li.cur").css("background-color");
	$("#mycolor").val(color);

	$('.note').each(function(){
		tmp = $(this).css('z-index');
		if(tmp>index)
			index = tmp;
	});
	
	$("#fancybox-wrap").hide();

	function setPos(e){
		const offsetxpoint=-10 //Customize x offset of tooltip
		const offsetypoint=0 //Customize y offset of tooltip
		var curX=(ns6)?e.pageX : event.x+ietruebody().scrollLeft;
		var curY=(ns6)?e.pageY : event.y+ietruebody().scrollTop;
		var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint;
		var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint;
		var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000;
		if (rightedge<tmpNote.offsetWidth)
			tmpNote.style.left=ie? ietruebody().scrollLeft+event.clientX-tmpNote.offsetWidth+"px" : window.pageXOffset+e.clientX-tmpNote.offsetWidth+"px";
		else if (curX<leftedge)
			tmpNote.style.left="5px";
		else
			tmpNote.style.left=curX+offsetxpoint+"px";
		if (bottomedge<tmpNote.offsetHeight)
			tmpNote.style.top=ie? ietruebody().scrollTop+event.clientY-tmpNote.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tmpNote.offsetHeight-offsetypoint+"px";
		else
			tmpNote.style.top=curY+offsetypoint+"px";
			tmpNote.style.visibility="visible";
		curNote.x = curX+offsetxpoint;
		curNote.y = curY+offsetypoint;
	}

	function onKeyPress(e){
		if(e.which == 27) {
			document.onmousemove=positiontip;
			document.onkeypress=null;
		}
	}

	$("#fancy").live('click',function(){
		if($("#tmpNote").length==0) {
			addTmpNote(index);
			tmpNote=document.all? document.all["#tmpNote"] : document.getElementById? document.getElementById("tmpNote") : ""
		}

		document.onmousemove=setPos;
		document.onkeypress=onKeyPress;
	});

	$("#bg").live('click',function(e){
		if(document.onmousemove!=setPos)
			return;

		document.onmousemove=positiontip;
		document.onkeypress=null;
		$("#fancybox-wrap").show();
	});
	$("#color li").live('click',function(){
		var color = $(this).css("background-color");
		$("#mycolor").val(color);
		//alert(color);
		$(this).css("border","1px solid #369");
		$(this).siblings().css("border","1px solid #fff");
	});

	$("#addbtn").live('click',function(e){
		var text = $("#note_txt").val();
		var name = $("#name").val();
		var color = $("#mycolor").val();
		if(text==""){
			$("#msg").html("内容不能为空");
			$("#note_txt").focus();
			return false;
		}
		if(name==""){
			$("#msg").html("请输入您的姓名！");
			$("#name").focus();
			return false;
		}
		
		curNote.type=0;
		curNote.time = Date.now();
		curNote.name=name,
		curNote.text=text,
		curNote.color=color

		var args=[curNote.type,curNote.time,curNote.name,curNote.text,curNote.color,curNote.x,curNote.y];
		
		var serialNumber = nebPay.call(nets[net].dappAdderss,"0","addNote",JSON.stringify(args),{
			qrcode: {
				showQRCode: false
			},
			goods: {
				name: "addNote"
			},
			callback: nets[net].callBack,
			listener: listener  //set listener for extension transaction result
		});
		$(".qrcode-background").css("z-index",10000999);

		$("#tmpNote").remove();
		tmpNote=null;

		addNote(curNote);
		
		index++;
		$("#fancybox-wrap").hide();
	});	

	$("#cancel").live('click',function(e){
		removeTmpNote();
		$("#fancybox-wrap").hide();
	});
	function listener(resp) {
		console.log("resp: " + JSON.stringify(resp))
	}
});
