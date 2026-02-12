$(document).ready(function() {
	$("#StudentName").on('keyup', function(event) {
		if (event.key == "Enter"){
			LoadIt();
		}
	});
	LanguageArray = new Array("pl");
});

// Easy writing on the canvas (x, y are position; t is text, s is size, c is color, m is how it modifies 0 for left, 0.5 for center, and 1 for right)

function WriteText(x, y, t, s, c, m){
	ctx.fillStyle = c;
	ctx.font= s + "px Arial";
	temptext = t;
	metrics = ctx.measureText(temptext);
	textWidth = metrics.width;
	xposition = x - m*textWidth;
	ctx.fillText(temptext,xposition, y);
}

function WriteText2(x, y, t, s, c, m){
	ctx2.fillStyle = c;
	ctx2.font= s + "px Arial";
	temptext = t;
	metrics = ctx2.measureText(temptext);
	textWidth = metrics.width;
	xposition = x - m*textWidth;
	ctx2.fillText(temptext,xposition, y);
}

// Easy writing on the canvas (x, y are position; t is text, s is size, c is color, m is how it modifies 0 for left, 0.5 for center, and 1 for right, f is for font)

function WriteTextWFont(x, y, t, s, c, m, f){
	ctx.fillStyle = c;
	ctx.font= s + "px " + f;
	temptext = t;
	metrics = ctx.measureText(temptext);
	textWidth = metrics.width;
	xposition = x - m*textWidth;
	ctx.fillText(temptext,xposition, y);
}

// Drawing Straight line between two points.

function DrawLine(xi, yi, xf, yf, lt, lc){
	ctx.strokeStyle = lc;
	ctx.lineWidth = lt;
	ctx.beginPath();
	ctx.moveTo(xi, yi);
	ctx.lineTo(xf, yf);
	ctx.stroke();
}

// Shapes

function DrawRectangle(xrect, yrect, wrect, hrect, curverectangle, lcolor, fcolor, lwid){
	ctx.fillStyle = fcolor;
	ctx.strokeStyle = lcolor;
	ctx.lineWidth = lwid;
	ctx.beginPath();
	ctx.moveTo(xrect+curverectangle, yrect);
	ctx.lineTo(xrect+wrect-curverectangle, yrect);
	ctx.arc(xrect+wrect-curverectangle, yrect+curverectangle, curverectangle, 1.5*Math.PI, 0*Math.PI, false);
	ctx.lineTo(xrect+wrect, yrect+hrect-curverectangle);
	ctx.arc(xrect+wrect-curverectangle, yrect+hrect-curverectangle, curverectangle, 0.0*Math.PI, 0.5*Math.PI, false);
	ctx.lineTo(xrect+curverectangle, yrect+hrect);
	ctx.arc(xrect+curverectangle, yrect+hrect-curverectangle, curverectangle, 0.5*Math.PI, 1.0*Math.PI, false);
	ctx.lineTo(xrect, yrect+curverectangle);
	ctx.arc(xrect+curverectangle, yrect+curverectangle, curverectangle, 1.0*Math.PI, 1.5*Math.PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

//  Draw a compass Rose, x, y is the center of the rose, r is the radius of the rose, alph is the transparency, b is the buffer for the arrows

function CompassRose(x, y, r, alph, b, ts){
	ctx.globalAlpha = alph;
	as = b;
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+r, y);
	ctx.moveTo(x+r, y);
	ctx.lineTo(x+r-as, y+as);
	ctx.moveTo(x+r, y);
	ctx.lineTo(x+r-as, y-as);
	ctx.moveTo(x,y);
	ctx.lineTo(x-r, y);
	ctx.moveTo(x-r, y);
	ctx.lineTo(x-r+as, y+as);
	ctx.moveTo(x-r, y);
	ctx.lineTo(x-r+as, y-as);

	ctx.moveTo(x,y);
	ctx.lineTo(x, y+r);
	ctx.moveTo(x, y+r);
	ctx.lineTo(x+as, y+r-as);
	ctx.moveTo(x, y+r);
	ctx.lineTo(x-as, y+r-as);
	ctx.moveTo(x,y);
	ctx.lineTo(x, y-r);
	ctx.moveTo(x, y-r);
	ctx.lineTo(x+as, y-r+as);
	ctx.moveTo(x, y-r);
	ctx.lineTo(x-as, y-r+as);
	ctx.stroke();

	WriteText(x+r+10, y+5, "0°", ts, "#000000", 0);
	WriteText(x-40, y - r + 10, "90°", ts, "#000000", 0);
	WriteText(x - r - 10, y+5, "180°", ts, "#000000", 1.0);
	WriteText(x + 15, y + r + 10, "270°", ts, "#000000", 0.0);

	ctx.globalAlpha = 1.0;
}


//Electrical Components

// Draw Current (x, y are the center of the arrow, t is text to put above arrow, ts is text size, c is the color of the arrow, l is length of arrow, tn is thickness of arrow, b is the buffer of arrow, a is the angle of the arrow 0 is pointing right)

function DrawCurrent(x, y, t, ts, c, l, lw, b, a){
	angrad = a*Math.PI/180;
	ctx.strokeStyle = c;
	ctx.lineWidth = lw;
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angrad);
	ctx.beginPath();
	ctx.moveTo(0 - 0.5*l, 0);
	ctx.lineTo(0 + 0.5*l, 0);
	ctx.moveTo(0 + 0.5*l - b, 0 - 0.5*b);
	ctx.lineTo(0 + 0.5*l, 0);
	ctx.lineTo(0 + 0.5*l - b, 0 + 0.5*b);
	ctx.stroke();
	WriteText(0 - 0.5*l, 0 - 1.0*b, t, ts, c, 0.0);
	ctx.restore();
}

