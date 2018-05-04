const express = require('express');
const bodyParser = require('body-parser');
const mongoclient = require('mongodb').MongoClient;
const fs = require('fs');

const dburl = 'mongodb://127.0.0.1:27017/geoss2018';
const dbname = 'geoss2018';
var db = null;
// Secret word for signing JWTs
const secret = 'mysupersecretword'

mongoclient.connect(dburl, function(err, client) {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to mongo db');
    }

    db = client.db(dbname);
    fillDB();
});

// Dump JSON test data into DB
function fillDB() {
    try {
        const location_data = JSON.parse(fs.readFileSync('./static/testdata/locations.json'));
        db.collection('locations').drop();
        db.collection('locations').insertMany(location_data, {ordered:false})
        .catch(err => {
            if(err.name === 'BulkWriteError') {
                console.log('ignoring duplicate errors when dumping user data into db');
            }
        });

    } catch(err) {
        console.error('Error reading test data', err)
    }
}

const app = express();

// express has a seperate module for parsing POST body
app.use(bodyParser.json());

// Set headers to allow CORS requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(express.static(__dirname+'/static'))
app.get('/', function(req, res) {
    res.send('Welcome to port 3000');
});
/*
app.post('/createtoken', function(req, res) {
    const cursor = db.collection('users').find(
        {"username":req.body.username, "password":req.body.password}, 
        {password:0}
    );
    cursor.next(function(err, docs) {
        if(err) {
            res.status(500).json({message: err.message});
            
        } else if(docs === null) {
            res.status(401).json({message:'Username/Password incorrect'});

        } else {
            const token = jwt.sign(docs,secret, {'expiresIn':3600});
            res.status(200).json({message:'User authorised', token: token});
        }
    });
});


app.post('/verifytoken', function(req, res) {
    jwt.verify(req.headers.authorization, secret, function(err, decoded) {
        if(err) {
            if(err.name === 'TokenExpiredError') {
                res.status(401).json({message: 'Authentication token has expired'});

            } else if(err.name === 'JsonWebTokenError') {
                res.status(401).json({message: 'Authentication token is invalid'})
            } else {
                res.status(500).json({message: err.message})
            }

        } else {
            res.status(200).json({message:'Token is valid'});
        }
    })
});
*/

app.get('/locations/viewMany', function(req, res) {
    const cursor = db.collection('locations').find();
    cursor.toArray(function(err, locations) {
        if(err) {
            res.status(500).json({message: err.message});
    
        } else if(locations.length === 0) {
            res.status(204).json([]);
    
        } else {
            res.status(200).json(locations)
        }
    });
});


/*
app.get('/groups/viewMany', function(req, res) {
    jwt.verify(req.headers.authorization, secret, function(err, decoded) {
        if(err) {
            res.status(500).json({message: err.message});
            return
        }

        const username = decoded.username;
        const cursor = db.collection('groups').find({
            $or: [{owner: decoded.uid}, {members: decoded.uid}]
        });

        cursor.toArray(function(err, groups) {
            if(err) {
                res.status(500).json({message: err.message});
        
            } else if(groups.length === 0) {
                res.status(204).json([]);
        
            } else {
                res.status(200).json(groups)
            }
        });
    });
});

app.get('/groups/viewOne', function(req, res) {
    jwt.verify(req.headers.authorization, secret, function(err, decoded) {
        if(err) {
            res.status(500).json({message: err.message});
            return
        }
        const id = parseInt(req.query.groupid);
        const cursor = db.collection('groups').find({id:id});
        cursor.next(function(err, group) {
            if(err) {
                res.status(500).json({message: err.message});
        
            } else if(group === null) {
                res.status(204).json({});
        
            } else {
                res.status(200).json(group)
            }
        });
    });
});


app.get('/users/viewOne', function(req, res) {
    jwt.verify(req.headers.authorization, secret, function(err, decoded) {
        if(err) {
            res.status(500).json({message: err.message});
            return;
        }
        const userid = req.query.userid;
        const cursor = db.collection('users').find({uid: userid}, {password:0});
        cursor.next(function(err, user) {
            if(err) {
                res.status(500).json({message: err.message});
                
            } else if(user === null) {
                res.status(204).json({});

            } else { 
                res.status(200).json(user);
            }
        })
    });
});

app.get('/users/viewMany', function(req, res) {
    jwt.verify(req.headers.authorization, secret, function(err, decoded) {
        if(err) {
            res.status(500).json({message: err.message});
            return;
        }

        var ids = req.query.userids;
        var criterion = {};

        if(Array.isArray(ids)) {
            criterion.uid = {$in: ids.map(item => parseInt(item))};
        } else {
            criterion.uid = parseInt(ids);
        }

        const cursor = db.collection('users').find(criterion, {fields: {password:0}});
        cursor.toArray(function(err, users) {
            if(err) {
                res.status(500).json({message: err.message});
                
            } else if(users.length === 0) {
                res.status(204).json([]);

            } else { 
                res.status(200).json(users);
            }
        });
    });
});
*/
/*

app.use(function(req, res, next) {
    res.status(404).json({valid:false, message: 'Error 404 not found'});
});
*/
app.listen(3000, function() {
    console.log('listening on port 3000')
});