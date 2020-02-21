import React from 'react';
import Employee from '../Definitions/Employee';
import EmployeeView from "./EmployeeView";
import axios, { AxiosResponse } from "axios";

//React has the concept of 'props' and 'state'.
//You can think of 'props' as any information passed to the class
//While the 'state' is some information stored within the class.
interface AppProps {
}

interface AppState {
    employees: Employee[],
    loadingInitialList: boolean
}

class IOUBoard extends React.Component<AppProps, AppState> {
    //This is the URL that the data is located at
    rootUrl = "http://localhost:3004/employees";

    //The constructor is the first method called when a class is created
    //so you can add all the code you need to do when the app first starts up
    constructor(props: AppProps) {
        super(props);

        //We will first initialise our internal array of employees to be an empty array
        //so that we have something to store the employees we fetch in
        this.state = {
            employees: [],
            loadingInitialList: true
        };

        //This method reaches out to the data store and retrieves all the employees
        //that are stored within. This method also copies the contacts into our
        //employee array we created above
        this.fetchEmployees();
    }

    /**
     * Fetches the employees from the data store and stores them in the employee state array
     */
    public fetchEmployees = (): void => {
        //Axios is a library that allows us to make requests to the data store
        //Calling .get(`${this.rootUrl}/`) will translate to .get(`http://localhost:3004/employees/`)
        //which will contact the data store and retrieve the employee information.
        //
        //The .then() is executed when we get a response from the data store. So in this case
        //it will receive a JSON payload that we will copy into our array
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
    };

    /**
     * Updates the amount currently stored in the IOU data store
     *
     * @param id number: The ID of the employee to update
     * @param employee Employee: The data to update the employee with
     */
    public updateIOUAmount = (id: number, employee: Employee): void => {
        //Calling .put() here will tell the data store to update the value it has
        //stored at ID of id with the employee object we pass
        axios.put(`${this.rootUrl}/${id}`, employee);
    };

    /**
     * Loops over our employee array in state and renders each with an EmployeeView
     * component
     */
    getIOUElements = (): JSX.Element[] => {
        return this.state.employees.map((contact: Employee) => {
            return <EmployeeView
                key={contact.id}
                employee={contact}
                updateIOUAmount={this.updateIOUAmount}
            />
        });
    };

    /**
     * Renders out the content we will see on the page
     */
    render() {
        let style = {
            margin: "2em"
        };

        return (
            <div className={"js-rootContainer"} style={style}>
                <div className={"js-listContainer"}>
                    <div className="ui center aligned column grid">
                        <div className={"row"}>
                            <div className="ui warning compact message centered">
                                <div className="header">Max IOU Amount: £5</div>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"ui centered five cards"}>
                                {this.getIOUElements()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IOUBoard;
