const express = require("express");
const fs = require("fs").promises;


const app = express();//כך בניתי שרת

app.get("/orders", (req, res) => {
    res.send("all orders")
})

app.get("/orders/:id/:name", (req, res) => {

    res.send("order num " + req.params.id + " " + req.params.name)
    // req.query
    //params/queryparams

})
app.delete("/orders/:id", (req, res) => {

    res.send("delete order num: " + res.params.id)
})

app.get("/users", (req, res) => {
    res.send("all users")
})

app.get("/courses", (req, res) => {

    fs.readFile("./myCoursesDb.json", "utf-8").then(text => {
        let arr = JSON.parse(text);

        res.json(arr);
    }).catch(err => {
        console.log(err)
        res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
    })
})

// app.get("/courses/:id", (req, res) => {

//     fs.readFile("./myCoursesDb.json", "utf-8").then(text => {
//         let arr = JSON.parse(text);
//         let course = arr.find(item => item.id == req.params.id);
//         if (!course)
//             res.status(404).send("לא נמצא קורס עם כזה קוד");
//         res.json(course);
//     }).catch(err => {
//         res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
//     })
// })

app.get("/courses/:id", async (req, res) => {
    console.log("הדףף בטעינה")
    try {
        let text = await fs.readFile("./myCoursesDb.json", "utf-8");
        let arr = JSON.parse(text);
        let course = arr.find(item => item.id == req.params.id);
        if (!course)
            res.status(404).send("לא נמצא קורס עם כזה קוד");
        res.json(course);
    }
    catch (err) {
        res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
    }
})

app.delete("/courses/:id", async (req, res) => {
    try {
        let text = await fs.readFile("./myCoursesDb.json", "utf-8");
        let arr = JSON.parse(text);
        let index = arr.findIndex(item => item.id == req.params.id);
        if (index == -1)
            res.status(404).send("לא נמצא קורס עם כזה קוד");
        let deletedCourses = arr.splice(index, 1);
        await fs.writeFile("./myCoursesDb.json", JSON.stringify(arr));

        res.json(deletedCourses);
    }
    catch (err) {
        res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
    }
})
app.listen(5500, () => {
    console.log("app is litening on port 5500")
})