// Draw Current (x, y are the center of the arrow, t is text to put above arrow, ts is text size, c is the color of the arrow, l is length of arrow, tn is thickness of arrow, b is the buffer of arrow, a is the angle of the arrow 0 is pointing right)

function DrawCurrentLeft(x, y, t, ts, c, l, lw, b, a){
	angrad = a*Math.PI/180;
	ctx.strokeStyle = c;
	ctx.lineWidth = lw;
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angrad);
	ctx.beginPath();
	ctx.moveTo(0 + 0.5*l, 0);
	ctx.lineTo(0 - 0.5*l, 0);
	ctx.moveTo(0 - 0.5*l + b, 0 - 0.5*b);
	ctx.lineTo(0 - 0.5*l, 0);
	ctx.lineTo(0 - 0.5*l + b, 0 + 0.5*b);
	ctx.stroke();
	ctx.restore();
	WriteText(x + 0.5*l, y - 1.0*b, t, ts, c, 1.0);
}

// Draw Wires (x0, y0 is position at start, x1, y1 is position at end, c is color of wire, and lw is width)

function DrawWire(x0, y0, x1, y1, c, lw){
	ctx.lineCap="round";
	ctx.strokeStyle = c;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
	ctx.closePath();
}

// Draw Battery (x, y is position, t1, t2 is text, w is width, c is color, lw is line width, a is angle, and cf is current flow)

function DrawACPowerSupply(x, y, t1, t2, w, c, lw, a){
	h = 0.25*w;
	ps = w/100;
	ctx.strokeStyle = c;
	ctx.fillStyle = "#FFFFFF";
	ctx.lineWidth = 4*ps;
	ctx.beginPath();
	ctx.arc(x+50*ps, y, 40*ps, 0, 2*Math.PI);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+10*ps, y);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(x+20*ps, y);
	ctx.bezierCurveTo(x+30*ps, y-h, x+40*ps, y-h, x+50*ps, y);
	ctx.bezierCurveTo(x+60*ps, y+h, x+70*ps, y+h, x+80*ps, y);
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(x+90*ps, y);
	ctx.lineTo(x+100*ps, y);
	ctx.stroke();
	ctx.closePath();

	WriteText(x+50*ps,y-2.0*h,t1.toFixed(3) + " V", 20*ps,"#990000",0.5);
	WriteText(x+0.5*w,y+.65*w,t2.toFixed(0) + " Hz", 20*ps,"#000000",0.5);
}

// Draw Battery (x, y is position, t is text, w is width, c is color, lw is line width, a is angle, and cf is current flow)

