import NavBar from "~/components/NavBar";
const Dashboard = () => {
  return (
    <div>
      <div>
          <NavBar thispage="Dashboard" />
      </div>
      <div class="divider">Menu</div>
      <div class="stack">
        <div class="text-center shadow-md w-36 card bg-base-100 hover:bg-base-200">
          <div class="card-body">
            <a href="/app/chat">Chat</a>
          </div>
        </div>
        <div class="text-center shadow w-36 card bg-base-100">
          <div class="card-body"></div>
        </div>
        <div class="text-center shadow-sm w-36 card bg-base-100">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
