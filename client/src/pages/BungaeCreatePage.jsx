import BungaeCreate from "../component/BungaeCreate/BungaeCreate";
import HeadingPageContent from "./PageContent/HeadingPageContent";

function BungaeCreatePage() {
  return (
    <>
      <HeadingPageContent />
      <div className="create-container">
        <BungaeCreate />
      </div>
    </>
  );
}

export default BungaeCreatePage;
