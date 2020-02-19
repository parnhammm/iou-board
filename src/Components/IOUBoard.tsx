import React from 'react';
import Employee from '../Definitions/Employee';
import EmployeeView from "./EmployeeView";
import axios, { AxiosPromise, AxiosResponse } from "axios";

interface AppProps {
}

interface AppState {
    employees: Employee[],
    loadingInitialList: boolean
}

class IOUBoard extends React.Component<AppProps, AppState> {
    rootUrl = "http://localhost:3004/employees";

    constructor(props: AppProps) {
        super(props);

        //We will first initialise our internal array of employees to be an empty array!
        this.state = {
            employees: [],
            loadingInitialList: true
        };

        this.fetchEmployees();
    }

    public fetchEmployees(): void {
        axios
            .get(`${this.rootUrl}/`)
            .then(
                (response: AxiosResponse) => {
                    this.setState({
                        loadingInitialList: false,
                        employees: response.data
                    });
                }
            );
    }

    getIOUElements = (): JSX.Element[] => {
        return this.state.employees.map((contact: Employee) => {
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
