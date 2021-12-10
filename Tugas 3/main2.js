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
    let v_plane = [
        -10, -1.5, -10, 0.074, 0.380, 0.211, /* #136136 */  0, 0, -1, 10,
        -10, -1.5,  10, 0.074, 0.380, 0.211, /* #136136 */  0, 0, -1, 10,
         10, -1.5,  10, 0.074, 0.380, 0.211, /* #136136 */  0, 0, -1, 10,
         10, -1.5, -10, 0.074, 0.380, 0.211, /* #136136 */  0, 0, -1, 10,
    ]

    let i_plane = [
        96, 97, 98,
        98, 99, 96,
    ]

    let vertices = [...cubelight, ...vertices1_3d, ...vertices2_3d, ...v_plane];
    let indices = [...indices_cl, ...indices_v1, ...indices_v2, ...i_plane];

    // Create a linked-list for starting the vertices data
    let vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    let vertexShaderCode = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute vec3 aNormal;
        attribute float aShininessConstant;
        varying vec3 vColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vShininessConstant;
        uniform mat4 uModel;
        uniform mat4 uView;
        uniform mat4 uProjection;
        void main() {
            gl_Position = uProjection * uView * uModel * (vec4(aPosition * 2. / 3., 1.25));
            vColor = aColor;
            vNormal = aNormal;
            vPosition = (uModel * (vec4(aPosition * 2. / 3., 1.25))).xyz;
            vShininessConstant = aShininessConstant;
        }
    `;
    
    let fragmentShaderCode = `
        precision mediump float;
        varying vec3 vColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vShininessConstant;
        uniform vec3 uLightConstant;
        uniform float uAmbientIntensity;
        uniform vec3 uLightPosition;
        uniform mat3 uNormalModel;
        uniform vec3 uViewerPosition;
        uniform float uLightOn;
        void main() {
            vec3 ambient = uLightConstant * uAmbientIntensity;
            vec3 lightDirection = uLightPosition - vPosition;
            vec3 normalizedLight = normalize(lightDirection);  // [2., 0., 0.] becomes a unit vector [1., 0., 0.]
            vec3 normalizedNormal = normalize(uNormalModel * vNormal);
            float cosTheta = dot(normalizedNormal, normalizedLight);
            vec3 diffuse = vec3(0., 0., 0.);
            if (uLightOn == 1.0 && cosTheta > 0.) {
                float diffuseIntensity = cosTheta;
                diffuse = uLightConstant * diffuseIntensity;
            }
            vec3 reflector = reflect(-lightDirection, normalizedNormal);
            vec3 normalizedReflector = normalize(reflector);
            vec3 normalizedViewer = normalize(uViewerPosition - vPosition);
            float cosPhi = dot(normalizedReflector, normalizedViewer);
            vec3 specular = vec3(0., 0., 0.);
            if (uLightOn == 1.0 && cosPhi > 0.) {
                float specularIntensity = pow(cosPhi, vShininessConstant); 
                specular = uLightConstant * specularIntensity;
            }
            vec3 phong = ambient + diffuse + specular;
            gl_FragColor = vec4(phong * vColor, 1.);
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
        3, 
        gl.FLOAT, 
        false, 
        10 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    let aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        10 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);
    let aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.vertexAttribPointer(
        aNormal, 
        3, 
        gl.FLOAT, 
        false, 
        10 * Float32Array.BYTES_PER_ELEMENT, 
        6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aNormal);
    let aShininessConstant = gl.getAttribLocation(shaderProgram, "aShininessConstant");
    gl.vertexAttribPointer(
        aShininessConstant, 
        3, 
        gl.FLOAT, 
        false, 
        10 * Float32Array.BYTES_PER_ELEMENT, 
        9 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aShininessConstant);

    // Connect the uniform transformation matrices
    let uModel = gl.getUniformLocation(shaderProgram, "uModel");
    let uView = gl.getUniformLocation(shaderProgram, "uView");
    let uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

    // Set the projection matrix in the vertex shader
    let projection = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
        projection,
        Math.PI / 3,    // field of view
        1,              // ratio
        0.5,            // near clip
        10              // far clip
    );
    gl.uniformMatrix4fv(uProjection, false, projection);

    // Set the view matrix in the vertex shader
    let view = glMatrix.mat4.create();
    let camera = [0, 0, 3];
    let camNow = [0, 0, 0];
    glMatrix.mat4.lookAt(
        view,
        camera,      // camera position
        camNow,      // the point where camera looks at
        [0, 1, 0]       // up vector of the camera
    );
    gl.uniformMatrix4fv(uView, false, view);

    let uLightConstant = gl.getUniformLocation(shaderProgram, "uLightConstant");
    let uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
    gl.uniform3fv(uLightConstant, [1.0, 1.0, 1.0]);
    gl.uniform1f(uAmbientIntensity, 0.336);
    
    let uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
    let lightPosition = [0.0, 0.0, 0.0];
    gl.uniform3fv(uLightPosition, lightPosition);

    let uNormalModel = gl.getUniformLocation(shaderProgram, "uNormalModel");
    let uViewerPosition = gl.getUniformLocation(shaderProgram, "uViewerPosition");
    gl.uniform3fv(uViewerPosition, camera);

    let y_cube = [...cubelight];
    let cameraOrbit = 90;
    let cameraDistance = 3;

    let uLightOnValue = 0.;
    let uLightOn = gl.getUniformLocation(shaderProgram, "uLightOn");

    function onKeyPressed(event) {
        if(event.keyCode == 32) {
            if(uLightOnValue == 1.) {
                uLightOnValue = 0.;
            } else if(uLightOnValue == 0.) {
                uLightOnValue = 1.;
            }
            gl.uniform1f(uLightOn, uLightOnValue);
        } if(event.keyCode == 87) {
            for(let i = 0; i < y_cube.length; i += 10) {
                vertices[i + 1] += 0.030;
                lightPosition[1] += 0.030 * 0.030;
            }
        }
        else if(event.keyCode == 83) {
            for(let i = 0; i < y_cube.length; i += 10) {
                vertices[i + 1] -= 0.030;
                lightPosition[1] -= 0.030 * 0.030;
            }
        } else if(event.keyCode == 65) {
            camera[0] -= 0.015;
            camNow[0] -= 0.015;
            glMatrix.mat4.lookAt(
                view,
                camera,      
                camNow,      
                [0, 1, 0]     
            );
            gl.uniformMatrix4fv(uView, false, view);
        } else if(event.keyCode == 68) {
            camera[0] += 0.015;
            camNow[0] += 0.015;
            glMatrix.mat4.lookAt(
                view,
                camera,     
                camNow,      
                [0, 1, 0]       
            );
            gl.uniformMatrix4fv(uView, false, view);
        } else if(event.keyCode == 38) { // arrow up
            cameraDistance -= 0.1
            let cos = Math.cos(cameraOrbit * Math.PI / 180.0);
            let sin = Math.sin(cameraOrbit * Math.PI / 180.0);
            camera = [cameraDistance * cos, 0, cameraDistance * sin];
            glMatrix.mat4.lookAt(
                view,
                camera,      
                camNow,      
                [0, 1, 0]       
            );
            gl.uniformMatrix4fv(uView, false, view);
        } else if(event.keyCode == 40) { // arrow down
            cameraDistance += 0.1
            let cos = Math.cos(cameraOrbit * Math.PI / 180.0);
            let sin = Math.sin(cameraOrbit * Math.PI / 180.0);
            camera = [cameraDistance*cos, 0, cameraDistance * sin];
            glMatrix.mat4.lookAt(
                view,
                camera,      
                camNow,       
                [0, 1, 0] 
            );
            gl.uniformMatrix4fv(uView, false, view);
        }

        else if(event.keyCode == 37) { // arrow left
            cameraOrbit += 0.5
            let cos = Math.cos(cameraOrbit * Math.PI / 180.0);
            let sin = Math.sin(cameraOrbit * Math.PI / 180.0);
            camera = [cameraDistance * cos, 0, cameraDistance * sin];
            glMatrix.mat4.lookAt(
                view,
                camera,      
                camNow,    
                [0, 1, 0] 
            );
            gl.uniformMatrix4fv(uView, false, view);
        } else if(event.keyCode == 39) { // arrow right
            cameraOrbit -= 0.5
            let cos = Math.cos(cameraOrbit * Math.PI / 180.0);
            let sin = Math.sin(cameraOrbit * Math.PI / 180.0);
            camera = [cameraDistance * cos, 0, cameraDistance * sin];
            glMatrix.mat4.lookAt(
                view,
                camera,  
                camNow,   
                [0, 1, 0]  
            );
            gl.uniformMatrix4fv(uView, false, view);
        }
    }

    document.addEventListener("keydown", onKeyPressed);

    let lastPointOnTrackBall, currentPointOnTrackBall;
	let lastQuat = glMatrix.quat.create();
	function computeCurrentQuat() {
		// Secara berkala hitung quaternion rotasi setiap ada perubahan posisi titik pointer mouse
		let axisFromCrossProduct = glMatrix.vec3.cross(glMatrix.vec3.create(), lastPointOnTrackBall, currentPointOnTrackBall);
		let angleFromDotProduct = Math.acos(glMatrix.vec3.dot(lastPointOnTrackBall, currentPointOnTrackBall));
		let rotationQuat = glMatrix.quat.setAxisAngle(glMatrix.quat.create(), axisFromCrossProduct, angleFromDotProduct);
		glMatrix.quat.normalize(rotationQuat, rotationQuat);
		return glMatrix.quat.multiply(glMatrix.quat.create(), rotationQuat, lastQuat);
	}
	// Memproyeksikan pointer mouse agar jatuh ke permukaan ke virtual trackball
	function getProjectionPointOnSurface(point) {
		let radius = canvas.width/3;  // Jari-jari virtual trackball kita tentukan sebesar 1/3 lebar kanvas
		let center = glMatrix.vec3.fromValues(canvas.width/2, canvas.height/2, 0);  // Titik tengah virtual trackball
		let pointVector = glMatrix.vec3.subtract(glMatrix.vec3.create(), point, center);
		pointVector[1] = pointVector[1] * (-1); // Flip nilai y, karena koordinat piksel makin ke bawah makin besar
		let radius2 = radius * radius;
		let length2 = pointVector[0] * pointVector[0] + pointVector[1] * pointVector[1];
		if (length2 <= radius2) pointVector[2] = Math.sqrt(radius2 - length2); // Dapatkan nilai z melalui rumus Pytagoras
		else {  // Atur nilai z sebagai 0, lalu x dan y sebagai paduan Pytagoras yang membentuk sisi miring sepanjang radius
			pointVector[0] *= radius / Math.sqrt(length2);
			pointVector[1] *= radius / Math.sqrt(length2);
			pointVector[2] = 0;
		}
		return glMatrix.vec3.normalize(glMatrix.vec3.create(), pointVector);
	}

	let dragging, rotation = glMatrix.mat4.create();

	function onMouseDown(event) { //saat mouse di drag ke bawah
		let x = event.clientX;
		let y = event.clientY;
		let rect = event.target.getBoundingClientRect();

		if(
			rect.left <= x &&
			rect.right >= x &&
			rect.top <= y &&
			rect.bottom >= y
		) {
			dragging = true;
		}
		lastPointOnTrackBall = getProjectionPointOnSurface(glMatrix.vec3.fromValues(x,y,0));
		currentPointOnTrackBall = lastPointOnTrackBall;
	}

	function onMouseUp(event){
		dragging = false;
		if(currentPointOnTrackBall != lastPointOnTrackBall){
			lastQuat = computeCurrentQuat();
		}
	}

	function onMouseMove(event) {
		if (dragging){
			let x = event.clientX;
			let y = event.clientY;
			currentPointOnTrackBall = getProjectionPointOnSurface(glMatrix.vec3.fromValues(x,y,0));
			glMatrix.mat4.fromQuat(rotation,computeCurrentQuat());
		}
	}

	document.addEventListener("mousedown", onMouseDown, false);
	document.addEventListener("mouseup", onMouseUp, false);
	document.addEventListener("mousemove", onMouseMove, false);

    function render () {        
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.uniform3fv(uLightPosition, lightPosition);
        
        let model = glMatrix.mat4.create();
        glMatrix.mat4.multiply(model, model, rotation);
        gl.uniformMatrix4fv(uModel, false, model);
        
        let normalModel = glMatrix.mat3.create();
        glMatrix.mat3.normalFromMat4(normalModel, model);
        gl.uniformMatrix3fv(uNormalModel, false, normalModel);
        
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.570, 0.550, 0.550, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(render);
    }
    // console.log(vertices.length);
    requestAnimationFrame(render);
}