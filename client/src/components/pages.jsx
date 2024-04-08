function CardContainer({ card }) {
    if (Object.keys(card).length == 0) {
        return;
    } else {
        return (
            <div className="container-md p-5">
                <div
                    className="card align-items-center py-4 bg-primary"
                    style={{ width: "300px" }}
                >
                    <img
                        src={card.image}
                        alt={card.title}
                        width="200px"
                        max-height="500px"
                        style={{ objectFit: "contain" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text">{card.content}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardContainer;
