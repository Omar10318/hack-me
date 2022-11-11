import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setDesk } from "../../redux/actions";

import "./desks.css";

function DeskCard(props: any) {
    const dispatch = useDispatch();
    const { name, idx, id } = props;
    
    const [ inpName, setInpName ] = useState(name);

    const handleInputChange = (e: any) => {
        setInpName(e.target.value);
    };
    const cardSaveClick = () => {
        dispatch(setDesk(id, inpName));
        setInpName('');
    };
    return <div key={idx} className="unit-desk-card">
        <input value={inpName} type="text" onChange={handleInputChange}/>
        <button className="card-button" onClick={cardSaveClick}>Save</button>
    </div>
}

const Desks = () => {
    let existingDesks: { [key: string]: any };
    let setExistingDesks: any;
    [ existingDesks, setExistingDesks ] = useState({});
    const desks = useSelector((state: any) => state.desks);
    useEffect(() => {
        setExistingDesks(desks);
    }, [desks]);

    return <div className="desks">
        <h1>Available desks</h1>
        <div className="desk-cards">
        {
            Object.keys(existingDesks).map((id: string) => (
                <DeskCard name={existingDesks[id]} idx={id} id={id}/>
            ))
        }
        </div>
        <div className="add-desk">
            <p>Add a new desk</p>
            <DeskCard name={""} idx={Object.keys(existingDesks).length + 1}/>
        </div>
    </div>
}

export default Desks;