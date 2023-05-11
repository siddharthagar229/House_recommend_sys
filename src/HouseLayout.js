import React, { useState, useEffect } from "react";

const HOUSE = 1, RESTAURANT = 2, GYM = 3, HOSPITAL = 4;

class House {
    constructor(plot_no, x, y) {
        this.plot_no = plot_no;
        this.x = x;
        this.y = y;
        this.score = 0;
    }
}

export default function HouseLayout(props) {
    const [layout, setLayout] = useState([]);
    const [recommendedHouse, setRecommendedHouse] = useState(null);

    useEffect(() => {
        const newLayout = [];
        for (let i = 0; i < props.rows; i++) {
            const row = [];
            for (let j = 0; j < props.cols; j++) {
                row.push(0);
            }
            newLayout.push(row);
        }
        setLayout(newLayout);
    }, [props.rows, props.cols]);




    const handle_plot = (x, y) => {
        const newLayout = [...layout];
        const plotType = newLayout[x][y];
        if (plotType === HOUSE) {
            alert("This plot already has a house.");
            return;
        }
        if (plotType !== 0) {
            alert("This plot already has a service.");
            return;
        }
        const plot_type = parseInt(prompt("Enter service type (1- for house, 2 - for Restaurant, 3 - for Gym, 4 - for Hospital)"));
        if (![HOUSE, RESTAURANT, GYM, HOSPITAL].includes(plot_type)) {
            alert("Invalid service type.");
            return;
        }
        newLayout[x][y] = plot_type;
        setLayout(newLayout);
    };

    const calc_house_score = () => {
        const houses = [];
        for (let i = 0; i < layout.length; i++) {
            for (let j = 0; j < layout[i].length; j++) {
                if (layout[i][j] === HOUSE) {
                    const house = new House(`${i}-${j}`, i, j);
                    houses.push(house);
                }
            }
        }
        for (let i = 0; i < houses.length; i++) {
            let res = 0;
            for (let j = 0; j < layout.length; j++) {
                for (let k = 0; k < layout[j].length; k++) {
                    if (layout[j][k] !== 0 && layout[j][k] !== HOUSE) {
                        const distance = Math.abs(j - houses[i].x) + Math.abs(k - houses[i].y);
                        if (layout[j][k] === RESTAURANT) {
                            res += 1 / distance;
                        } else if (layout[j][k] === GYM) {
                            res += 1 / distance;
                        } else if (layout[j][k] === HOSPITAL) {
                            res += 1 / distance;
                        }
                    }
                }
            }
            houses[i].score = res;
        }
        return houses;
    };




    const best_recommend_house = () => {
        const houses = calc_house_score();
        if (houses.length === 0) {
            alert("No houses found in the layout.");
            return;
        }
        let max_score = 0;
        let recommendedHouse = null;
        for (let i = 0; i < houses.length; i++) {
            if (houses[i].score > max_score) {
                max_score = houses[i].score;
                recommendedHouse = houses[i];
            }
        }
        setRecommendedHouse(recommendedHouse);
    };

    return (
        <div>
            <div>
                <h1>HOUSE LAYOUT</h1>
                {
                    layout.map((row, x) => (
                        <div key={x} style={{ display: "flex" }}>
                            {
                                row.map((plotType, y) => (
                                    <div
                                        key={`${x}-${y}`}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            border: "1px solid black",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor:
                                                plotType === HOUSE
                                                    ? "green"
                                                    : plotType === RESTAURANT
                                                        ? "yellow"
                                                        : plotType === GYM
                                                            ? "orange"
                                                            : plotType === HOSPITAL
                                                                ? "red"
                                                                : "white",
                                        }
                                        }
                                        onClick={() => handle_plot(x, y)}
                                    >
                                        {plotType === HOUSE ? "H" : plotType === RESTAURANT ? "R" : plotType === GYM ? "G" : plotType === HOSPITAL ? "H" : ""}
                                    </div>
                                )
                                )
                            }
                        </div>
                    )
                    )
                }
            </div>
            <br />
            {/* <br /> */}
            <div>
                <button onClick={best_recommend_house} style={{
                    background: "white", border: "none",
                    color: "black",
                    padding: "15px 32px",
                    cursor: "grab",
                    fontSize: "20 px",
                    border: "2px solid blue",
                    borderRadius: "3 px",
                    marginTop: " 5 px"
                }}>Recommend House</button>
                {props.rows != 0 && props.cols != 0 && recommendedHouse && (
                    <p>
                        Recommended House: {recommendedHouse.plot_no} (Score: {recommendedHouse.score})
                    </p>
                )}
            </div>
        </div>
    )
}

