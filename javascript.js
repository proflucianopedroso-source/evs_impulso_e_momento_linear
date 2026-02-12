// Obtém quaisquer parâmetros enviados com o endereço da página
const params = new URLSearchParams(window.location.search);

// Textos em português do Brasil (direto no código)
const textos = {
	ProgramTitle: "EVS - Impulso e Momento linear",
	LabDirections: "Neste EVS e em sua <a href='SD - EVS – Impulso e Força - 2026.html' target='_blank' style='color: blue; text-decoration: underline;'>SD</a> você determinará o impulso dado a um disco de hóquei pela trave. O disco será lançado ao longo de uma superfície com gelo, baterá na trave e quicará de volta no sentido oposto ao que veio. O disco dissipará energia ao bater na trave, mas nenhuma energia será dissipada enquanto se move pelo gelo.<p/>Clique no botão abaixo para experienciar.",
	BeginButton: "Iniciar",
	AnswerTitle: "Inserir Respostas",
	DirectionsforSub: "Não inclua unidades",
	SystemMessage: "Registre a massa do disco e clique sobre ele para lançá-lo no sentido à trave<p/>Use a distância entre as marcações (∆x) e o tempo que leva para percorrer essa distância para encontrar a velocidade do disco enquanto se move em sentido à trave e depois quica de volta<p/>Finalmente, calcule o impulso aplicado ao disco usando o tempo em que esteve em contato com a trave",
	SubmitButton: "Verificar",
	WordName: "Nome:",
	Q1: "Impulso (N.s):",
	Q2: "Força (N):",
	ErrorWithLabDirections: "Por favor, insira seu nome para experienciar.",
	ProgramWords: {
		one: "Movendo... (tempo fictício)",
		two: "Tempo de impacto:"
	},
	OtherWords: {
		Predicted: "Previsto",
		True: "Verdadeiro"
	},
	FinalErrorMessage: {
		Correct: "Correto!",
		Wrong: "Infelizmente fora da margem aceita pelo EVS. Tente novamente."
	}
};

$(document).ready(function() {
	updateContent();
});

function updateContent() {
	$("#ProgramTitle").html(textos.ProgramTitle);
	$("#LabDirections").html(textos.LabDirections);
	$("#BeginButton").html(textos.BeginButton);
	$("#AnswerTitle").html(textos.AnswerTitle);
	$("#DirectionsforSub").html(textos.DirectionsforSub);
	$("#SystemMessage").html(textos.SystemMessage);
	$("#SubmitButton").html(textos.SubmitButton);
	$("#WordName").html(textos.WordName);
	$("#Q1").html(textos.Q1);
	$("#Q2").html(textos.Q2);
}

function initialize(){
	theCanvas = $("#CanvasOne")[0];
	ctx = theCanvas.getContext("2d");
	elapsedtime = 0;
	running = "no";
	moving = "no";
	paused = "no";
	Hit = "no";
	Done = "no";
	inguncount = 0;
	PuckW = 25;
	PuckH = PuckW/3;
	// 10 mm = 2 px;
	WorldScale = 2/10;
	StartPuckX = 850;
	PuckX = StartPuckX;
	PuckY = 530;
	puckposition = 0;
	time1 = 0;
	time2 = 0;
	time3 = 0;
	time4 = 0;
	FinalColor = "#FFFFFF";
	GenerateProblem();
}

function GenerateProblem(){
	MassOfPuckg = Math.floor(Math.random()*1000+1000)/10;
	MassOfPuck = MassOfPuckg/1000;
	OriginalSpeed = Math.floor(Math.random()*200+250)/10;
	PercentSpeedLost = Math.floor(Math.random()*200 + 200)/10;
	NewSpeed = OriginalSpeed*PercentSpeedLost/100;
	TimeOfImpactms = Math.floor(Math.random()*200+200)/100;
	LineOneX = Math.floor(Math.random()*100+200);
	LineTwoX = Math.floor(Math.random()*100+600);
}

function LoadIt(){
	StudentName = $("#StudentName").val();
	if (StudentName == ''){
		$("#LabDirections").html(textos.ErrorWithLabDirections);
	}
	else{
		$("#LabSection").show();
		$("#OverviewSection").hide();
		d = new Date();
		nowtime = d.getTime();
		drawingpart();
	}
}

