import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// This imports the GLTFLoader class from the Three.js library. The GLTFLoader is a loader that allows loading 3D models in the GLTF format.

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";
import { Physics } from "@react-three/cannon";
import { Ramp } from "./Ramp";
// his imports the TextureLoader class from the Three.js library. The TextureLoader is a loader used to load textures (images) for materials in Three.js.

export function Track() {
  const result = useLoader(
    GLTFLoader,
    // The GLTFLoader is a loader class used for loading 3D models in the GLTF (GL Transmission Format) file format. 
    process.env.PUBLIC_URL + "/models/track.glb"
  );

//   This line uses the useLoader hook to load a 3D model in GLTF format using the GLTFLoader. The loaded model data is stored in the result variable. process.env.PUBLIC_URL refers to the public URL of the application, and it is used here to construct the URL of the model file.

  const colorMap = useLoader(
    TextureLoader,
    // The TextureLoader is a loader class used for loading texture images in various formats, such as JPG, PNG, or GIF. Textures are images used to define the appearance of 3D objects. 
    process.env.PUBLIC_URL + "/textures/track.png"
  );

  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap]);

//   For example, setting anisotropy: 1 means that there is no anisotropic filtering, and the texture is filtered uniformly in all directions. On the other hand, setting anisotropy: 16 means that the texture is filtered at a maximum level of 16:1 ratio, providing higher quality when viewed at oblique angles.


  let geometry = result.scene.children[0].geometry;

  //This line extracts the geometry of the 3D model loaded in the result variable. It accesses the first child of the scene property in the result object and gets its geometry.

  return (
    <>
  <mesh>
    <primitive object={geometry} attach={"geometry"}/>
    {/* This is a special Three.js primitive that takes a geometry object as its object prop and attaches it as the geometry for the current mesh. It sets the 3D model's geometry. */}
    <meshBasicMaterial
    toneMapped={false}
    map={colorMap}
    />
  </mesh>



  <Physics>
  <Ramp/>

  <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]}/>
      
      <ColliderBox position={[-1.85,0,0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-1.85,0,-0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-2.28,0,0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-2.28,0,-0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-4.39,0,1.125]} scale={[0.13, 1, 0.13]}/>
      <ColliderBox position={[-4.39,0,1.9]} scale={[0.13, 1, 0.13]}/>
      
      <ColliderBox position={[-2.86,0,-0.9]} scale={[0.35, 1, 0.35]}/>
      <ColliderBox position={[-3.33,0,-0.9]} scale={[0.35, 1, 0.35]}/>
      <ColliderBox position={[0.41,0,2]} scale={[0.35, 1, 0.35]}/>
      
      <ColliderBox position={[-2.3,0,-2.76]} scale={[1.37, 1, 1.09]}/>
      
      <ColliderBox position={[-3.08,0,0.89]} scale={[0.36, 1, 0.03]}/>
      <ColliderBox position={[-2.53,0,0.89]} scale={[0.36, 1, 0.03]}/>
      
      <ColliderBox position={[-4.53,0,-0.65]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-4.15,0,-0.67]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-4.9,0,-0.58]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-0.3,0,1]} scale={[0.1, 0.5, 0.1]}/>
  </Physics>
  </>
  );
}