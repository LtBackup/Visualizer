/* Sets up global variables */
var loggedIn = false;
var mx = -500;
var numBars = 50;
var name;
var keypress;
var volumePref;
var isAnimating = false;

/**
* This function chooses which display to populate based on the user's saved preference
* @param {number} keypress the number representing the visualization that the user has indicated 
* 
* @returns the correct visualization
*/
function loadVisuals(keypress) {
    switch (keypress) {
        case 1:
            meshArrs[keypress - 1].forEach(e => e.visible = true);
            break;
        case 2:
            meshArrs[keypress - 1].forEach(e => e.visible = true);
            break;
        case 3:
            meshArrs[keypress - 1].forEach(e => e.visible = true);
            break;
        case 4:
            meshArrs[keypress - 1].forEach(e => e.visible = true);
            break;
    }
}

/* Sets up scene */
renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas"), antialias: true });
renderer.setClearColor(0x333F47);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);

var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

//setup arrays for visual elements in each scene
var meshArr1 = [];
var meshArr2 = [];
var meshArr3 = [];
var meshArr4 = [];
var geometryArr1 = [];
var geometryArr2 = [];
var geometryArr3 = [];
var geometryArr4 = [];

var meshArrs = [meshArr1, meshArr2, meshArr3, meshArr4];
var geometryArrs = [geometryArr1, geometryArr2, geometryArr3, geometryArr4];

//Scene 1 visual elements
var geometry = new THREE.IcosahedronGeometry(2000);
var normalMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
var planeGeometry = new THREE.PlaneGeometry(6000, 6000, 50, 50);
geometryArr1.push(geometry, planeGeometry);

var material = new THREE.MeshStandardMaterial({ color: 0xa200ff, wireframe: true, side: THREE.DoubleSide });
var normalMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
var shape = new THREE.Mesh(geometry, normalMaterial);
var plane = new THREE.Mesh(planeGeometry, material);
meshArr1.push(shape, plane);
plane.position.set(0, -150, 0);
shape.position.set(0, 0, 0);
plane.rotation.x += -Math.PI / 2;

scene.add(plane, shape);

//Scene 2 visual elements
/*creates the bar geometry and add them to scene */
for (var i = 0; i < numBars; i++) {
    var y = Math.floor((Math.random() * 300) + 100);
    var geometry = new THREE.BoxGeometry(10, y, 5);

    var material = new THREE.MeshNormalMaterial();

    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(mx, 0, -1000);

    scene.add(mesh);
    mx += 20;

    meshArr2.push(mesh);
    geometryArr2.push(geometry);
}

//Scene 3 visual elements
/* create spheres and add them to the scene */
var sphere1 = new THREE.SphereGeometry(200, 100, 10);
var sphere2 = new THREE.SphereGeometry(200, 100, 10);
var sphere3 = new THREE.SphereGeometry(200, 100, 10);
var sphere4 = new THREE.SphereGeometry(200, 100, 10);
var sphere5 = new THREE.SphereGeometry(200, 100, 10);
geometryArr3.push(sphere1, sphere2, sphere3, sphere4, sphere5);

var sphereMaterial1 = new THREE.MeshPhysicalMaterial({ color: 0xFF0000 });
var sphereMaterial2 = new THREE.MeshPhysicalMaterial({ color: 0x00FF00 });
var sphereMaterial3 = new THREE.MeshPhysicalMaterial({ color: 0x0000FF });
var sphereMaterial4 = new THREE.MeshPhysicalMaterial({ color: 0x00FFFF });
var sphereMaterial5 = new THREE.MeshPhysicalMaterial({ color: 0x9932CC });
var sphereMesh1 = new THREE.Mesh(sphere1, sphereMaterial1);
var sphereMesh2 = new THREE.Mesh(sphere2, sphereMaterial2);
var sphereMesh3 = new THREE.Mesh(sphere3, sphereMaterial3);
var sphereMesh4 = new THREE.Mesh(sphere4, sphereMaterial4);
var sphereMesh5 = new THREE.Mesh(sphere5, sphereMaterial5);
var spherePlane= new THREE.PlaneBufferGeometry(8000, 8000);
var _material= new THREE.MeshToonMaterial({ color: 0xFFFFFF })
scene.add(sphereMesh3);

meshArr3.push(sphereMesh1, sphereMesh2, sphereMesh3, sphereMesh4, sphereMesh5);

