function NewPost() {
    const { VITE_SERVERADDRESS: SERVERADDRESS, VITE_SERVERPORT: SERVERPORT } =
        import.meta.env;
    const server = `${SERVERADDRESS}:${SERVERPORT}`;
    return (
        <>
            <div className="container-md p-5 w-50">
                <h1 className="mb-3">New post</h1>
                <div className="mb-3">
                    <form
                        method="POST"
                        action={`${server}/newpost`}
                        encType="multipart/form-data"
                    >
                        <label htmlFor="username" className="form-label">
                            Name
                        </label>
                        <input
                            name="username"
                            type="username"
                            className="form-control mb-3"
                            id="username"
                            placeholder="Will be visible under the post"
                            maxLength="30"
                            onKeyDownCapture={handleInput}
                        />
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            name="title"
                            type="text"
                            className="form-control mb-3"
                            id="title"
                            maxLength="60"
                            onInput={handleInput}
                        />
                        <img
                            id="image-frame"
                            src=""
                            alt=""
                            className="d-flex object-fit-contain rounded mx-auto"
                            style={{ width: "300px", maxHeight: "500px" }}
                        />
                        <label htmlFor="image" className="form-label">
                            Image to display
                        </label>
                        <input
                            name="image"
                            className="form-control mb-3"
                            type="file"
                            id="image"
                            onChange={handleChange}
                            onInput={handleInput}
                        ></input>
                        <label htmlFor="desc" className="form-label">
                            Description
                        </label>
                        <textarea
                            name="desc"
                            className="form-control mb-3"
                            id="desc"
                            rows="3"
                            maxLength="200"
                        ></textarea>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

const handleChange = (event) => {
    let frame = document.getElementById("image-frame");
    if (event.target.files && event.target.files[0]) {
        frame.src = URL.createObjectURL(event.target.files[0]);
        frame.classList.add("border");
    } else {
        frame.classList.remove("border");
    }
};

const handleInput = (e) => {
    if (e.target.value.length >= e.target.getAttribute("maxlength")) {
        e.target.classList.add("text-danger");
        setTimeout(() => {
            e.target.classList.remove("text-danger");
        }, 300);
    } else {
        e.target.classList.remove("text-danger");
    }
};

export default NewPost;
