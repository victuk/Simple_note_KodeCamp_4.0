const jwt = require("jsonwebtoken");


function checkIfLoggedIn (req, res, next) {
    const token = (req.headers.authorization).split(" ");
    const strategy = token[0];
    const tokenItself = token[1];

    if(strategy.toLocaleLowerCase() != "bearer") {
        res.status(400).send({
            message: "Strategy not bearer token"
        });
    } else if (!token) {
        res.status(400).send({
            message: "No token found"
        });
    } else {
        const userDetails = jwt.verify(tokenItself, process.env.auth_token);

        req.userDetails = userDetails;

        console.log(userDetails);

        next();

    }
}

module.exports = checkIfLoggedIn;