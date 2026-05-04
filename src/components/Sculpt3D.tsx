import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Sculpt3D — архитектурная композиция из тонких плит.
 * Стопка горизонтальных листов (как слои документов / страт права),
 * каждая чуть повёрнута относительно соседней — медленный твист.
 * Материал: матовый графит с тонкой охровой кромкой.
 * Сцена смещена вправо, чтобы не перекрывать заголовок.
 */
export function Sculpt3D({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0.4, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    // ------- свет -------
    scene.add(new THREE.AmbientLight(0xf4efe4, 0.55));

    const key = new THREE.DirectionalLight(0xfff3dc, 1.4);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 25;
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xb88638, 0.9);
    rim.position.set(-5, 2, -3);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xc8d0e0, 0.35);
    fill.position.set(-2, -3, 4);
    scene.add(fill);

    // ------- группа плит -------
    const group = new THREE.Group();
    scene.add(group);

    const PLATES = 26;
    const baseGeo = new THREE.BoxGeometry(1.0, 0.06, 1.0, 1, 1, 1);
    // фаска через scale на высоте — упростим: сделаем edges + основной mesh
    const matBody = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1a1d26"),
      roughness: 0.45,
      metalness: 0.15,
      clearcoat: 0.25,
      clearcoatRoughness: 0.6,
      reflectivity: 0.4,
    });
    const matEdge = new THREE.LineBasicMaterial({
      color: new THREE.Color("#b88638"),
      transparent: true,
      opacity: 0.55,
    });

    type Plate = { mesh: THREE.Mesh; edges: THREE.LineSegments; baseY: number; baseRot: number; phase: number };
    const plates: Plate[] = [];

    for (let i = 0; i < PLATES; i++) {
      const t = i / (PLATES - 1); // 0..1
      // эллиптическая модуляция размера: тоньше на концах, шире в центре
      const env = Math.sin(t * Math.PI); // 0..1..0
      const scaleXZ = 0.55 + env * 1.0; // 0.55 .. 1.55

      const mesh = new THREE.Mesh(baseGeo, matBody);
      mesh.scale.set(scaleXZ, 1, scaleXZ * 0.78);
      const y = (t - 0.5) * 3.6;
      mesh.position.y = y;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(baseGeo),
        matEdge
      );
      edges.scale.copy(mesh.scale);
      edges.position.copy(mesh.position);

      const baseRot = t * Math.PI * 0.9; // спираль
      mesh.rotation.y = baseRot;
      edges.rotation.y = baseRot;

      group.add(mesh);
      group.add(edges);

      plates.push({ mesh, edges, baseY: y, baseRot, phase: t * Math.PI * 2 });
    }

    // тонкая ось — золотая нить, проходящая через центр стопки
    const axisGeo = new THREE.CylinderGeometry(0.008, 0.008, 4.2, 12);
    const axisMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#b88638"),
      transparent: true,
      opacity: 0.7,
    });
    const axis = new THREE.Mesh(axisGeo, axisMat);
    group.add(axis);

    // плита-постамент (ловит тень)
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // ------- resize / aspect -------
    const resize = () => {
      const r = mount.getBoundingClientRect();
      renderer.setSize(r.width, r.height, false);
      camera.aspect = r.width / r.height;
      const isMobile = r.width < 768;
      // на мобильном — центруем, опускаем ниже заголовка и уменьшаем
      const offset = THREE.MathUtils.lerp(0, 1.6, THREE.MathUtils.clamp((r.width - 700) / 1200, 0, 1));
      group.position.x = isMobile ? 0 : offset;
      group.position.y = isMobile ? -1.4 : 0;
      const s = isMobile ? 0.65 : 1;
      group.scale.setScalar(s);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ------- pointer parallax -------
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = Math.min(1.5, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ------- loop -------
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      const t = (performance.now() - start) / 1000;

      // smooth parallax
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;

      // общий медленный поворот всей группы
      group.rotation.y = t * 0.12 + cur.x * 0.35;
      group.rotation.x = -0.12 + cur.y * 0.18 + scrollY * 0.25;

      // волна твиста по плитам
      for (let i = 0; i < plates.length; i++) {
        const p = plates[i];
        const wave = Math.sin(t * 0.6 + p.phase) * 0.18;
        p.mesh.rotation.y = p.baseRot + wave;
        p.edges.rotation.y = p.mesh.rotation.y;
        // лёгкое "дыхание" по высоте
        const dy = Math.sin(t * 0.5 + p.phase * 0.8) * 0.025;
        p.mesh.position.y = p.baseY + dy;
        p.edges.position.y = p.mesh.position.y;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      baseGeo.dispose();
      matBody.dispose();
      matEdge.dispose();
      axisGeo.dispose();
      axisMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      plates.forEach((p) => {
        (p.edges.geometry as THREE.BufferGeometry).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden style={{ width: "100%", height: "100%" }} />;
}
