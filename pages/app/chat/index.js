import { useRouter } from "next/router";
import NavBar from "~/components/NavBar";

export default function CardPage() {
  const router = useRouter();
  function card(title, description, link) {
    return (
      <div class="indicator">
        <div class="indicator-item indicator-bottom">
          <button
            class="btn btn-primary"
            onClick={() => router.push("/app/chat/" + link)}
          >
            Chat
          </button>
        </div>
        <div class="card border">
          <div class="card-body">
            <h2 class="card-title">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavBar thispage="Chat" />
      </div>
      {card("test", "test", "1/1")}
    </div>
  );
}
