
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

var speed = 5;
var z = 1;
var grid = [];

cvs.width = String(width);
cvs.height = String(height);

cvs.style.width = String(width) + "px";
cvs.style.height = String(height) + "px";

function update()
{
	background();
	z = Number(zSlider.value);

	drawGrid();
}

window.onkeydown = function(keyData)
{
	var key = keyData.key;

	if(key == "ArrowUp") cy -= speed;
	if(key == "ArrowDown") cy += speed;
	if(key == "ArrowLeft") cx -= speed;
	if(key == "ArrowRight") cx += speed;
};

function initGrid()
{
	for(var i = 0; i < 5; i++)
	{
		grid[i] = [];
		for(var j = 0; j < 5; j++)
		{
			grid[i][j] = 1;
		}
	}
}

function drawGrid()
{
	for(var i = 0; i < 5; i++)
	{
		for(var j = 0; j < 5; j++)
		{
			var x = (j-2)*200;
			var y = (i-2)*200;
			if(grid[i][j] == 0) drawCubeFaces(x, y, 100, "#000000");				//empty
			else if(grid[i][j] == 1) drawCubeFaces(x, y, 100, "#707070");		//stone
			//console.log(x, y);
		}
	}
	for(var i = 0; i < 5; i++)
	{
		for(var j = 0; j < 5; j++)
		{
			var x = (j-2)*200;
			var y = (i-2)*200;
			drawCubeLines(x, y, 100);
			//console.log(x, y);
		}
	}
}

window.onmousedown = function()
{

};

function drawCubeFaces(x, y, size, color)
{
	drawArea(
		vert(x+size, y+size, 1),
		vert(x-size, y+size, 1),
		vert(x-size, y-size, 1),
		vert(x+size, y-size, 1),
		color
	);
}

function drawCubeLines(x, y, size)
{
	//drawVert(x+size, y+size, 0);
	//drawVert(x-size, y+size, 0);
	//drawVert(x+size, y-size, 0);
	//drawVert(x-size, y-size, 0);
	//drawVert(x+size, y+size, 1);
	//drawVert(x-size, y+size, 1);
	//drawVert(x+size, y-size, 1);
	//drawVert(x-size, y-size, 1);

	drawLine(
		vert(x+size, y+size, 0),
		vert(x-size, y+size, 0)
	);

	drawLine(
		vert(x+size, y-size, 0),
		vert(x-size, y-size, 0)
	);

	drawLine(
		vert(x+size, y+size, 0),
		vert(x+size, y-size, 0)
	);

	drawLine(
		vert(x-size, y+size, 0),
		vert(x-size, y-size, 0)
	);

	drawLine(
		vert(x+size, y+size, 1),
		vert(x-size, y+size, 1)
	);

	drawLine(
		vert(x+size, y-size, 1),
		vert(x-size, y-size, 1)
	);

	drawLine(
		vert(x+size, y+size, 1),
		vert(x+size, y-size, 1)
	);

	drawLine(
		vert(x-size, y+size, 1),
		vert(x-size, y-size, 1)
	);

	drawLine(
		vert(x-size, y-size, 1),
		vert(x-size, y-size, 0)
	);

	drawLine(
		vert(x+size, y-size, 1),
		vert(x+size, y-size, 0)
	);

	drawLine(
		vert(x-size, y+size, 1),
		vert(x-size, y+size, 0)
	);

	drawLine(
		vert(x+size, y+size, 1),
		vert(x+size, y+size, 0)
	);
}

function drawArea(vert1, vert2, vert3, vert4, color)
{
	var x1 = vert1[0];
	var y1 = vert1[1];
	var x2 = vert2[0];
	var y2 = vert2[1];
	var x3 = vert3[0];
	var y3 = vert3[1];
	var x4 = vert4[0];
	var y4 = vert4[1];

	c.fillStyle = color;
	//c.strokeStyle = color;
	c.beginPath();
	c.moveTo(cx+x1, cy+y1);
	c.lineTo(cx+x2, cy+y2);
	c.lineTo(cx+x3, cy+y3);
	c.lineTo(cx+x4, cy+y4);
	c.fill();
}

function background()
{
	c.fillStyle = "#000000";
	c.fillRect(0, 0, width, height);
}

function drawLine(vert1, vert2)
{
	var x1 = vert1[0];
	var y1 = vert1[1];
	var x2 = vert2[0];
	var y2 = vert2[1];

	c.strokeStyle = "#ff0000";
	c.beginPath();
	c.moveTo(cx+x1, cy+y1);
	c.lineTo(cx+x2, cy+y2);
	c.stroke();
}

function vert(x, y, mode)
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

	return [xx, yy];
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

initGrid();
setInterval(update, 50/3);
