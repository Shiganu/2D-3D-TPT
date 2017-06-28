
function $(id)
{
	return document.getElementById(id);
}

var cvs = $("cvs");
var c = cvs.getContext("2d");
var zSlider = $("zs");

var width = 800;
var height = 500;

var cx = width/2;
var cy = height/2;

var z = 1;

cvs.width = String(width);
cvs.height = String(height);

cvs.style.width = String(width) + "px";
cvs.style.height = String(height) + "px";

function update()
{
	background();
	z = Number(zSlider.value);

	drawVert(100, 0, 0);
	drawVert(-100, 0, 0);
}

function background()
{
	c.fillStyle = "#000000";
	c.fillRect(0, 0, width, height);
}

function drawVert(x, y, mode)
{
	var xx = 0;
	var yy = 0;

	if(mode == 0)
	{
		xx = getPerspective1(x, y)[0];
		yy = getPerspective1(x, y)[1];
	}
	else if(mode == 1)
	{
		xx = getPerspective2(x, y)[0];
		yy = getPerspective2(x, y)[1];
	}

	c.fillStyle = "#ffffff";
	c.fillRect(cx+xx-2, cy+yy-2, 4, 4);
}

function getPerspective1(x, y)
{
	var fx = Number(x/z);
	fx = Number(fx.toPrecision(1));

	var fy = Number(y/z);
	fy = Number(fy.toPrecision(1));

	return [fx, fy];
}

function getPerspective2(x, y)
{
	var fx = Number(x/(z+1));
	fx = Number(fx.toPrecision(1));

	var fy = Number(y/(z+1));
	fy = Number(fy.toPrecision(1));

	return [fx, fy];
}

setInterval(update, 50/3);
