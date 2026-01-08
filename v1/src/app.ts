import prDoc from "./views/pr.html" with { type: "text" };
import commitDoc from "./views/commit.html" with { type: "text" };
import releaseDoc from "./views/release.html" with { type: "text" };

type ViewName = "pr" | "commit" | "release";

const docs: Record<ViewName, string> = {
  pr: prDoc,
  commit: commitDoc,
  release: releaseDoc,
};

const frame = document.querySelector<HTMLIFrameElement>("#viewFrame")!;
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-view]"));

function setActiveTab(name: ViewName) {
  for (const btn of tabs) btn.classList.toggle("active", btn.dataset.view === name);
}

function showView(name: ViewName) {
  setActiveTab(name);
  frame.srcdoc = docs[name];
}

for (const btn of tabs) {
  btn.addEventListener("click", () => showView(btn.dataset.view as ViewName));
}

showView("pr");
