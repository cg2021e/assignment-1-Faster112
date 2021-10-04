function main () {
    // Access the canvas through DOM
    let canvas = document.getElementById("myCanvas");   // the paper
    let gl = canvas.getContext("webgl");           // the brush and the paint

    // Define vertices data
    /*
        A ( -0.5, -0.5 ) 
        B (  0.5, -0.5 )
        C (  0.0,  0.5 )
        D ( -0.5,  0.5 )
    */
    let vertices = [
        -0.5, -0.5, 0.0, 1.0, 0.0,  // Point A
         0.5, -0.5, 0.0, 0.0, 1.0,  // Point B
         0.5,  0.5, 1.0, 0.0, 0.0,  // Point C 
         0.5,  0.5, 1.0, 0.0, 0.0,  // Point C
        -0.5,  0.5, 1.0, 0.0, 0.0,  // Point D
        -0.5, -0.5, 0.0, 1.0, 0.0   // Point A
    ];

    // Create a linked-list for starting the vertices data
    let buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform vec2 uChange;
        void main () {
            gl_PointSize = 10.0;
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);    // Center of the coordinate
            vColor = aColor;
        }
    `;
    
    let fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        void main () {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // Create .c in GPU
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
 
    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    
    // Prepare a .exe shell (shader program)
    let shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    
    // Link the two .o files, so together they can be a runnable program / context
    gl.linkProgram(shaderProgram);
    
    // Start using the context (analogy: start using paints and brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect the positional values from ARRAY_BUFFER
    // to each vertex being processed
    let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    let aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    let freeze = false;    
    // Apply some interaction using mouse
    function onMouseClick (event) {
        freeze = !freeze;
    }
    document.addEventListener("click", onMouseClick, false);
    // Apply some interaction using keyboard
    function onKeydown (event) {
        if (event.keyCode == 32) freeze = true;
    }
    function onKeyup (event) {
        if (event.keyCode == 32) freeze = false;
    }
    document.addEventListener("keydown", onKeydown, false);
    document.addEventListener("keyup", onKeyup, false);

    let speed = [3 / 600, 1 / 600];
    // Create a uniform to animate the vertices
    let uChange = gl.getUniformLocation(shaderProgram, "uChange");
    let change = [0, 0];

    function render () {
        if (!freeze) {
            change[0] += speed[0];
            change[1] += speed[1];
            gl.uniform2fv(uChange, change);
            gl.clearColor(0.1, 0.1, 0.1, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}