function DrawBattery(x, y, t, c, w, lw, a, cf){
	angrad = a*Math.PI/180;
	h = 0.15*w;
	bs = w/100;
	ctx.strokeStyle = c;
	ctx.lineWidth = lw;
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angrad);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0 + 40*bs, 0);
	if (cf == "electron"){
		ctx.moveTo(0 + 40*bs, 0 - h);
		ctx.lineTo(0 + 40*bs, 0 + h);
		ctx.moveTo(0 + 60*bs, 0 - 2*h);
		ctx.lineTo(0 + 60*bs, 0 + 2*h);
	}
	else{
		ctx.moveTo(0 + 60*bs, 0 - h);
		ctx.lineTo(0 + 60*bs, 0 + h);
		ctx.moveTo(0 + 40*bs, 0 - 2*h);
		ctx.lineTo(0 + 40*bs, 0 + 2*h);
	}
	ctx.moveTo(0 + 60*bs, 0);
	ctx.lineTo(0 + 100*bs, 0);
	ctx.stroke();
	ctx.closePath();

	WriteText(0 + 50*bs, 0 + 4*h, t + " V", 20*bs, c, 0.5);
	ctx.restore();
}

// Draw Resistor (x, y is position, t is text, w is width, c is color, lw is line width, a is angle, and n is resistor number)

function DrawResistor(x, y, t, w, c, lw, a, n){
	h = 0.15*w;
	rs = w/100;
	ctx.strokeStyle = c;
	ctx.lineWidth = lw;
	ctx.save();
	ctx.translate(x,y);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0 + 15*rs, 0);
	ctx.lineTo(0 + 20*rs, 0 - h);
	ctx.lineTo(0 + 30*rs, 0 + h);
	ctx.lineTo(0 + 40*rs, 0 - h);
	ctx.lineTo(0 + 50*rs, 0 + h);
	ctx.lineTo(0 + 60*rs, 0 - h);
	ctx.lineTo(0 + 70*rs, 0 + h);
	ctx.lineTo(0 + 80*rs, 0 - h);
	ctx.lineTo(0 + 85*rs, 0);
	ctx.lineTo(0 + 100*rs, 0);
	ctx.stroke();
	ctx.closePath();

	if (isNaN(t)){
		WriteText(0 + 50*rs, 0 + 3*h, t, 20*rs, c, 0.5);
	}
	else{
		WriteText(0 + 50*rs, 0 + 3*h, t + " Ω", 20*rs, c, 0.5);
	}
	if (n != 0){
		WriteText(0 + 10*rs, 0 - 0.5*h, n, 12*rs, c, 1.0);
	}
	ctx.restore();
}

// Draw Capacitor (x, y is position, t is text, w is width, c is color, lw is line width, a is angle, and n is resistor number)

function DrawCapacitor(x, y, t, w, c, lw, a, n){
	h = 0.15*w;
	cs = w/100;
	ctx.strokeStyle = c;
	ctx.lineWidth = lw;
	ctx.save();
	ctx.translate(x,y);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0 + 40*cs, 0);
	ctx.moveTo(0 + 40*cs, 0 - 2*h);
	ctx.lineTo(0 + 40*cs, 0 + 2*h);
	ctx.moveTo(0 + 60*cs, 0 - 2*h);
	ctx.lineTo(0 + 60*cs, 0 + 2*h);
	ctx.moveTo(0 + 60*cs, 0);
	ctx.lineTo(0 + 100*cs, 0);
	ctx.stroke();
	ctx.closePath();

	if (t == "C"){
		WriteText(0 + 50*cs, 0 + 4*h, t, 20*cs, c, 0.5);
	}
	else{
		WriteText(0 + 50*cs, 0 + 4*h, t + " µF", 20*cs, c, 0.5);
	}
	if (n != 0){
		WriteText(0 + 20*cs, 0 - 0.5*h, n, 12*cs, c, 1.0);
	}
	ctx.restore();
}

// Draw Inductor (x, y is position, t is text, w is width, c is color, lw is line width, a is angle, and n is inductor number)

function DrawInductor(x, y, t, w, c, lw, a, n){
	h = 0.15*w;
	ss = w/100;
	ctx.strokeStyle = c;
	ctx.lineWidth = 4*ss;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+10*ss, y);
	ctx.bezierCurveTo(x+10*ss, y-h, x+30*ss, y-h, x+30*ss, y);
	ctx.bezierCurveTo(x+30*ss, y-h, x+50*ss, y-h, x+50*ss, y);
	ctx.bezierCurveTo(x+50*ss, y-h, x+70*ss, y-h, x+70*ss, y);
	ctx.bezierCurveTo(x+70*ss, y-h, x+90*ss, y-h, x+90*ss, y);
	ctx.lineTo(x+100*ss, y);
	ctx.stroke();
	ctx.closePath();

	if (t == "L"){
		WriteText(x + 50*ss, y + 2*h, t, 20*ss, c, 0.5);
	}
	else{
		WriteText(x + 50*ss, y + 2*h, t + " mH", 20*ss, c, 0.5);
	}
	if (n != 0){
		WriteText(x + 20*ss, y - 0.5*h, n, 12*ss, c, 1.0);
	}
}

