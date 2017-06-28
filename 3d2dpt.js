
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
	z = Number(zSlider.value);

	c.fillStyle = "#000000";
	c.fillRect(0, 0, width, height);
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
