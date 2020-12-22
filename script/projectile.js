var scene, camera, renderer, base, sphere, ground;

function init(){
    // Create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 900, 1000 );

    // Create a camera
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 0, -5 );

    // Create Base
    const baseTexture = new THREE.TextureLoader().load('./image/wood.jpg');
    baseTexture.wrapS = baseTexture.wrapT = THREE.MirroredRepeatWrapping;
    baseTexture.anisotropy = 2;
    baseTexture.repeat.set(2, 2);
    const baseMaterial = new THREE.MeshBasicMaterial( { map: baseTexture } );
    base = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1), // width, height, depth
        baseMaterial
    );
    base.position.set(10,-0.1,0);
    base.scale.set(0.5,3,0);
    scene.add(base);

    // Create Sphere
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2, 10, 10), // width, height, depth
        new THREE.MeshBasicMaterial({color:0xff4444})
    );
    sphere.position.set(10,1.8,0)
    sphere.scale.set(0.2,0.2,0);
    scene.add(sphere);

    //const groundTexture = new THREE.TextureLoader().load( './image/grasslight-big.jpg' );
    //groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    //groundTexture.repeat.set( 1000, 1000);
    //groundTexture.anisotropy = 1000;

    //const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 20000, 20000 ),
        new THREE.MeshBasicMaterial({color:0x228B22})
    );
    ground.position.y = -300;
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Point the camera to look at 0,0,0
    camera.lookAt(new THREE.Vector3(0,0,0));

    // Creates the renderer with size 1280x720
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Puts the "canvas" into our HTML page.
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
    // Begin animation
}



function display(){


    // Rotate our mesh.
    if (sphere.position.y > -0.1) {
        requestAnimationFrame(display); // Tells the browser to smoothly render at 60Hz
        //sphere.rotation.x += 0.01;
        sphere.rotation.z += 0.02;
        sphere.position.x -= 0.1;
        sphere.position.y -= 0.02;
    } else {
        sphere.position.x = 1;
        sphere.position.y = 0;
    }
    // Draw the scene from the perspective of the camera.
    renderer.render(scene, camera);
}

// When the page has loaded, run init();
window.onload = init;

function maxHeight(){
    var v0 = document.getElementById("v0").value;
    var y0 = document.getElementById("y0").value;
    var theta = document.getElementById("theta").value * Math.PI/180;
    var vy = Math.sin(theta) * v0;
    var t = vy / 9.8
    var yf = Number.parseFloat((y0 + vy * t + 1 / 2 * 9.8 * t * t)).toPrecision(4);
    document.getElementById("yf").value = +yf;
    //alert("yf="+yf);
}