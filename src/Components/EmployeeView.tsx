import React, {Component, JSXElementConstructor} from 'react';
import Employee from '../Definitions/Employee';

//The props we expect to be passed to this object, if you haven't see the description of props
//have a look at IOUBoard
interface EmployeeProps {
    employee: Employee,
    addAmountToIOU: (id: number, employee: Employee) => void
}

interface EmployeeState {
    employee: Employee
    showMinusButton: boolean
    isUpdating: boolean
}

class EmployeeView extends React.Component<EmployeeProps, EmployeeState> {
    constructor(props: EmployeeProps) {
        super(props);

        //Set up the default state of this component
        this.state = {
            employee: props.employee,
            showMinusButton: (props.employee.amountOwed !== 0),
            isUpdating: false
        };
    }

    /**
     * Adds an amount to the IOU amount and calls a function to update this
     * employee's IOU in the data store
     */
    addToIOU = (): void => {
        let copyOfEmployee = this.state.employee;
        copyOfEmployee.amountOwed += 0.2;

        //When this.setState() is finished, it will re-render the view for us
        //so we should see the amount for this employee increase
        this.setState({
            employee: copyOfEmployee
        });

        this.props.addAmountToIOU(copyOfEmployee.id, copyOfEmployee);
    };

    /**
     * Removes an amount from the IOU for an employee
     */
    removeFromIOU = () => {
        let copyOfEmployee = this.state.employee;
        copyOfEmployee.amountOwed -= 0.2;

        //If our amount is less than 0 the tuck shop cannot
        //owe us money...
        if (copyOfEmployee.amountOwed <= 0) {
            copyOfEmployee.amountOwed = 0;
        }

        this.setState({
            employee: copyOfEmployee,
            showMinusButton: (copyOfEmployee.amountOwed === 0)
        });
    };

    /**
     * Renders what we see on screen
     */
    render() {
        //Create the minus element, but if we don't want to show it reset it to "null"
        let minusElement: JSX.Element | null = <button onClick={() => this.removeFromIOU()}>- 20p</button>;
        if (!this.state.showMinusButton) {
            minusElement = null;
        }

        return (
            <li key={this.state.employee.id}>
                <div>
                    {this.state.employee.name} owes £{this.state.employee.amountOwed.toFixed(2)}
                </div>
                <div>
                    <button onClick={() => this.addToIOU()}>+ 20p</button>
                    {minusElement}
                </div>
            </li>
        );
    }

}

export default EmployeeView;