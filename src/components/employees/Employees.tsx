import "./employees.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setEmployee } from "../../redux/actions";


function EmployeeCard(props: any) {
    const dispatch = useDispatch();
    const { name, email, preferedDesks, idx, id, isNew, assignedDesk } = props;
    
    const [ inpName, setInpName ] = useState(name);
    const [ inpEmail, setInpEmail ] = useState(email);
    const [ inpAssignedDesk, setInpAssignedDesk ] = useState(assignedDesk);
    const [ inpPreferedDesks, setInpPreferedDesks ] = useState(preferedDesks);

    const desks = useSelector((state: any) => state.desks);

    const setInpPreferedDesk = (newPreferedDesk: string, idx: number, elemId: string) => {
        inpPreferedDesks[idx] = newPreferedDesk;
        setInpPreferedDesks([...inpPreferedDesks]);
        setTimeout(function() {
            document.getElementById(elemId)!.focus();
        }, 10);
    };

    const addInpPreferedDesk = () => {
        inpPreferedDesks.push('');
        setInpPreferedDesks([...inpPreferedDesks]);
    };

    const cardSaveClick = () => {
        dispatch(setEmployee(id, inpName, inpEmail, [...inpPreferedDesks], inpAssignedDesk));
        if (isNew) {
            setInpName('');
            setInpEmail('');
            setInpPreferedDesks([]);
            setInpAssignedDesk('');
        }
    };

    return <div key={idx} className="unit-employee-card">
        <div key={`name_${idx}`} className="input-line">
            <div key={`name_1_${idx}`}>Name</div>
            <input value={inpName} type="text" onChange={e => setInpName(e.target.value)}/>
        </div>
        <div key={`email_${idx}`} className="input-line">
            <div key={`email_1_${idx}`}>Email</div>
            <input value={inpEmail} type="text" onChange={e => setInpEmail(e.target.value)}/>
        </div>
        {
            inpPreferedDesks.map((elem: string, i: number) => (
                <div key={`${elem}_${i}_${idx}`} className="input-line">
                    <div key={`desk_${elem}_${i}_${idx}`}>{`Desk ${i+1}`}</div>
                    <input id={`desk_inp${idx}_${i}`} value={elem} list="suggestions" type="text" onChange={e => setInpPreferedDesk(e.target.value, i, `desk_inp${idx}_${i}`)}/>
                    <datalist key={`datalist_${elem}_${i}_${idx}`} id="suggestions">
                    {
                        Object.keys(desks).map((key, j) => (
                            <option  key={`${elem}_${i}_${j}_${idx}`} value={desks[key]}/>
                        ))
                    }
                    </datalist>
                </div>
            ))
        }
        <button className="add-prefered-desk" onClick={addInpPreferedDesk}>Add prefered Desk</button>
        <button className="employee-card-button" onClick={cardSaveClick}>Save</button>
        <div key={`assign_desk_${idx}`} className="input-line">
            <div>Assigned desk: </div>
            <input value={inpAssignedDesk} disabled/>
        </div>
    </div>
}

function getPreferenceMatrix(employees: { [key: string]: any }): number[][] {
    return Object.keys(employees).reduce((acc: number[][], k: string) => {
        acc.push(employees[k].preferedDesks.map((e: string) => e));
        return acc;
    }, []);
}

export function getAssignmentMatrix(employees: { [key: string]: any }) {
    const M = getPreferenceMatrix(employees);
    M.forEach((row: number[], i: number) => {
        if (row.length > 0) {
            let conflicts: number[] = [];
            M.forEach((r, j) => {
                if (i !== j) {
                    if (row[0] === r[0]) {
                        conflicts.push(j);
                    }
                }
            });
            let cedeAll = false;
            let choice = 1;
            let k = 0;
            for (let conflict of conflicts) {
                let breakFor = false;
                while (choice < Math.max(M[conflict].length, M[i].length)) {
                    if (M[i][choice] && !M.map(e => e[0]).includes(M[i][choice])) {
                        let temp = M[i][0];
                        M[i][0] = M[i][choice];
                        M[i][choice] = temp;
                        breakFor = true;
                        break;
                    } else if (M[conflict][choice] && !M.map(e => e[0]).includes(M[conflict][choice])) {
                        let temp = M[conflict][0];
                        M[conflict][0] = M[conflict][choice];
                        M[conflict][choice] = temp;
                        breakFor = true;
                        break;
                    } else {
                        choice++;
                    }
                }
                if (breakFor) {
                    break;
                }
                if (k >= conflicts.length - 1) {
                    cedeAll = true
                }
                k++;
            }
            if (cedeAll) {
                M[i] = Array(M[i].length).fill('');
            }
        }
    });
    return M;
}

const Employees = () => {
    const dispatch = useDispatch();
    let existingEmployees: { [key: string]: any };
    let setExistingEmployees: any;
    [ existingEmployees, setExistingEmployees ] = useState({});
    const employees = useSelector((state: any) => state.employees);
    useEffect(() => {
        setExistingEmployees(employees);
    }, [employees]);

    const assignDesksToEmployees = () => {
        const M = getAssignmentMatrix(employees);
        Object.keys(employees).forEach((k: string, idx: number) => {
            employees[k].assignedDesk = M[idx][0] || '';
            dispatch(setEmployee(k, employees[k].name, employees[k].email, [...employees[k].preferedDesks], employees[k].assignedDesk));
        });
    };


    return <div className="employees">
        <h1>Available employees</h1>
        <div key={`cards`} className="employee-cards">
        {
            Object.keys(existingEmployees).map((id: string) => (
                <EmployeeCard
                    key={`${id}_${Math.floor(Math.random() * 10000).toString()}`}
                    name={existingEmployees[id].name}
                    email={existingEmployees[id].email}
                    preferedDesks={existingEmployees[id].preferedDesks || []}
                    idx={`${id}_${Math.floor(Math.random() * 10000).toString()}`}
                    id={id}
                    assignedDesk={existingEmployees[id].assignedDesk}
                    isNew={false}
                />
            ))
        }
        </div>
        <div key={`add-employee`} className="add-employee">
            <p>Add a new employee</p>
            <EmployeeCard
                id={Object.keys(employees).length + 1}
                name={""}
                email={""}
                preferedDesks={[]}
                idx={Object.keys(existingEmployees).length + 1}
                assignedDesk={""}
                isNew={true}
            />
        </div>
        <button className="assign-button" onClick={assignDesksToEmployees}>
            Assign Desk To Employees Based on Preference
        </button>
    </div>
}

export default Employees;