function FindPuckPosition(){
	if (moving == "left"){
		d = new Date();
		nowtime = d.getTime();
		elapsedtimems = nowtime - starttime;
		elapsedtime = elapsedtimems/50000;
		displaytime = elapsedtime;
		displaytimems = displaytime*1000;
		PuckX = StartPuckX -  OriginalSpeed*elapsedtime*200;
		if (puckposition == 0 && PuckX <= LineTwoX){
			puckposition = 1;
			time1 = displaytimems;
		}

		if (puckposition == 1 && PuckX <= LineOneX){
			puckposition = 2;
			time2 = displaytimems;
		}

		if (PuckX <= 50){
			moving = "right";
			StartPuckX = 50;
			newstarttime = nowtime;
		}
	}
	else if (moving == "right"){
		d = new Date();
		nowtime = d.getTime();
		elapsedtimems = nowtime - starttime;
		elapsedtime = elapsedtimems/50000;
		backelapsedtimems = nowtime - newstarttime;
		backelapsedtime = backelapsedtimems/50000;
		displaytime = elapsedtime;
		displaytimems = displaytime*1000;
		PuckX = StartPuckX +  NewSpeed*backelapsedtime*200;
		if (puckposition == 2 && PuckX >= LineOneX){
			puckposition = 3;
			time3 = displaytimems;
		}

		if (puckposition == 3 && PuckX >= LineTwoX){
			puckposition = 4;
			time4 = displaytimems;
			$("#SpaceForAnswer").show();
		}

		if (PuckX >= 855){
			moving = "done";
			clearInterval(StartItMoving);
			Hit = "yes";
			drawingpart();
		}
		WriteText(100, 480, textos.ProgramWords.two, 12, "#990000", 0.9);
		WriteText(100, 500, TimeOfImpactms.toFixed(2) + " ms" , 12, "#990000", 0.9);
	}
}

function drawingpart(){

	ctx.fillStyle = FinalColor;
	ctx.fillRect(0, 0, 925, 600);

	if (moving == "left" || moving == "right"){
		WriteText(450, 400, textos.ProgramWords.one, 36, "#990000", 0.9);
		FindPuckPosition();
	}

	DrawScene();
	DrawRectangle(PuckX, PuckY, PuckW, PuckH, 2, "#000000", "#000000", 1);
	WriteText(PuckX + 0.5*PuckW, PuckY - 20, MassOfPuckg.toFixed(1) + " g", 14, "#990000", 0.9);

	if (moving == "done"){
		WriteText(100, 480, textos.ProgramWords.two, 12, "#990000", 0.9);
		WriteText(100, 500, TimeOfImpactms.toFixed(2) + " ms" , 12, "#990000", 0.9);
	}
}

function DrawScene(){
	DrawRectangle(50, 540, 900, 100, 0, "#000000", "#9fdce3", 1);
	DrawRuler(50,555,850,50);
	DrawRectangle(20, 50, 10, 300, 1, "#000000", "#d7f6f5", 1);
	DrawRectangle(0, 250, 50, 350, 1, "#000000", "#f6f6f6", 1);
	DrawRectangle(0, 250, 52, 5, 0, "#000000", "#ff0000", 1);
	DrawRectangle(0, 530, 52, 70, 0, "#000000", "#ffff00", 1);
	ctx.strokeStyle = "#990000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(LineOneX, 560);
	ctx.lineTo(LineOneX, 480);
	ctx.stroke();
	WriteText(LineOneX,460,time2.toFixed(1) + " ms",14,"#990000",0.9);
	WriteText(LineOneX,430,time3.toFixed(1) + " ms",14,"#990000",0.9);
	ctx.beginPath();
	ctx.moveTo(LineTwoX, 560);
	ctx.lineTo(LineTwoX, 480);
	ctx.stroke();
	WriteText(LineTwoX,460,time1.toFixed(1) + " ms",14,"#990000",0.9);
	WriteText(LineTwoX,430,time4.toFixed(1) + " ms",14,"#990000",0.9);
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(LineOneX, 490);
	ctx.lineTo(LineTwoX, 490);
	ctx.moveTo(LineOneX + 10, 480);
	ctx.lineTo(LineOneX, 490);
	ctx.lineTo(LineOneX + 10, 500);
	ctx.moveTo(LineTwoX - 10, 480);
	ctx.lineTo(LineTwoX, 490);
	ctx.lineTo(LineTwoX - 10, 500);
	ctx.stroke();
	WriteText((LineOneX + LineTwoX)/2, 480, "∆x", 14, "#000000", 0.9);
}

