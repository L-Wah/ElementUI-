let list = [
  {
    id: 2,
    pid: 0,
    path: '/course',
    name: 'Course',
    title: '课程管理',
    link: '/course'
  },
  {
    id: 3,
    pid: 2,
    path: 'operate',
    name: 'CourseOperate',
    title: '课程操作',
    link: '/course/operate'
  },
  {
    id: 4,
    pid: 3,
    path: 'info_data',
    name: 'CourseInfoData',
    title: '课程数据',
    link: '/course/operate/info_data'
  },
  {
    id: 5,
    pid: 2,
    path: 'add',
    name: 'CourseAdd',
    title: '增加课程',
    link: '/course/add'
  },
  {
    id: 6,
    pid: 0,
    path: '/student',
    name: 'Student',
    title: '学生管理',
    link: '/student',
  },
  {
    id: 7,
    pid: 6,
    path: 'add',
    name: 'StudentAdd',
    title: '增加学生',
    link: '/student/add'
  },
];

function tranTree(list) {
  let parents = list.filter(p => p.pid === 0); //区分第一级父项
  let children = list.filter(c => c.pid !== 0);//区分第一级子项

  dataTree(parents, children);

  function dataTree(parents, children) {
    parents.map((elem) => {
      children.map((item, i) => {
        if (item.pid === elem.id) { //找子项中又没有匹配父项的
          let temp = JSON.parse(JSON.stringify(children)) //先把所有子项存起来
          temp.splice(i, 1);     //其中去掉自己本身
          dataTree([item], temp) //该次相同项作为父项，其余相同项作为子项

          if (elem.children) {
            elem.children.push(item)  //之后找到的添加进children数组里
          } else {
            elem.children = [item]    //第一次找到先存进父项的children里
          }
        }
      })
    });
  };

  return parents;
}

function routerTrans(data) {
  let temp = data.map(item => {
    let routers = {
      path: item.link || item.path,
      name: item.name,
      component: () => import(/* webpackChunkName: "about" */ `@/views/${item.name}.vue`),
    }
    if(item.children){
      routers.children = routerTrans(item.children)
    }
    return routers;
  });
  return temp;
}

export {
  list,
  tranTree,
  routerTrans
};