const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    if(req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }
  });
}

exports.changeStatus = (req,res) => {
  let id = req.params.id;
  Task.find(id)
    .then((data) => {
      if(req.xhr || req.headers.accept.indexOf('json') > -1){
        return res.json(), Task.changeStatus(data);
      } else {
        res.redirect('/');
      }
    });
}

exports.showAll = (req, res) => {
  Task.all()
      .then((data) => {
          res.json({ data: data });
      });
}

exports.deleteTask = (req,res) => {
  let id = req.params.id;
  Task.find(id)
    .then((data) =>{
      if(req.xhr || req.headers.accept.indexOf('json') > -1){
         return res.json(), Task.delete(data);
      } else {
        res.redirect('/');
      }
    });
}


exports.findById = (req,res) => {
    let id = req.params.id;
    Task.find(id)
      .then((data) => {
          return res.json({ data: data });
      });
  }