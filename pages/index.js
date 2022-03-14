import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  function authpage() {
    console.log("Auth jump button clicked");
    router.push("/login");
  }

  return (
    <div>
      <div>
        <h1 className="text-xl">
          Sessions
          <div className="badge badge-secondary badge-outline">beta</div>
        </h1>
      </div>
      <div>
        <button className="btn btn-block" onClick={() => authpage}>
          Login / Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
