import { Sandpack } from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

export default function App() {
  return (
    <div>
      <div>
        <div className="navbar bg-neutral text-neutral-content mb-5 rounded-box">
          <dic className="navbar-start" />
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl" href="/">
              Sandbox
            </a>
          </div>
          <div className="navbar-end" />
        </div>
      </div>
      <Sandpack
        // Try out the included templates below!
        // template="react"
        // template="react-ts"
        // template="angular"
        // template="vue"
        // template="vue3"
        // template="vanilla-ts"
        template="vanilla" // default
      />
    </div>
  );
}
