import HeadingPageContent from "./PageContent/HeadingPageContent";
import BungaeCreate from "../component/BungaeCreate/BungaeCreate";
import { useLocation } from "react-router-dom";

function BungaeEditPage() {
  const { state } = useLocation();

  return (
    <>
      <HeadingPageContent />
      <div className="create-container">
        <BungaeCreate bungaeDetail={state} isEditModeProp={true} />
      </div>
    </>
  );
}

export default BungaeEditPage;
