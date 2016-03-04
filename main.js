var c, cw, ch, mx, my, gl;
var startTime;
var time = 0.0;
var fps = 1000 / 30;
var uniLocation = new Array();
var readme;
var content

window.addEventListener('load', function(event){
    readme = $('#readme');
    content = $('#content');
    content.hide();
    readme.show()
}, false);

function showReadme(){
    readme.show();
    content.hide();
}

function reloadShader(element){
    readme.hide();
    content.show();
    var shader = element.id;
    document.getElementById("title").innerHTML = element.innerHTML;
    loadShader(shader + "-frag", parseInt(element.dataset.cw), parseInt(element.dataset.ch));
}

function enlargeCanvas(){
    c = document.getElementById('canvas');
    cw += 10;
    ch += 10;
    c.width = cw;
    c.height = ch;
    gl.viewport(0, 0, cw, ch);
}

function reduceCanvas(){
    c = document.getElementById('canvas');
    cw -= 10;
    ch -= 10;
    c.width = cw;
    c.height = ch;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, cw, ch);
}

function loadShader(fragShaderName, width, height){
    time = 0.0;
    c = document.getElementById('canvas');
    cw = width; ch = height;
    c.width = cw; c.height = ch;

    c.addEventListener('mousemove', mouseMove, true);

    gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    var program = gl.createProgram();

    var dfd = attachShader(fragShaderName, program, gl.FRAGMENT_SHADER);
    var dfd2 = attachShader('vertex', program, gl.VERTEX_SHADER);
    $.when(dfd, dfd2).done(function(){
        var prg = linkProgram(program);
	uniLocation[0] = gl.getUniformLocation(prg, 'time');
	uniLocation[1] = gl.getUniformLocation(prg, 'mouse');
	uniLocation[2] = gl.getUniformLocation(prg, 'resolution');

	var position = [
                -1.0,  1.0,  0.0,
            1.0,  1.0,  0.0,
		-1.0, -1.0,  0.0,
	    1.0, -1.0,  0.0
	];
	var index = [
	    0, 2, 1,
	    1, 2, 3
	];
	var vPosition = createVbo(position);
	var vIndex = createIbo(index);
	var vAttLocation = gl.getAttribLocation(prg, 'position');
	gl.bindBuffer(gl.ARRAY_BUFFER, vPosition);
	gl.enableVertexAttribArray(vAttLocation);
	gl.vertexAttribPointer(vAttLocation, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vIndex);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	mx = 0.5; my = 0.5;
	startTime = new Date().getTime();
        gl.viewport(0, 0, cw, ch);
	render();
    });
}

function mouseMove(e){
    mx = e.offsetX / cw;
    my = e.offsetY / ch;
}

function render(){
    time = (new Date().getTime() - startTime) * 0.001;
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uniLocation[0], time);
    gl.uniform2fv(uniLocation[1], [mx, my]);
    gl.uniform2fv(uniLocation[2], [cw, ch]);

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    gl.flush();
    setTimeout(render, fps);
}

function attachShader(shaderId, program, shaderType){
    var shader = gl.createShader(shaderType);
    elem = document.getElementById(shaderId).text;
    gl.shaderSource(shader, elem);
    gl.compileShader(shader);
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        gl.attachShader(program, shader);
    }else{
	alert(gl.getShaderInfoLog(shader));
	console.log(gl.getShaderInfoLog(shader));
    }
}

function linkProgram(program){
    gl.linkProgram(program);
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
	gl.useProgram(program);
	return program;
    }else{
	return null;
    }
}

function createVbo(data){
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
}

function createIbo(data){
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return ibo;
}
