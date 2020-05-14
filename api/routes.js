'use strict';
module.exports = function(app) {
  // let memberCtrl = require('./controllers/member');
  // let projectCtrl = require('./controllers/project')

  let accountCtrl = require('./controllers/account');

  app.route('/account/:accountId')
    .get(accountCtrl.detail)
    .put(accountCtrl.update);

  // todoList Routes
  // app.route('/member')
  //   .get(memberCtrl.get)
  //   .post(memberCtrl.add);

  //   app.route('/member/:memberId')
  //   .get(memberCtrl.detail)
  //   .put(memberCtrl.update)
  //   .delete(memberCtrl.delete)

  //   app.route('/project')
  //   .get(projectCtrl.get)
  //   .post(projectCtrl.add);

  //   app.route('/project/:projectId')
  //   .get(projectCtrl.detail)
  //   .put(projectCtrl.update)
  //   .delete(projectCtrl.delete)

  //   app.route('/project/members/:projectId')
  //   .get(projectCtrl.listMember)
};