import React, {Component, JSXElementConstructor} from 'react';
import Employee from '../Definitions/Employee';

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

        this.state = {
            employee: props.employee,
            showMinusButton: (props.employee.amountOwed === 0),
            isUpdating: false
        };
    }

    addToIOU = (): void => {
        let copyOfEmployee = this.state.employee;
        copyOfEmployee.amountOwed += 0.2;

        this.setState({
            employee: copyOfEmployee
        });

        this.props.addAmountToIOU(copyOfEmployee.id, copyOfEmployee);
    };

    removeFromIOU = () => {
        let copyOfEmployee = this.state.employee;
        copyOfEmployee.amountOwed -= 0.2;

        //If our amount is less than 0
        if (copyOfEmployee.amountOwed <= 0) {
            copyOfEmployee.amountOwed = 0;
        }

        this.setState({
            employee: copyOfEmployee,
            showMinusButton: (copyOfEmployee.amountOwed === 0)
        });
    };

    render() {
        let minusElement: JSX.Element | null = <button onClick={() => this.removeFromIOU()}>- 20p</button>;
        if (this.state.showMinusButton) {
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