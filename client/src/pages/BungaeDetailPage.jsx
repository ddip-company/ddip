import Navbar from "../component/Navbar";
import { dummyBungaeList } from "../static/dummy/bungaeList";
import { useEffect, useState } from "react";
import BungaeDetail from "../component/BungaeDetail";

function BungaeDetailPage() {
  const [bungaeDetail, setBungaeDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setBungaeDetail(dummyBungaeList[0]);
    setIsLoading(false);
  }, []);

  if (isLoading) return;

  return (
    <>
      <Navbar />
      <BungaeDetail bungaeDetail={bungaeDetail} />
    </>
  );
}

export default BungaeDetailPage;