// Draw Meters for analog measurement (x,y) location, w is width or size, h is height, s is value to display, maxs is maximum value, n is name, u is unit, l is number of lines, dp is decimalplaces, fs is fontsize, c is color of bar

function DrawBarMeter(x, y, w, h, s, maxs, n, u, l, dp, fs, c){
	TopOfBar = 200;
	DrawRectangle(x, y, w, h, 0, "#000000", "#FFFFFF", 1);
	PercentMove = s/maxs;
	DrawRectangle(x, y, PercentMove*w, h, 0, c, c, 0);
	ctx.strokeStyle = "#000000";
	WriteText(x + 0.5*w, y-20, n + " (" + u + ")", fs, "#000000", 0.5);
	xgap = w/l;
	for (i = 0; i <= l; i++){
		if (i%5){
			linestart = y-10;
			linelength = 10;
		}
		else{
			linelength = 30;
			linestart = y;
		}
		DrawLine(x + i*xgap, y, x + i*xgap, y + linelength);
		if (i%10 == 0){
			numbertodisplay = i/10;
			WriteText(x + i*xgap, y+45, numbertodisplay.toFixed(0), fs, "#990000", 0.5);
		}
	}
}

// Draw Meters for analog measurement (x,y) location, w is width or size, s is speed, maxs is maximum speed, n is name, u is unit, l is number of lines, dp is decimalplaces, fs is fontsize

