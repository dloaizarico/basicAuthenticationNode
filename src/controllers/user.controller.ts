const adminBoard = (_req: any, res: any) => {
    res.status(200).send("Admin Content.");
};

const employeeBoard = (_req: any, res: any) => {
    res.status(200).send("Employee Content.");
};

const customerBoard = (_req: any, res: any) => {
    res.status(200).send("Customer Content.");
};

const userController = {
    adminBoard, employeeBoard, customerBoard
}

export default userController