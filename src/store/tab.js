import Cookie from "js-cookie";
import it from "element-ui/src/locale/lang/it";
export default {


    state:{
        isCollapse:false,
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'/home/home'
            }
        ],
        menu:[]
    },
    mutations:{
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state,value){
            if (state.tabsList.every(item=>item.name!=value.name)){
                state.tabsList.push(value)
            }
        },
        //删除指定的tag数据
        closeTag(state,value){
            let index=state.tabsList.findIndex(item=>item.name===value.name);
            state.tabsList.splice(index,1)
        },
        //设置menu的数据
        setMenu(state,val){
            console.log(val,'val')
            state.menu=val;
            Cookie.set('menu',JSON.stringify(val));
            console.log(val,'menu')
        },
        //动态注册路由
        addMenu(state,router){
            if (!Cookie.get('menu')) return;
            let menu=JSON.parse(Cookie.get('menu'));
            state.menu=menu;
            let routerlist=[];
            menu.forEach(item=>{
                if (item.children){
                    item.children=item.children.map(it=>{
                         it.component=()=>import(`../views/${it.url}`)
                        return it
                        }
                    )
                    // console.log(item.children,1)
                    routerlist.push(...item.children)
                }else {
                    item.component=()=>import(`@/views/${item.url}`)
                    // console.log(item,2)
                    routerlist.push(item)
                }
            })
            console.log(routerlist,'routerlist')
            routerlist.forEach(item=>{
                router.addRoute('Main',item)
            })

        }
    }
}
