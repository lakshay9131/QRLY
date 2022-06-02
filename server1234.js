const express = require("express");
const { replace } = require("formik");
const app = express()
const por = process.env.PORT || 9090
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.listen((por), () => {
    console.log("listening " + por);
  
})
var treg = new RegExp("https://www.[a-zA-z0-9@:%_\\+`#?&//=]{2,256}.[a-zA-Z]{2,7}")

console.log(/.+/.test("a"))
var test = treg.test("https://www.google.com")

console.log(test)
const fs = require("fs");
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    var b = JSON.parse(jsonData);
    // console.log(b);
    return b;

}
const dataPath = "user.json"
const path = require("path");
const { names } = require("./names.js");
app.get("/", (req, res) => {
    console.log("welcome qrly")
    const index = require("./index.js")

    res.send(index.head)
})
app.post("/qr", (req, res) => {
    //body , url , type;
    if (req.body) {
        const serverqr = require("./SERVER.JS")

        var type = req.body.type;

        var ur = req.body.url;
        //var regex = new RegExp("((http|https)://)(www.)?" + "[a-zA-z0-9@:%._\\+`#?&//=]{2,256}\\.[a-z]" + "{2,6}\\b([-a-zA-Z0-9@:%._\\+`#?&//=]*");
        var treg = new RegExp("https://www\\.[a-zA-z0-9@:%_\\+`#?&//=-]{2,256}\\.[a-zA-Z]{2,7}")
        console.log(/.+/.test("a"))
            //string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

        var test = treg.test(ur)

        console.log(isValidHttpUrl(ur) && test + " " + ur)
        var t = isValidHttpUrl(ur) && test && ur.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        if (t) {
            var su = "none"
            if (type === "all") {
                su = save(ur);



            }
            serverqr.dataurl(ur, function(response) {
                var qrl = response
                var msq = {
                    message: qrl,
                    surl: su
                };


                res.json(msq);

            })


        } else {
            res.json({ message: 'Invalid', su: 'Invalid' });
        }




    } else {
        res.send({ message: 'Invalid' });
    }


})
app.get("/url/:id", (req, res) => {
    //body , url , type;
    const id = req.params.id;
    if (!id) {
        res.redirect("/")

    }
    if (id && /[a-z0-9]{1,}/.test(id)) {

        console.log(/[a-z0-9]{1,}/.test(id))
        var t = getAccountData()
        var tt = t[id];
        console.log(tt)
        res.redirect(tt)


    } else {
        res.redirect("/")
    }

})


function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
//console.log(save("https://lion.com"))

function check(url) {
    var res = 0;




    var data = getAccountData()
    var keys = Object.keys(data)

    for (var kvalue in keys) {
        console.log(keys[kvalue] + '  ' + data[keys[kvalue]]);
        var ur = data[keys[kvalue]];
        if (ur === url) {
            res = keys[kvalue];
            break;

        }





    }
    console.log(res + " " + url);
    return res


}

function save(url) {
    var tu = url.charAt(url.length - 1)
    console.log(tu + "  " + url.length)
    if (tu !== '/') {
        console.log("url changed" + url)
        url += "/"
        console.log("url changed" + url)

    }
    var jj = url.match('/[\/]{1,}/')
    if (jj) {

        url = url.replace(jj, "/"),
            console.log("replace" + jj + "   " + url)
    }
    var chec = check(url)

    if (chec !== 0) {
        return chec

    } else {
        var data = getAccountData();
        var ra = Math.round(400000000000 * Math.random())
        console.log(ra + " ra / 1000000000 " + Math.round(ra / 1000000000))
        const name = require("./names")
        const t = name.array
        var rand = Math.round(498 * Math.random())
        var subs = Math.round(10 * Math.random())
        ra = ra.toString()
        console.log(typeof(ra))


        var ne = (t[rand].substring(0, subs) + ra.substring(0, subs)).toString()
        console.log(ne + " " + url)

        data[ne] = url;
        data = JSON.stringify(data)
        if (ne) { fs.writeFileSync(dataPath, data); }
        return ne;
    }






}
//check("https://lion.com")