function DrawShowMeter(x, y, w, s, maxs, n, u, l, dp, fs, silly = ""){
	h = 0.8*w;
	MaxDisplayTime = maxs;
	TimeIncrements = MaxDisplayTime/l;
	if (s <= MaxDisplayTime){
		NeedlePercent = s/MaxDisplayTime;
	}
	else{
		NeedlePercent = 1;
	}

	LargeFontSize = 1.5*fs;
	SmallFontSize = 1*fs;

	needleanglerotate = 7*Math.PI/10 + NeedlePercent*1.6*Math.PI;

	radiusofmeter = 0.40*w;
	//body
	DrawRectangle(x, y, w, w, 20, "#FFFFFF", "#555555", 3);

	//circle for face
	ctx.fillStyle = "#666666";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.arc(x+0.5*w, y+0.5*w,1.05*radiusofmeter, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	WriteText(x+0.5*w,y+0.41*w,n,LargeFontSize,"#DDDDDD",0.5);
	WriteText(x+0.5*w,y+0.65*w,u,LargeFontSize,"#DDDDDD",0.5);
	WriteText(x+0.5*w,y+0.85*w,silly,SmallFontSize,"#82f3ff",0.5);


	//needle center
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(x+0.5*w, y+0.5*w,4, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	//Markings and Numbers
	for (i = 0; i <= l; i++){
		anglerotate = 7*Math.PI/10+i*(64/l)*Math.PI/40;
		ctx.save();
		ctx.translate(x+0.5*w, y+0.5*w);
		ctx.rotate(anglerotate);
		ctx.beginPath();
		if (i%10 == 0){
			ctx.strokeStyle = "#FFFFFF";
			ctx.lineWidth = 2;
			starttickmark = 0.80*radiusofmeter;
			endtickmark = 1.05*radiusofmeter;
		}
		else if (i%5 == 0){
			ctx.strokeStyle = "#FFFFFF";
			ctx.lineWidth = 1.5;
			starttickmark = 0.85*radiusofmeter;
			endtickmark = 1.02*radiusofmeter;
		}
		else{
			ctx.strokeStyle = "#FFFFFF";
			ctx.lineWidth = 1;
			starttickmark = 0.9*radiusofmeter;
			endtickmark = 1.0*radiusofmeter;
		}
		ctx.moveTo(starttickmark, 0);
		ctx.lineTo(endtickmark, 0);
		ctx.stroke();
		if (i%10 == 0){
			temptext = i*TimeIncrements;
			ctx.save();
			ctx.translate(0.65*radiusofmeter, 0);
			ctx.rotate(-1.0*anglerotate);
			WriteText(0, 0,temptext.toFixed(dp),SmallFontSize,"#FFFFFF",0.5);
			ctx.restore();
		}

		ctx.restore();
	}

	ctx.strokeStyle = "#FF0000";
	ctx.lineWidth = 1;
	ctx.save();
	ctx.translate(x+0.5*w, y+0.5*w);
	ctx.rotate(needleanglerotate);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(1.0*radiusofmeter, 0);

	ctx.stroke();
	ctx.restore();
}

// Drawing Hand for pulling and pushing horizontal (x, y is position, st is skin tone, nc is nail color, and lw is line width)

function DrawHand(x, y, st, nc, lw){
//  Index finger
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = st;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x, y+20);
	ctx.arc(x+10, y+20, 10, Math.PI, 0, true);
	ctx.lineTo(x+20, y);
	ctx.arc(x+10, y, 10, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = nc;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+3,y-4);
	ctx.lineTo(x+3, y+10);
	ctx.arc(x+10, y+10, 7, Math.PI, 0, true);
	ctx.lineTo(x+17, y-4);
	ctx.arc(x+10, y-4, 7, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+3,y-8);
	ctx.lineTo(x+3, y);
	ctx.arc(x+10, y, 7, Math.PI, 0, false);
	ctx.lineTo(x+17, y-8);
	ctx.arc(x+10, y-8, 7, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

//  Middle finger
	offset = 30;
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = st;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset,y);
	ctx.lineTo(x+offset, y+25);
	ctx.arc(x+offset+10, y+25, 10, Math.PI, 0, true);
	ctx.lineTo(x+offset+20, y);
	ctx.arc(x+offset+10, y, 10, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = nc;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset+3,y-4);
	ctx.lineTo(x+offset+3, y+10);
	ctx.arc(x+offset+10, y+10, 7, Math.PI, 0, true);
	ctx.lineTo(x+offset+17, y-4);
	ctx.arc(x+offset+10, y-4, 7, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset+3,y-8);
	ctx.lineTo(x+offset+3, y);
	ctx.arc(x+offset+10, y, 7, Math.PI, 0, false);
	ctx.lineTo(x+offset+17, y-8);
	ctx.arc(x+offset+10, y-8, 7, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	//  Ring finger
	offset = 55;
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = st;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset,y);
	ctx.lineTo(x+offset, y+22);
	ctx.arc(x+offset+10, y+22, 10, Math.PI, 0, true);
	ctx.lineTo(x+offset+20, y);
	ctx.arc(x+offset+10, y, 10, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = nc;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset+3,y-4);
	ctx.lineTo(x+offset+3, y+10);
	ctx.arc(x+offset+10, y+10, 7, Math.PI, 0, true);
	ctx.lineTo(x+offset+17, y-4);
	ctx.arc(x+offset+10, y-4, 7, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset+3,y-8);
	ctx.lineTo(x+offset+3, y);
	ctx.arc(x+offset+10, y, 7, Math.PI, 0, false);
	ctx.lineTo(x+offset+17, y-8);
	ctx.arc(x+offset+10, y-8, 7, Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	//  Thumb finger
	offset = 15;
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = st;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset,y-20);
	ctx.lineTo(x+offset, y-45);
	ctx.arc(x+offset+13, y-45, 13, Math.PI, 0);
	ctx.lineTo(x+offset+26, y-20);
	ctx.arc(x+offset+13, y-20, 13, 0, Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	ctx.strokeStyle = "#000000";
	ctx.fillStyle = nc;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset+3,y-16);
	ctx.lineTo(x+offset+3, y-30);
	ctx.arc(x+offset+13, y-30, 10, Math.PI, 0, false);
	ctx.lineTo(x+offset+23, y-16);
	ctx.arc(x+offset+13, y-16, 10, 0, Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+offset+3,y-12);
	ctx.lineTo(x+offset+3, y-20);
	ctx.arc(x+offset+13, y-20, 10, Math.PI, 0, true);
	ctx.lineTo(x+offset+23, y-12);
	ctx.arc(x+offset+13, y-12, 10, 0, Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
}


// Draw Arm that is attached to hand (x, y is position, st is skin tone, sc is shirt color, and lw is linewidth)

function DrawArm(x, y, st, sc, lw){
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = st;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+50,y-30);
	ctx.lineTo(x+50, y);
	ctx.lineTo(x+200, y+20);
	ctx.lineTo(x+200, y-40);
	ctx.lineTo(x+110,y-30);
	ctx.lineTo(x+105,y-30);
	ctx.lineTo(x+25,y-57);
	ctx.lineTo(x+25,y-30);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	ctx.strokeStyle = "#000000";
	ctx.fillStyle = sc;
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(x+120, y-60);
	ctx.lineTo(x+120, y+30);
	ctx.lineTo(x+400, y+30);
	ctx.lineTo(x+400, y-60);
	ctx.lineTo(x+120, y-60);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();
}

// Draws man with headphones (x, y) is position, h is height, whp is with headphones "with", redline "yes", direction "right"

function DrawMan(x, y, h, whp, redline, direction){
	sh = h/500;
	if (direction == "right"){
		shx = -1.0*sh;
	}
	else{
		shx = sh;
	}
	//neck
	ctx.fillStyle = "#f0b343";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x+20*shx, y+90*sh);
	ctx.lineTo(x+20*shx, y+120*sh);
	ctx.lineTo(x-20*shx, y+120*sh);
	ctx.lineTo(x-20*shx, y+90*sh);
	ctx.lineTo(x+20*shx, y+90*sh);
	ctx.stroke();
	ctx.fill();

	//Draw Head
	//Ball of Head
	ctx.strokeStyle = "#000000";
	ctx.fillStyle = "#f0b343";
	ctx.lineWidth = 4*sh;
	ctx.beginPath();
	ctx.arc(x,y+60*sh, 40*sh, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	//hair

	ctx.fillStyle = "#816024";
	ctx.lineWidth = 1*sh;
	ctx.beginPath();
	if (direction == "right"){
		ctx.arc(x, y+60*sh, 45*sh, 0.3*Math.PI, 1.5*Math.PI, false);
	}
	else{
		ctx.arc(x, y+60*sh, 45*sh, 0.7*Math.PI, 1.5*Math.PI, true);
	}
	ctx.lineTo(x-50*shx, y+30*sh);
	ctx.lineTo(x-30*shx, y+50*sh);
	ctx.lineTo(x, y+40*sh);
	ctx.lineTo(x, y+60*sh);

	ctx.lineTo(x+20*shx, y+105*sh);
	ctx.stroke();
	ctx.fill();

	ctx.strokeStyle = "#816024";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x+20*shx, y+30*sh);
	ctx.lineTo(x+40*shx, y+15*sh);
	ctx.moveTo(x+20*shx, y+30*sh);
	ctx.lineTo(x+45*shx, y+25*sh);
	ctx.moveTo(x+20*shx, y+30*sh);
	ctx.lineTo(x+10*shx, y+15*sh);
	ctx.stroke();

	//eye
	ctx.fillStyle = "#000000";
	ctx.lineWidth = 0.5*sh;
	ctx.beginPath();
	ctx.arc(x-30*shx,y+60*sh, 5*sh, 0, 2.0*Math.PI);
	ctx.stroke();
	ctx.fill();

	//mouth

	ctx.strokeStyle = "#FF0000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x-10*shx, y+90*sh);
	ctx.lineTo(x-30*shx, y+90*sh);
	ctx.stroke();

	//Trunk
	ctx.fillStyle = "#2e12d8";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x+10*shx, y+110*sh);
	ctx.lineTo(x-20*shx, y+110*sh);
	if (direction == "right"){
		ctx.arc(x-20*shx, y+130*sh, 20*sh, 1.5*Math.PI, 0.0*Math.PI, false);
	}
	else{
		ctx.arc(x-20*shx, y+130*sh, 20*sh, 1.5*Math.PI, 1.0*Math.PI, true);
	}
	ctx.lineTo(x-40*shx, y+250*sh);
	ctx.lineTo(x+35*shx, y+250*sh);
	if (direction == "right"){
		ctx.arc(x+10*shx, y+130*sh, 20*sh, 1.0*Math.PI, 1.5*Math.PI, false);
	}
	else{
		ctx.arc(x+10*shx, y+130*sh, 20*sh, 0.0*Math.PI, 1.5*Math.PI, true);
	}
	ctx.lineTo(x+10*shx, y+110*sh);
	ctx.stroke();
	ctx.fill();

	//Arm
	ctx.fillStyle = "#f0b343";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x-15*shx,y+140*sh);
	ctx.lineTo(x-5*shx,y+200*sh);
	ctx.lineTo(x-60*shx, y+205*sh);
	if (direction == "right"){
		ctx.arc(x-60*shx, y+215*sh, 10*sh, 1.5*Math.PI, 0.5*Math.PI, false);
	}
	else{
		ctx.arc(x-60*shx, y+215*sh, 10*sh, 1.5*Math.PI, 0.5*Math.PI, true);
	}
	ctx.lineTo(x-60*shx, y+225*sh);
	ctx.lineTo(x+10*shx, y+220*sh);
	if (direction == "right"){
		ctx.arc(x+10*shx, y+200*sh, 20*sh, 0.5*Math.PI, 1.0*Math.PI, false);
	}
	else{
		ctx.arc(x+10*shx, y+200*sh, 20*sh, 0.5*Math.PI, 0.0*Math.PI, true);
	}

	ctx.lineTo(x+15*shx,y+140*sh);
	ctx.lineTo(x-15*shx,y+140*sh);
	ctx.stroke();
	ctx.fill();

	ctx.fillStyle = "#2810be";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	if (direction == "right"){
		ctx.arc(x, y+150*sh, 20*sh, 1.0*Math.PI, 0.0*Math.PI, false);
	}
	else{
		ctx.arc(x, y+150*sh, 20*sh, 0*Math.PI, 1.0*Math.PI, true);
	}

	ctx.lineTo(x-20*shx, y+170*sh);
	ctx.lineTo(x+20*shx, y+170*sh);
	ctx.lineTo(x+20*shx, y+150*sh);
	ctx.stroke();
	ctx.fill();


	//Pants
	ctx.fillStyle = "#2c2c2e";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x+30*shx, y+250*sh);
	ctx.lineTo(x-30*shx, y+250*sh);
	ctx.lineTo(x-25*shx, y+400*sh);
	ctx.lineTo(x+20*shx, y+400*sh);
	ctx.lineTo(x+30*shx, y+250*sh);
	ctx.stroke();
	ctx.fill();

	//Shoes
	ctx.fillStyle = "#829fa8";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2*sh;
	ctx.beginPath();
	ctx.moveTo(x+25*shx, y+360*sh);
	ctx.lineTo(x-30*shx, y+360*sh);
	ctx.lineTo(x-30*shx, y+380*sh);
	ctx.lineTo(x-45*shx, y+380*sh);
	if (direction == "right"){
		ctx.arc(x-45*shx, y+390*sh, 10*sh, 0.5*Math.PI, 1.5*Math.PI, true);
	}
	else{
		ctx.arc(x-45*shx, y+390*sh, 10*sh, 1.5*Math.PI, 0.5*Math.PI, true);
	}
	ctx.lineTo(x-45*shx, y+400*sh);
	ctx.lineTo(x+25*shx, y+400*sh);
	ctx.lineTo(x+25*shx, y+370*sh);
	ctx.stroke();
	ctx.fill();

	if (whp == "with"){
		//headPhones
		ctx.fillStyle = "#ea5008";
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 2*sh;
		ctx.beginPath();
		ctx.arc(x+10*shx,y+65*sh, 20*sh, 0, 2*Math.PI);
		ctx.stroke();
		ctx.fill();

		ctx.strokeStyle = "#ea5008";
		ctx.lineWidth = 10*sh;
		ctx.beginPath();
		ctx.moveTo(x+10*shx,y+65*sh);
		ctx.lineTo(x+20*shx,y+10*sh);
		ctx.stroke();
		ctx.fill();

		WriteText(x+10*shx,y+75*sh,"b",30*sh,"#FFFFFF",0.5);
	}

	if (redline == "yes"){
		//redline for position
		ctx.strokeStyle = "#990000";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x, y+400*sh);
		ctx.lineTo(x, y+650*sh);
		ctx.stroke();
	}
