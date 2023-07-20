import { usePlane,Physics } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Ground() {
  const [ref] = usePlane(
    () => ({ 
      type: 'Static', 
      rotation: [-Math.PI / 2, 0, 0] }
    ), 
    useRef(null)
  );

  const gridMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/grid.png"
  );

  const aoMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/ground-ao.png"  
  );

  const alphaMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/alpha-map.png"
  );

  const meshRef = useRef(null);
  const meshRef2 = useRef(null);

  useEffect(() => {

    //The useEffect hook is used to set the anisotropy property of the gridMap texture to 16 once it's loaded. Anisotropy enhances the texture quality when viewing it from oblique angles.

    if (!gridMap) return;

    gridMap.anisotropy = 16;
  }, [gridMap]);

  //In computer graphics and 3D rendering, a "mesh" refers to a fundamental data structure used to represent the shape and surface of 3D objects. A mesh is made up of vertices, edges, and faces, which collectively define the geometry and topology of the object.

  useEffect(() => {
    if (!meshRef.current) return;

    //This line checks if meshRef.current is truthy or not. If it's falsy (i.e., meshRef.current is null or undefined), the function returns early and doesn't perform any further modifications.This check is important because the useEffect hook might run multiple times during component updates, and we want to ensure that the code inside the useEffect is executed only when meshRef.current is available.


    var uvs = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    var uvs2 = meshRef2.current.geometry.attributes.uv.array;
    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef.current]);

  return (

    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh>

      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >

        <circleGeometry args={[6.12, 50]} />
        <MeshReflectorMaterial
          aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}

          dithering={true}
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          debug={0}
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        ></MeshReflectorMaterial>
      </mesh>
    </>
  );
}