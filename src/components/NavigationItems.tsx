import Employees from "./employees/Employees";
import Desks from "./desks/Desks";

const NavigationItems = [
    {
        name: "Desks",
        route: '/desks',
        component: <Desks/>,
        isMain: true,
    },
    {
        name: "Employees",
        route: '/employees',
        component: <Employees/>,
    },
];

export default NavigationItems;