/**/
}

function DrawFullArrow(x, y, h, w, a, lc, fc, lw){
	let arad = a*Math.PI/180;
	ctx.lineWidth = lw;
	ctx.strokeStyle = lc;
	ctx.fillStyle = fc;
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(arad);
	ctx.beginPath();
	ctx.moveTo(0, 0 - 0.5*h);
	ctx.lineTo(0 + 0.5*w, 0 - 0.1667*h);
	ctx.lineTo(0 + 0.25*w, 0 - 0.1667*h);
	ctx.lineTo(0 + 0.25*w, 0 + 0.5*h);
	ctx.lineTo(0 - 0.25*w, 0 + 0.5*h);
	ctx.lineTo(0 - 0.25*w, 0 - 0.1667*h);
	ctx.lineTo(0 - 0.5*w, 0 - 0.1667*h);
	ctx.lineTo(0, 0 - 0.5*h);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

function DrawCoordinates(x, y){
	// X-Y Axis
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1.0
	ctx.beginPath();
	ctx.moveTo(x-200, y);
	ctx.lineTo(x+200, y);
	ctx.moveTo(x, y-200);
	ctx.lineTo(x, y+200);
	ctx.stroke();


	ctx.beginPath();
	for (i = -1; i<=21; i++){
		if (i%5 == 0){
			offset = 10;
		}
		else{
			offset = 5;
		}
		ctx.moveTo(x-150+15*i, y-offset);
		ctx.lineTo(x-150+15*i, y+offset);
		ctx.moveTo(x-offset, y-150+15*i);
		ctx.lineTo(x+offset, y-150+15*i)
	}
	ctx.stroke();
}


function DrawGhostShowMeter(x, y, w, s, maxs, n, u, l, dp, fs, silly = ""){
	h = 0.8*w;
	MaxDisplayTime = maxs;
	TimeIncrements = MaxDisplayTime/l;
	if (s <= MaxDisplayTime){
		NeedlePercent = s/MaxDisplayTime;
	}
	else{
		NeedlePercent = 1;
	}

	LargeFontSize = 1.5*fs;
	SmallFontSize = 1*fs;

	needleanglerotate = 7*Math.PI/10 + NeedlePercent*1.6*Math.PI;

	radiusofmeter = 0.40*w;
	//body
	DrawRectangle(x, y, w, w, 20, "#FFFFFF", "#EEEEEE", 3);

	//circle for face
	ctx.fillStyle = "#EEEEEE";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.arc(x+0.5*w, y+0.5*w,1.05*radiusofmeter, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	WriteText(x+0.5*w,y+0.41*w,n,LargeFontSize,"#000000",0.5);
	WriteText(x+0.5*w,y+0.65*w,u,LargeFontSize,"#000000",0.5);
	//WriteText(x+0.5*w,y+0.85*w,silly,SmallFontSize,"#82f3ff",0.5);


	//needle center
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(x+0.5*w, y+0.5*w,4, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fill();

	//Markings and Numbers
	for (i = 0; i <= l; i++){
		anglerotate = 7*Math.PI/10+i*(64/l)*Math.PI/40;
		ctx.save();
		ctx.translate(x+0.5*w, y+0.5*w);
		ctx.rotate(anglerotate);
		ctx.beginPath();
		if (i%10 == 0){
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 2;
			starttickmark = 0.80*radiusofmeter;
			endtickmark = 1.05*radiusofmeter;
		}
		else if (i%5 == 0){
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1.5;
			starttickmark = 0.85*radiusofmeter;
			endtickmark = 1.02*radiusofmeter;
		}
		else{
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 1;
			starttickmark = 0.9*radiusofmeter;
			endtickmark = 1.0*radiusofmeter;
		}
		ctx.moveTo(starttickmark, 0);
		ctx.lineTo(endtickmark, 0);
		ctx.stroke();
		if (i%10 == 0){
			temptext = i*TimeIncrements;
			ctx.save();
			ctx.translate(0.65*radiusofmeter, 0);
			ctx.rotate(-1.0*anglerotate);
			WriteText(0, 0,temptext.toFixed(dp),SmallFontSize,"#000000",0.5);
			ctx.restore();
		}

		ctx.restore();
	}


	ctx.restore();
}

function DrawLineArrow(x, y, l, lt, w, c, a){
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(a);
	ctx.lineWidth = lt;
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(l, 0);
	ctx.moveTo(l - w, 0 - w);
	ctx.lineTo(l, 0);
	ctx.lineTo(l - w, 0 + w);
	ctx.stroke();
	ctx.restore();
}

function DrawDoubleLineArrow(x, y, l, lt, w, c, a){
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(a);
	ctx.lineWidth = lt;
	ctx.strokeStyle = c;
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(l, 0);
	ctx.moveTo(l - w, 0 - w);
	ctx.lineTo(l, 0);
	ctx.lineTo(l - w, 0 + w);
	ctx.moveTo(0 + w, 0 - w);
	ctx.lineTo(0, 0);
	ctx.lineTo(0 + w, 0 + w);
	ctx.stroke();
	ctx.restore();
}