var pivot1 = new THREE.Object3D();
scene.add(pivot1);
var pivot2 = new THREE.Object3D();
scene.add(pivot2);
var pivot4 = new THREE.Object3D();
scene.add(pivot4);
var pivot5 = new THREE.Object3D();
scene.add(pivot5);

sphereMesh1.position.set(-1100, 0, -3000);
sphereMesh2.position.set(-500, 0, -3000);
sphereMesh3.position.set(0, 0, -3000);
sphereMesh4.position.set(500, 0, -3000);
sphereMesh5.position.set(1000, 0, -3000);

pivot1.add(sphereMesh1);
pivot2.add(sphereMesh2);
pivot4.add(sphereMesh4);
pivot5.add(sphereMesh5);



var groundMaterial = new THREE.MeshPhongMaterial({
    shininess: 80,
    color: 0xffffff,
    specular: 0xffffff
});

var ground = new THREE.Mesh(spherePlane, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.set( 0, 0, 0 );
ground.scale.set( 1000, 1000, 1000 );
ground.receiveShadow = true;
scene.add(ground);

//Scene 4 visual elements
var geometry1 = new THREE.BoxGeometry(100, 10, 200);
var geometry2 = new THREE.BoxGeometry(100, 10, 200);
var geometry3 = new THREE.BoxGeometry(100, 10, 200);
var geometry4 = new THREE.BoxGeometry(100, 10, 200);
var geometry5 = new THREE.BoxGeometry(100, 10, 200);
var icePlane = new THREE.PlaneGeometry(5000, 5000);
var caveBackground = new THREE.PlaneGeometry(8000, 8000);
var icicle1 = new THREE.ConeGeometry(20, 100, 15);
var icicle2 = new THREE.ConeGeometry(20, 150, 15);
var icicle3 = new THREE.ConeGeometry(20, 80, 15);
var icicle4 = new THREE.ConeGeometry(20, 80, 15);
geometryArr4.push(geometry1, geometry2, geometry3, geometry4, geometry5);
var flatIce = new THREE.MeshBasicMaterial({ color: 0xA5F2F3 });
var ice = new THREE.MeshPhongMaterial({ color: 0xA5F2F3 });
var background = new THREE.MeshToonMaterial({ color: 0x82CFFD })
var reflectIce = new THREE.MeshPhysicalMaterial({ transparent: true, opacity: .3, color: 0x000000 });
var mesh1 = new THREE.Mesh(geometry1, ice);
var mesh2 = new THREE.Mesh(geometry2, ice);
var mesh3 = new THREE.Mesh(geometry3, ice);
var mesh4 = new THREE.Mesh(geometry4, ice);
var mesh5 = new THREE.Mesh(geometry5, ice);
var mesh6 = new THREE.Mesh(icePlane, reflectIce);
var mesh7 = new THREE.Mesh(icicle1, ice);
var mesh8 = new THREE.Mesh(icicle2, ice);
var mesh9 = new THREE.Mesh(icicle3, ice);
var mesh10 = new THREE.Mesh(icicle4, ice);
var mesh11 = new THREE.Mesh(caveBackground, background);
meshArr4.push(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9, mesh10, mesh11);
mesh1.position.set(-400, -100, -1000);
mesh2.position.set(-200, -100, -1000);
mesh3.position.set(0, -100, -1000);
mesh4.position.set(200, -100, -1000);
mesh5.position.set(400, -100, -1000);
mesh6.position.set(0, -100, -1000);
mesh7.position.set(140, 100, -300);
mesh8.position.set(130, 100, -200);
mesh9.position.set(-400, -60, -600);
mesh10.position.set(-400, -140, -600);
mesh11.position.set(0, -100, -3000)

scene.add(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9, mesh10, mesh11);
mesh6.rotation.x = -Math.PI / 2;
mesh7.rotation.x = Math.PI;
mesh8.rotation.x = Math.PI;
mesh10.rotation.x = Math.PI;

//Initialize the scene by hiding all visual elements
hideVisuals();

/** 
* This function hides the visual displays that do not match the number the user keyed
* 
* @returns the correct visualization
*/
function hideVisuals() {
    for (var i = 0; i < meshArrs.length; i++) {
        if (i !== keypress - 1) {
            for (var j = 0; j < meshArrs[i].length; j++) {
                meshArrs[i][j].visible = false;
            }
        }
    }
}

/**
 * This function sets the correct keypress that then is used to determine the shapes displayed
 * 
 * @param {event} e a keycode
 * 
 * @returns keypress
 */
function setKeypress(e) {
    if (isAnimating === true) {
        if (e.which >= 49 && e.which <= 52) {
            meshArrs[keypress - 1].forEach(e => e.visible = false);
        }
        switch (e.which) {
            case 49:
                keypress = 1;
                meshArrs[keypress - 1].forEach(e => e.visible = true);
                break;
            case 50:
                keypress = 2;
                meshArrs[keypress - 1].forEach(e => e.visible = true);
                break;
            case 51:
                keypress = 3;
                meshArrs[keypress - 1].forEach(e => e.visible = true);
                break;
            case 52:
                keypress = 4;
                meshArrs[keypress - 1].forEach(e => e.visible = true);
                break;
            case 72:
                $('#overlay').toggle();
                $('#github').toggle();
                break;
        }

        /**
         * If the user is logged in, make an AJAX call to the database to save their preferences each time a change is made
         * 
         */
        if (loggedIn) {
            let update =
                {
                    username: name,
                    displayPreference: keypress,
                    volumeLevel: volume.value
                };

            $.ajax({
                url: "api/existingUsers",
                type: 'PUT',
                dataType: 'JSON',
                data: update
            });
        }
    }
};

/**
 * This function acts as the link between the audio file input and the rendering engine.
 * We update the current audio data frequency data in the stream every animation frame
 * 
 * @returns undefined
 */
function animate() {
    (window.requestAnimationFrame || window.webkitRequestAnimationFrame)
        (animate);
    var array = [];
    array = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(array);
    averages = getAverageVolume(array);
}

/**
 * This function is the animation engine that runs with every animation frame.
 * This is usually around 60 frames per second, assuming no lag.
 * The function runs a different set of rendering logic based on what scene is currently active
 *
 * @param {double} ts is a time stamp measured in milliseconds. requestAnimationFrame gives the callback this parameter
 * 
 * @returns undefined
 */
function render(ts) {

    switch (keypress) {
        case 1:
            meshArr1.forEach(element => {
                element.visible = true;
            });

            var center = new THREE.Vector2(0, 0);
            var vLength = plane.geometry.vertices.length;

            for (let i = 0; i < vLength; i++) {
                var v = plane.geometry.vertices[i];
                var dist = new THREE.Vector2(v.x, v.y).sub(center);
                var size = 5.0;
                var magnitude = averages[1];
                v.z = Math.sin(dist.length() / size + (ts/500)) * magnitude;
                meshArr1[0].rotation.x += .000001;
                
                meshArr1[0].rotation.y -=.000001;
                meshArr1[0].rotation.z -=.000001;
                meshArr1[1].rotation.z -=.000005;
                geometryArr1.forEach(e => e.verticesNeedUpdate = true);
            }
            break;
        case 2:
           
            var scalar = averages[0] / 50

            for (var i = 0; i < meshArr2.length; i++) {
                meshArr2[i].rotation.x += 0.01;
                meshArr2[i].rotation.y += 0.01;

                meshArr2[i].scale.y = scalar; // SCALE
                meshArr2[i].scale.z = scalar; // SCALE
                geometryArr2[i].verticesNeedUpdate = true;
            }
            break;

        case 3:

            pivot1.rotation.z += .08;
            pivot2.rotation.z -= .10;
            pivot4.rotation.z += .10;
            pivot5.rotation.z -= .15;

            var scalars = [];
            for (let j = 0; j < 5; j++) {
                scalars.push(averages[j] / 50);
            }

            for (let k = 0; k < meshArr3.length; k++) {
                meshArr3[k].scale.x = scalars[k]; // SCALE
                meshArr3[k].scale.y = scalars[k]; // SCALE
                meshArr3[k].scale.z = scalars[k]; // SCALE
                geometryArr3[k].verticesNeedUpdate = true;
            }
            break;
        case 4:

            var scalars = [];
            for (let j = 0; j < 5; j++) {
                scalars.push(averages[j] / 4);
            }

            for (let k = 0; k < 5; k++) {
                meshArr4[k].scale.y = scalars[k]; // SCALE
                geometryArr4[k].verticesNeedUpdate = true;
            }
            break;

    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

/**
 * This function is called whenever the browser window is resized and adjusts visuals accordingly
 *
 * @returns undefined
 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

requestAnimationFrame(render);

document.addEventListener('keydown', setKeypress);

window.addEventListener('resize', onWindowResize, false);

