document.addEventListener("DOMContentLoaded", function () {
    const editableElements = document.querySelectorAll(".editable");
    const editButton = document.querySelector(".edit__button");
    const dowloadBtn = document.getElementById("generate-pdf");
    let editMode = false;

    function animationForText(element) {
        element.classList.add("text-animation");
        setTimeout(() => element.classList.remove("text-animation"), 200);
    }

    editableElements.forEach((el) => {
        const id = el.id;
        const savedValue = localStorage.getItem(id);
        if (savedValue) {
            el.textContent = savedValue;
        }
    });

    editButton.addEventListener("click", function () {
        editMode = !editMode;
        this.textContent = editMode
            ? "Закончить редактирование"
            : "Редактировать";

        editableElements.forEach((el) => {
            const id = el.id;
            el.contentEditable = editMode;
            el.addEventListener("input", (event) => {
                const currentElement = event.target;
                if (currentElement.id == id) {
                    animationForText(el);
                }
                localStorage.setItem(id, currentElement.textContent);
            });
        });
    });

    dowloadBtn.addEventListener("click", function () {
        const element = document.getElementById("content");

        const opt = {
            margin: 10,
            filename: "GizedtinovDF_resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait",
            },
        };
        html2pdf().from(element).set(opt).save();
    });
});
