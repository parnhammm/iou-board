import React, {Component, JSXElementConstructor} from 'react';
import Employee from '../Definitions/Employee';

//The props we expect to be passed to this object, if you haven't see the description of props
//have a look at IOUBoard
interface EmployeeProps {
    employee: Employee,
    updateIOUAmount: (id: number, employee: Employee) => void
}

interface EmployeeState {
    employee: Employee
    isUpdating: boolean
}

class EmployeeView extends React.Component<EmployeeProps, EmployeeState> {
    constructor(props: EmployeeProps) {
        super(props);

        //Set up the default state of this component
        this.state = {
            employee: props.employee,
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

        this.props.updateIOUAmount(copyOfEmployee.id, copyOfEmployee);
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
            employee: copyOfEmployee
        });

        this.props.updateIOUAmount(copyOfEmployee.id, copyOfEmployee);
    };

    /**
     * Renders what we see on screen
     */
    render() {
        //Create the minus element, but if we don't want to show it reset it to "null"
        let minusElement: JSX.Element | null = <i className="minus circle big icon" onClick={() => this.removeFromIOU()}/>;
        if (this.state.employee.amountOwed <= 0) {
            minusElement = null;
        }

        let cardClass = "ui green card centered";
        if (this.state.employee.amountOwed >= 5) {
            cardClass = "ui red card centered";
        }

        return (
            <div className={cardClass}>
                <div className="content">
                    <img src={this.state.employee.imgUrl} alt={this.state.employee.name} className="ui mini right floated image"/>
                    <div className="header">{this.state.employee.name}</div>
                    <div className="description">
                        <div className="ui center aligned divided three column grid">
                            <div className={"row"}>
                                <div className={"column"}>
                                    <i className="plus circle big icon" onClick={() => this.addToIOU()}/>
                                </div>
                                <div className={"column"}>
                                    <strong>£{this.state.employee.amountOwed.toFixed(2)}</strong>
                                </div>
                                <div className={"column"}>
                                    {minusElement}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EmployeeView;