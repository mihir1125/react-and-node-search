function NewPost() {
    return (
        <>
            <div className="container-md p-5 w-50">
                <h1 className="mb-3">New post</h1>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Name
                    </label>
                    <input
                        type="username"
                        className="form-control mb-3"
                        id="username"
                        placeholder="Will be visible under the post"
                    />
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        id="title"
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
                        className="form-control mb-3"
                        type="file"
                        id="image"
                        onChange={handleChange}
                    ></input>
                    <label htmlFor="desc" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control mb-3"
                        id="desc"
                        rows="3"
                    ></textarea>
                </div>
            </div>
        </>
    );
}

const handleChange = (event) => {
    let frame = document.getElementById("image-frame");
    if (event.target.files && event.target.files[0]) {
        console.log("detected change", event.target.files[0]);
        frame.src = URL.createObjectURL(event.target.files[0]);
        frame.classList.add("border");
    } else {
        frame.classList.remove("border");
    }
    // if (event.files && event.files[0]) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         frame.setAttribute("src", e.target.result);
    //         console.log(e);
    //     };
    //     reader.readAsDataURL(event.target.files[0]);
    // }
};

export default NewPost;
