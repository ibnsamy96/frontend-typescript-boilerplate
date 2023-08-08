console.log("Hello World")

const h1 = document.createElement("h1")
h1.textContent = "Hi, the project is working fine! :)"
h1.className = "h1 text-2xl font-semibold"

const p = document.createElement("p")
p.textContent =
	"You may need now to check the scripts written in the package.json file."
p.className = "h3 text-lg"

const root = document.querySelector("#root") as HTMLElement
root.append(h1, p)
