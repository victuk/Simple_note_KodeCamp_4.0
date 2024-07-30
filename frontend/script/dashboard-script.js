const mainArea = document.querySelector("main");

async function loadNotes() {
    const response = await fetch(urlMaker("/note"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken()
        }
    });

    const data = await response.json();

    console.log(data);

    if(data.notes.length == 0) {
        mainArea.innerHTML = `
            <div class="no-note">No note, kindly add one</div>
        `;
    } else {
        mainArea.innerHTML == "";

        for (let note of data.notes) {

            mainArea.style.display = "grid";

            mainArea.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
            mainArea.style.margin = "40px 80px 0 80px";
            mainArea.style.gap = "20px";



            mainArea.innerHTML += `
                <div class="single-note">
                    <h3>${note.title.length >=25 ? note.title.slice(0, 25) + "..." : note.title}</h3>
                    <div>${note.body.length >=30 ? note.body.slice(0, 30) + "..." : note.body}</div>
                    <div class="view-edit-delete-button">
                        <button class="view-button" onclick='viewNote("${note._id}")'>View</button>
                        <button class="edit-button" onclick="location.assign('/frontend/edit-note.html?id=' + '${note._id}')">Edit</button>
                        <button class="delete-button" onclick="location.assign('/frontend/delete-note.html?id=' + '${note._id}')">Delete</button>
                    </div>
                </div>
            `;
        }

    }

}

loadNotes();

function viewNote(id) {
    location.assign(`/frontend/view-note.html?id=${id}`);
}