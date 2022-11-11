export const setDesk = (id, name) => {
    return {
        type: "SET_DESK",
        deskId: id,
        deskName: name,
    }
};

export const setEmployee = (id, name, email, preferedDesks, assignedDesk) => {
    return {
        type: "SET_EMPLOYEE",
        id,
        name,
        email,
        preferedDesks,
        assignedDesk
    }
};