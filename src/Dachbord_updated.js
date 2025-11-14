import { Outlet } from "react-router-dom";
import StickyNavBar from "./compenent/StickyNavBar";

function Dachbord() {
  return (
    <div>
      <StickyNavBar />
      <div style={{ paddingTop: '80px' }}> {/* Espace pour la navbar fixe */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dachbord;
