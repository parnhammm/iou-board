import React from 'react';
import Employee from '../Definitions/Employee';

interface EmployeeProps {
    employee: Employee
}

interface EmployeeState {
    employee: Employee
    isUpdating: boolean
}

class EmployeeView extends React.Component<EmployeeProps, EmployeeState> {
    constructor(props: EmployeeProps) {
        super(props);

        this.state = {
            employee: props.employee,
            isUpdating: false
        };
    }

    render() {
        return (
            <li key={this.state.employee.id}>
                {this.state.employee.name} owes £{this.state.employee.amountOwed.toFixed(2)}
            </li>
        );
    }

}

export default EmployeeView;