import React from 'react';
import Employee from '../Definitions/Employee';
import EmployeeView from "./EmployeeView";

interface AppProps {
}

interface AppState {
    employees: Employee[]
}

class IOUBoard extends React.Component<AppProps, AppState> {
    initialContacts = [
        {
            id: 1,
            name: "Andrew Parnham",
            imgUrl: "",
            amountOwed: 4.80
        },
        {
            id: 2,
            name: "Andrew Cuthbert",
            imgUrl: "",
            amountOwed: 10.50
        },
        {
            id: 3,
            name: "Andrew Gough",
            imgUrl: "",
            amountOwed: 0.40
        },
    ];

    constructor(props: AppProps) {
        super(props);

        //We will first initialise our internal array of employees to be an empty array!
        this.state = { employees: [] };
    }

    getIOUElements = (): JSX.Element[] => {
        return this.initialContacts.map((contact: Employee) => {
            return <EmployeeView employee={contact} />
        });
    };

    render() {
        return (
            <div className={"js-rootContainer"}>
                <h1>GCD IOU Board!</h1>

                <div className={"js-listContainer"}>
                    <ul className={"js-list"}>
                        {this.getIOUElements()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default IOUBoard;
