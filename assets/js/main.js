(() => {
    function s() {
        t(),
        i(),
        o()
    }
    function t() {
        window.customElements.define("r-grid", class  extends HTMLElement{}
        , {
            extends: "div"
        }),
        window.customElements.define("r-cell", class  extends HTMLElement{}
        , {
            extends: "div"
        })
    }
    function i() {
        document.addEventListener("keypress", e => {
            e.altKey && (e.code == "KeyG" ? document.body.classList.toggle("debug-base-grid") : e.code == "KeyD" && (document.documentElement.classList.toggle("debug-base-grid"), document.documentElement.classList.toggle("debug")))
        })
    }
    function o() {
        const e = document.querySelector("r-grid.main.post,r-grid.main.work,body.enable-anchored-headings");
        if (e) {
            let d = e.querySelectorAll("h2[id],h3[id]");
            for (let n = 0; n < d.length; n++)
                l(d[n])
        }
    }
    function l(e) {
        if (!e.id)
            return;
        for (let n = 0; n < e.childNodes.length; n++)
            if (e.childNodes[n].nodeName == "A")
                return;
        let d = document.createElement("a");
        for (; e.childNodes.length;)
            d.appendChild(e.childNodes[0]);
        e.appendChild(d),
        d.href = "#" + e.id
    }
    s();
})();
//# sourceMappingURL=main.js.map