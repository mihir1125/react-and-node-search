function CardContainer({ card }) {
    if (Object.keys(card).length == 0) {
        return;
    } else {
        return (
            <div className="container-md p-5">
                <div
                    className="card py-4 pb-0 bg-primary"
                    style={{ width: "300px" }}
                >
                    <img
                        src={toBase64png(card.image.data)}
                        alt={card.title}
                        width="200px"
                        max-height="500px"
                        className="rounded align-self-center"
                        style={{ objectFit: "contain" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.description}</p>
                        <p className="fst-italic">By {card.author}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const toBase64png = (bin) => {
    return `data:image/png;base64,${btoa(
        bin.reduce((data, byte) => data + String.fromCharCode(byte), "")
    )}`;
};

export default CardContainer;
