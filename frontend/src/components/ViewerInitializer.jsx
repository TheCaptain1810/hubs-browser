import { useEffect } from "react";
import { initViewer, loadModel } from "../utils/viewer.js";
import { initTree } from "../utils/sidebar.js";

const ViewerInitializer = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const resp = await fetch("/api/auth/profile");
        if (resp.ok) {
          await resp.json();

          // Initialize the viewer
          const viewerInstance = await initViewer(
            document.getElementById("preview")
          );

          // Initialize the tree with the loadModel callback
          initTree("#tree", (id) =>
            loadModel(viewerInstance, window.btoa(id).replace(/=/g, ""))
          );
        }
      } catch (err) {
        alert(
          "Could not initialize the application. See console for more details."
        );
        console.error(err);
      }
    };

    initializeApp();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <div id="preview" />
      <div id="tree" />
    </div>
  );
};

export default ViewerInitializer;
