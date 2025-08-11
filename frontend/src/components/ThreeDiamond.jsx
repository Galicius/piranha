import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Subtle rotating gold octahedron (diamond-like) used as decorative element.
export default function ThreeDiamond({ className = "", intensity = 0.6 }) {
  const mountRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0.6, 0.6, 4);

    const light1 = new THREE.DirectionalLight(0xffe2a3, intensity);
    light1.position.set(2, 3, 4);
    scene.add(light1);
    const light2 = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(light2);

    const geo = new THREE.OctahedronGeometry(1.1, 0);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xf4ce90,
      roughness: 0.35,
      metalness: 0.6,
      clearcoat: 0.4,
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wire = new THREE.WireframeGeometry(geo);
    const line = new THREE.LineSegments(wire, new THREE.LineBasicMaterial({ color: 0xf4ce90, opacity: 0.5, transparent: true }));
    scene.add(line);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      mesh.rotation.y += 0.004;
      mesh.rotation.x += 0.0025;
      line.rotation.copy(mesh.rotation);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [intensity]);

  return <div ref={mountRef} className={className} style={{ aspectRatio: "1 / 1" }} />;
}