//A basic structure to represent an Employee
export default interface Employee {
    //An ID to identify the employee
    id: number;

    //A string for their name
    name: string;

    //A string for a URL to their image
    imgUrl: string;

    //The amount they owe
    amountOwed: number;
};