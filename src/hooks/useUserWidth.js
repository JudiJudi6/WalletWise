import { useEffect, useState } from "react";

export function useUserWidth() {
  const [width, setWidth] = useState("");

  useEffect(function () {
    function readUserWitdh() {
      setWidth(window.innerWidth);
    }
    readUserWitdh()
    window.addEventListener("resize", readUserWitdh);

    return () => {
      window.removeEventListener("resize", readUserWitdh);
    };
  }, []);

  return width;
}