function DrawRuler(x,y,w,h){
	DrawRectangle(x, y, w, h, 2, "#000000", "#fff0bd", 1);
	ctx.strokeStyle = "#000000";
	for (i = 0; i<=40; i++){
		if (i%5 == 0){
			offsety = 0.5*h;
		}
		else{
			offsety = 0.25*h;
		}
		ctx.beginPath();
		ctx.moveTo(x+i*20, y+offsety);
		ctx.lineTo(x+i*20, y);
		ctx.stroke();
		if (i%10 == 0 && i !=0){
			temptext = i*10;
			WriteText(x+i*20,y+40,temptext.toFixed(0),16,"#990000",0.9,"Arial")
		}
	}
	WriteText(x+10,y+35,"cm",16,"#990000",0.0,"Arial");
}

function StartMotion(){
	d = new Date();
	starttime = d.getTime();
	StartItMoving = setInterval(drawingpart, 30);
	moving = "left";
	$("#StartPuckButton").hide();
}

function SubmitForm(){

	OriginalMomentum = MassOfPuck*OriginalSpeed;
	FinalMomentum = MassOfPuck*NewSpeed;
	ChangeInMomentum = FinalMomentum + OriginalMomentum;
	TimeOfImpact = TimeOfImpactms/1000;
	ForceOnPuck = ChangeInMomentum/TimeOfImpact;
	DistanceBetweenLinespix = LineTwoX - LineOneX;
	DistanceBetweenLinescm = 0.1*DistanceBetweenLinespix/WorldScale;
	Answer1 = ChangeInMomentum;
	Answer2 = ForceOnPuck;

	Response1 = $("#A1").val();
	Response2 = $("#A2").val();
	$("#SpaceForAnswer").hide();
	$("#SystemMessage").hide();

	Error1 = Math.abs(Answer1 - Response1)/Answer1*100;
	Error2 = Math.abs(Answer2 - Response2)/Answer2*100;

	if (Error1 < 3 && Error2 < 3){
		FinalErrorMessage = textos.FinalErrorMessage.Correct;
		FinalColor = "#EEFFEE";
	}
	else{
		FinalErrorMessage = textos.FinalErrorMessage.Wrong;
		FinalColor = "#FFEEEE";
	}

	drawingpart();
	FinalMessages();
}

function FinalMessages(){
	TextSeparation = 40;
	TextLocation = 50;
	TextLocationX = 450;
	BigText = 24;
	MediumText = 18;
	SmallText = 14;

	TempText = StudentName + " (" + textos.ProgramTitle + ")";
	WriteText(TextLocationX, TextLocation, TempText, BigText, "#990000", 1.0);

	TextLocation = TextLocation + TextSeparation;
	TempText = FinalErrorMessage;
	WriteText(TextLocationX, TextLocation, TempText, MediumText, "#000000", 1.0);

	TextLocation = TextLocation + TextSeparation;
	TempText = "vo = -" + OriginalSpeed.toPrecision(3) + " m/s";
	WriteText(TextLocationX, TextLocation, TempText, MediumText, "#000000", 1.0);

	TextLocation = TextLocation + TextSeparation;
	TempText = "vf = " + NewSpeed.toPrecision(3) + " m/s";
	WriteText(TextLocationX, TextLocation, TempText, MediumText, "#000000", 1.0);

	TextLocation = TextLocation + TextSeparation;
	TempText = textos.Q1 + " " + textos.OtherWords.Predicted + " = " + Response1 + ", " + textos.OtherWords.True + " = " + Answer1.toPrecision(3);
	WriteText(TextLocationX, TextLocation, TempText, MediumText, "#990000", 1.0);

	TextLocation = TextLocation + TextSeparation;
	TempText = textos.Q2 + " " + textos.OtherWords.Predicted + " = " + Response2 + ", " + textos.OtherWords.True + " = " + Answer2.toFixed(0);
	WriteText(TextLocationX, TextLocation, TempText, MediumText, "#990000", 1.0);

	d = new Date();
nowtime = d.getTime();
WriteText(600,575,nowtime,12,"#990000",0);

}

// Funções auxiliares de desenho
function DrawRectangle(x, y, w, h, lw, sc, fc, alpha) {
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.lineWidth = lw;
	ctx.strokeStyle = sc;
	ctx.fillStyle = fc;
	ctx.fillRect(x, y, w, h);
	ctx.strokeRect(x, y, w, h);
	ctx.restore();
}

function WriteText(x, y, text, size, color, alpha, font) {
	ctx.save();
	ctx.globalAlpha = alpha;
	ctx.fillStyle = color;
	ctx.font = size + "px " + (font || "Arial");
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
	ctx.restore();
}