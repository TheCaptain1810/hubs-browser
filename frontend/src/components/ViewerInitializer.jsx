import { useEffect, useRef } from "react";
import { initViewer, loadModel } from "../utils/viewer.js";
import { initTree } from "../utils/sidebar.js";

const ViewerInitializer = () => {
  const previewRef = useRef(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const resp = await fetch("/api/auth/profile");
        if (resp.ok) {
          await resp.json();

          if (previewRef.current) {
            const viewerInstance = await initViewer(previewRef.current);
            initTree("#tree", (id) =>
              loadModel(viewerInstance, window.btoa(id).replace(/=/g, ""))
            );
          }
        }
      } catch (err) {
        alert(
          "Could not initialize the application. See console for more details."
        );
        console.error(err);
      }
    };

    initializeApp();
  }, []);

  return (
    <div>
      <div ref={previewRef} id="preview" />
    </div>
  );
};

export default ViewerInitializer;
